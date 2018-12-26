/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Prefixer from 'inline-style-prefixer';
import stylePropType from 'react-style-proptype';

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  const state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}

function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    const state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  }
  // Binding "this" is important for shallow renderer support.
  this.setState(updater.bind(this));
}

function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState,
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}

// React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

function polyfill(Component) {
  const prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (
    typeof Component.getDerivedStateFromProps !== 'function'
    && typeof prototype.getSnapshotBeforeUpdate !== 'function'
  ) {
    return Component;
  }

  // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.
  let foundWillMountName = null;
  let foundWillReceivePropsName = null;
  let foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }
  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }
  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }
  if (
    foundWillMountName !== null
    || foundWillReceivePropsName !== null
    || foundWillUpdateName !== null
  ) {
    const componentName = Component.displayName || Component.name;
    const newApiName = typeof Component.getDerivedStateFromProps === 'function'
      ? 'getDerivedStateFromProps()'
      : 'getSnapshotBeforeUpdate()';

    throw Error(
      `Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n${ 
        componentName 
      } uses ${ 
        newApiName 
      } but also contains the following legacy lifecycles:${ 
        foundWillMountName !== null ? `\n  ${foundWillMountName}` : '' 
      }${foundWillReceivePropsName !== null
        ? `\n  ${foundWillReceivePropsName}`
        : '' 
      }${foundWillUpdateName !== null ? `\n  ${foundWillUpdateName}` : '' 
      }\n\nThe above lifecycles should be removed. Learn more about this warning here:\n`
        + 'https://fb.me/react-async-component-lifecycle-hooks',
    );
  }

  // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.
  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }

  // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.
  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error(
        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype',
      );
    }

    prototype.componentWillUpdate = componentWillUpdate;

    const componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
      prevProps,
      prevState,
      maybeSnapshot,
    ) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      const snapshot = this.__reactInternalSnapshotFlag
        ? this.__reactInternalSnapshot
        : maybeSnapshot;

      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component;
}

const classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
};

const createClass = (function () {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}());

const defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

const inherits = function (subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(`Super expression must either be null or a function, not ${typeof superClass}`);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

const possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
};

const DEFAULT_USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
const USER_AGENT = typeof navigator !== 'undefined' ? navigator.userAgent : DEFAULT_USER_AGENT;

const Pane = (function (_React$PureComponent) {
  inherits(Pane, _React$PureComponent);

  function Pane() {
    classCallCheck(this, Pane);
    return possibleConstructorReturn(this, (Pane.__proto__ || Object.getPrototypeOf(Pane)).apply(this, arguments));
  }

  createClass(Pane, [{
    key: 'render',
    value: function render() {
      const _props = this.props;

          
      const children = _props.children;

          
      const className = _props.className;

          
      const prefixer = _props.prefixer;

          
      const split = _props.split;

          
      const styleProps = _props.style;

          
      const size = _props.size;

          
      const eleRef = _props.eleRef;


      const classes = ['Pane', split, className];

      const style = Object.assign({}, styleProps || {}, {
        flex: 1,
        position: 'relative',
        outline: 'none',
      });

      if (size !== undefined) {
        if (split === 'vertical') {
          style.width = size;
        } else {
          style.height = size;
          style.display = 'flex';
        }
        style.flex = 'none';
      }

      return React.createElement(
        'div',
        {
          ref: eleRef,
          className: classes.join(' '),
          style: prefixer.prefix(style),
        },
        children,
      );
    },
  }]);
  return Pane;
}(React.PureComponent));

Pane.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  prefixer: PropTypes.instanceOf(Prefixer).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  split: PropTypes.oneOf(['vertical', 'horizontal']),
  style: stylePropType,
  eleRef: PropTypes.func,
};

Pane.defaultProps = {
  prefixer: new Prefixer({ userAgent: USER_AGENT }),
};

const DEFAULT_USER_AGENT$1 = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
const USER_AGENT$1 = typeof navigator !== 'undefined' ? navigator.userAgent : DEFAULT_USER_AGENT$1;
const RESIZER_DEFAULT_CLASSNAME = 'Resizer';

const Resizer = (function (_React$Component) {
  inherits(Resizer, _React$Component);

  function Resizer() {
    classCallCheck(this, Resizer);
    return possibleConstructorReturn(this, (Resizer.__proto__ || Object.getPrototypeOf(Resizer)).apply(this, arguments));
  }

  createClass(Resizer, [{
    key: 'render',
    value: function render() {
      const _props = this.props;

          
      const className = _props.className;

          
      const _onClick = _props.onClick;

          
      const _onDoubleClick = _props.onDoubleClick;

          
      const _onMouseDown = _props.onMouseDown;

          
      const _onTouchEnd = _props.onTouchEnd;

          
      const _onTouchStart = _props.onTouchStart;

          
      const prefixer = _props.prefixer;

          
      const resizerClassName = _props.resizerClassName;

          
      const split = _props.split;

          
      const style = _props.style;

      const classes = [resizerClassName, split, className];

      return React.createElement('span', {
        className: classes.join(' '),
        style: prefixer.prefix(style) || {},
        onMouseDown: function onMouseDown(event) {
          return _onMouseDown(event);
        },
        onTouchStart: function onTouchStart(event) {
          event.preventDefault();
          _onTouchStart(event);
        },
        onTouchEnd: function onTouchEnd(event) {
          event.preventDefault();
          _onTouchEnd(event);
        },
        onClick: function onClick(event) {
          if (_onClick) {
            event.preventDefault();
            _onClick(event);
          }
        },
        onDoubleClick: function onDoubleClick(event) {
          if (_onDoubleClick) {
            event.preventDefault();
            _onDoubleClick(event);
          }
        },
      });
    },
  }]);
  return Resizer;
}(React.Component));

Resizer.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onMouseDown: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  prefixer: PropTypes.instanceOf(Prefixer).isRequired,
  split: PropTypes.oneOf(['vertical', 'horizontal']),
  style: stylePropType,
  resizerClassName: PropTypes.string.isRequired,
};

Resizer.defaultProps = {
  prefixer: new Prefixer({ userAgent: USER_AGENT$1 }),
  resizerClassName: RESIZER_DEFAULT_CLASSNAME,
};

const DEFAULT_USER_AGENT$2 = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
const USER_AGENT$2 = typeof navigator !== 'undefined' ? navigator.userAgent : DEFAULT_USER_AGENT$2;

function unFocus(document, window) {
  if (document.selection) {
    document.selection.empty();
  } else {
    try {
      window.getSelection().removeAllRanges();
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

function getDefaultSize(defaultSize, minSize, maxSize, draggedSize) {
  if (typeof draggedSize === 'number') {
    const min = typeof minSize === 'number' ? minSize : 0;
    const max = typeof maxSize === 'number' && maxSize >= 0 ? maxSize : Infinity;
    return Math.max(min, Math.min(max, draggedSize));
  }
  if (defaultSize !== undefined) {
    return defaultSize;
  }
  return minSize;
}

const SplitPane = (function (_React$Component) {
  inherits(SplitPane, _React$Component);

  function SplitPane(props) {
    classCallCheck(this, SplitPane);

    const _this = possibleConstructorReturn(this, (SplitPane.__proto__ || Object.getPrototypeOf(SplitPane)).call(this, props));

    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onTouchStart = _this.onTouchStart.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    _this.onTouchMove = _this.onTouchMove.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);

    // order of setting panel sizes.
    // 1. size
    // 2. getDefaultSize(defaultSize, minsize, maxSize)

    const size = props.size;

        
    const defaultSize = props.defaultSize;

        
    const minSize = props.minSize;

        
    const maxSize = props.maxSize;

        
    const primary = props.primary;


    const initialSize = size !== undefined ? size : getDefaultSize(defaultSize, minSize, maxSize, null);

    _this.state = {
      active: false,
      resized: false,
      pane1Size: primary === 'first' ? initialSize : undefined,
      pane2Size: primary === 'second' ? initialSize : undefined,

      // previous props that we need in static methods
      instanceProps: {
        primary,
        size,
        defaultSize,
        minSize,
        maxSize,
      },
    };
    return _this;
  }

  createClass(SplitPane, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('touchmove', this.onTouchMove);
      this.setState(SplitPane.setSize(this.props, this.state));
    },
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('touchmove', this.onTouchMove);
    },
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(event) {
      const eventWithTouches = Object.assign({}, event, {
        touches: [{ clientX: event.clientX, clientY: event.clientY }],
      });
      this.onTouchStart(eventWithTouches);
    },
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(event) {
      const _props = this.props;

          
      const allowResize = _props.allowResize;

          
      const onDragStarted = _props.onDragStarted;

          
      const split = _props.split;

      if (allowResize) {
        unFocus(document, window);
        const position = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;

        if (typeof onDragStarted === 'function') {
          onDragStarted();
        }
        this.setState({
          active: true,
          position,
        });
      }
    },
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      const eventWithTouches = Object.assign({}, event, {
        touches: [{ clientX: event.clientX, clientY: event.clientY }],
      });
      this.onTouchMove(eventWithTouches);
    },
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(event) {
      const _props2 = this.props;

          
      const allowResize = _props2.allowResize;

          
      const maxSize = _props2.maxSize;

          
      const minSize = _props2.minSize;

          
      const onChange = _props2.onChange;

          
      const split = _props2.split;

          
      const step = _props2.step;
      const _state = this.state;

          
      const active = _state.active;

          
      const position = _state.position;


      if (allowResize && active) {
        unFocus(document, window);
        const isPrimaryFirst = this.props.primary === 'first';
        const ref = isPrimaryFirst ? this.pane1 : this.pane2;
        const ref2 = isPrimaryFirst ? this.pane2 : this.pane1;
        if (ref) {
          const node = ref;
          const node2 = ref2;

          if (node.getBoundingClientRect) {
            const width = node.getBoundingClientRect().width;
            const height = node.getBoundingClientRect().height;
            const current = split === 'vertical' ? event.touches[0].clientX : event.touches[0].clientY;
            const size = split === 'vertical' ? width : height;
            let positionDelta = position - current;
            if (step) {
              if (Math.abs(positionDelta) < step) {
                return;
              }
              // Integer division
              // eslint-disable-next-line no-bitwise
              positionDelta = ~~(positionDelta / step) * step;
            }
            let sizeDelta = isPrimaryFirst ? positionDelta : -positionDelta;

            const pane1Order = parseInt(window.getComputedStyle(node).order);
            const pane2Order = parseInt(window.getComputedStyle(node2).order);
            if (pane1Order > pane2Order) {
              sizeDelta = -sizeDelta;
            }

            let newMaxSize = maxSize;
            if (maxSize !== undefined && maxSize <= 0) {
              const splitPane = this.splitPane;
              if (split === 'vertical') {
                newMaxSize = splitPane.getBoundingClientRect().width + maxSize;
              } else {
                newMaxSize = splitPane.getBoundingClientRect().height + maxSize;
              }
            }

            let newSize = size - sizeDelta;
            const newPosition = position - positionDelta;

            if (newSize < minSize) {
              newSize = minSize;
            } else if (maxSize !== undefined && newSize > newMaxSize) {
              newSize = newMaxSize;
            } else {
              this.setState({
                position: newPosition,
                resized: true,
              });
            }

            if (onChange) onChange(newSize);

            this.setState(defineProperty({
              draggedSize: newSize,
            }, isPrimaryFirst ? 'pane1Size' : 'pane2Size', newSize));
          }
        }
      }
    },
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      const _props3 = this.props;

          
      const allowResize = _props3.allowResize;

          
      const onDragFinished = _props3.onDragFinished;
      const _state2 = this.state;

          
      const active = _state2.active;

          
      const draggedSize = _state2.draggedSize;

      if (allowResize && active) {
        if (typeof onDragFinished === 'function') {
          onDragFinished(draggedSize);
        }
        this.setState({ active: false });
      }
    },

    // TODO: find a more elegant way to fix this. memoize calls to setSize?
    // we have to check values since gDSFP is called on every render

  }, {
    key: 'render',
    value: function render() {
      const _this2 = this;

      const _props4 = this.props;

          
      const allowResize = _props4.allowResize;

          
      const children = _props4.children;

          
      const className = _props4.className;

          
      const onResizerClick = _props4.onResizerClick;

          
      const onResizerDoubleClick = _props4.onResizerDoubleClick;

          
      const paneClassName = _props4.paneClassName;

          
      const pane1ClassName = _props4.pane1ClassName;

          
      const pane2ClassName = _props4.pane2ClassName;

          
      const paneStyle = _props4.paneStyle;

          
      const pane1StyleProps = _props4.pane1Style;

          
      const pane2StyleProps = _props4.pane2Style;

          
      const prefixer = _props4.prefixer;

          
      const resizerClassName = _props4.resizerClassName;

          
      const resizerStyle = _props4.resizerStyle;

          
      const split = _props4.split;

          
      const styleProps = _props4.style;
      const _state3 = this.state;

          
      const pane1Size = _state3.pane1Size;

          
      const pane2Size = _state3.pane2Size;


      const disabledClass = allowResize ? '' : 'disabled';
      const resizerClassNamesIncludingDefault = resizerClassName ? `${resizerClassName} ${RESIZER_DEFAULT_CLASSNAME}` : resizerClassName;

      const style = Object.assign({}, {
        display: 'flex',
        flex: 1,
        height: '100%',
        position: 'absolute',
        outline: 'none',
        overflow: 'hidden',
        MozUserSelect: 'text',
        WebkitUserSelect: 'text',
        msUserSelect: 'text',
        userSelect: 'text',
      }, styleProps || {});

      if (split === 'vertical') {
        Object.assign(style, {
          flexDirection: 'row',
          left: 0,
          right: 0,
        });
      } else {
        Object.assign(style, {
          bottom: 0,
          flexDirection: 'column',
          minHeight: '100%',
          top: 0,
          width: '100%',
        });
      }

      const classes = ['SplitPane', className, split, disabledClass];
      const pane1Style = prefixer.prefix(Object.assign({}, paneStyle || {}, pane1StyleProps || {}));
      const pane2Style = prefixer.prefix(Object.assign({}, paneStyle || {}, pane2StyleProps || {}));

      const pane1Classes = ['Pane1', paneClassName, pane1ClassName].join(' ');
      const pane2Classes = ['Pane2', paneClassName, pane2ClassName].join(' ');

      return React.createElement(
        'div',
        {
          className: classes.join(' '),
          ref: function ref(node) {
            _this2.splitPane = node;
          },
          style: prefixer.prefix(style),
        },
        React.createElement(
          Pane,
          {
            className: pane1Classes,
            key: 'pane1',
            eleRef: function eleRef(node) {
              _this2.pane1 = node;
            },
            size: pane1Size,
            split,
            style: pane1Style,
          },
          children[0],
        ),
        React.createElement(Resizer, {
          className: disabledClass,
          onClick: onResizerClick,
          onDoubleClick: onResizerDoubleClick,
          onMouseDown: this.onMouseDown,
          onTouchStart: this.onTouchStart,
          onTouchEnd: this.onMouseUp,
          key: 'resizer',
          resizerClassName: resizerClassNamesIncludingDefault,
          split,
          style: resizerStyle || {},
        }),
        React.createElement(
          Pane,
          {
            className: pane2Classes,
            key: 'pane2',
            eleRef: function eleRef(node) {
              _this2.pane2 = node;
            },
            size: pane2Size,
            split,
            style: pane2Style,
          },
          children[1],
        ),
      );
    },
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return SplitPane.setSize(nextProps, prevState);
    },
  }, {
    key: 'setSize',
    value: function setSize(props, state) {
      const instanceProps = state.instanceProps;

      const newState = {};

      const newSize = props.size !== undefined ? props.size : getDefaultSize(props.defaultSize, props.minSize, props.maxSize, state.draggedSize);

      const defaultSizeChanged = props.defaultSize !== instanceProps.defaultSize || props.minSize !== instanceProps.minSize || props.maxSize !== instanceProps.maxSize;

      const shouldUpdateSize = props.size !== undefined ? props.size !== instanceProps.size : defaultSizeChanged;

      if (props.size !== undefined && props.size !== state.draggedSize && shouldUpdateSize) {
        newState.draggedSize = newSize;
      }

      const isPanel1Primary = props.primary === 'first';

      if (shouldUpdateSize || props.primary !== state.instanceProps.primary) {
        newState[isPanel1Primary ? 'pane1Size' : 'pane2Size'] = newSize;
      }

      // unset the size on the non primary panel
      if (props.primary !== state.instanceProps.primary) {
        newState[isPanel1Primary ? 'pane2Size' : 'pane1Size'] = undefined;
      }

      // update the values in instanceProps
      instanceProps.primary = props.primary;
      instanceProps.size = props.size;
      instanceProps.defaultSize = props.defaultSize;
      instanceProps.minSize = props.minSize;
      instanceProps.maxSize = props.maxSize;

      newState.instanceProps = instanceProps;

      return newState;
    },
  }]);
  return SplitPane;
}(React.Component));

SplitPane.propTypes = {
  allowResize: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
  primary: PropTypes.oneOf(['first', 'second']),
  minSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // eslint-disable-next-line react/no-unused-prop-types
  defaultSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  split: PropTypes.oneOf(['vertical', 'horizontal']),
  onDragStarted: PropTypes.func,
  onDragFinished: PropTypes.func,
  onChange: PropTypes.func,
  onResizerClick: PropTypes.func,
  onResizerDoubleClick: PropTypes.func,
  prefixer: PropTypes.instanceOf(Prefixer).isRequired,
  style: stylePropType,
  resizerStyle: stylePropType,
  paneClassName: PropTypes.string,
  pane1ClassName: PropTypes.string,
  pane2ClassName: PropTypes.string,
  paneStyle: stylePropType,
  pane1Style: stylePropType,
  pane2Style: stylePropType,
  resizerClassName: PropTypes.string,
  step: PropTypes.number,
};

SplitPane.defaultProps = {
  allowResize: true,
  minSize: 50,
  prefixer: new Prefixer({ userAgent: USER_AGENT$2 }),
  primary: 'first',
  split: 'vertical',
  paneClassName: '',
  pane1ClassName: '',
  pane2ClassName: '',
};

polyfill(SplitPane);

export default SplitPane;


// ////////////////
// WEBPACK FOOTER
// ./node_modules/react-split-pane/dist/index.esm.js
// module id = ./node_modules/react-split-pane/dist/index.esm.js
// module chunks = 64

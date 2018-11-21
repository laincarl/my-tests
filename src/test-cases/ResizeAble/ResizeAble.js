import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './ResizeAble.css';

const MODES = {
  top: {
    cursor: 'row-resize',
    top: -5,
    width: '100%',
    height: 10,
  },
  right: {
    right: -5,
    top: 0,
    width: 10,
    height: '100%',
    cursor: 'col-resize',
  },
  bottom: {
    bottom: -5,
    width: '100%',
    height: 10,
    cursor: 'row-resize',
  },
  left: {
    left: -5,
    top: 0,
    width: 10,
    height: '100%',
    cursor: 'col-resize',
  },
  topRight: {
    height: 20,
    width: 20,
    right: -10,
    top: -10,
    cursor: 'ne-resize',
  },
  bottomRight: {
    height: 20,
    width: 20,
    right: -10,
    bottom: -10,
    cursor: 'se-resize',
  },
  bottomLeft: {
    height: 20,
    width: 20,
    bottom: -10,
    left: -10,
    cursor: 'sw-resize',
  },
  topLeft: {
    height: 20,
    width: 20,
    left: -10,
    top: -10,
    cursor: 'nw-resize',
  },
};
class ResizeAble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resizing: false,
      size: {
        width: 'auto',
        height: 'auto',
      },
      originSize: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
      mode: null,
    };
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  handleMouseDown = (mode, e) => {
    e.stopPropagation();
    e.preventDefault();
    // 设置默认值
    this.setState({
      mode,
      resizing: true,
      originSize: {
        width: this.con.offsetWidth,
        height: this.con.offsetHeight,
        x: e.clientX,
        y: e.clientY,
      },
    });
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseUp = (e) => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    this.setState({
      resizing: false,
    });
  }

  getResizeWidth = (vary) => {
    const { originSize } = this.state;
    const { width: initWidth, height: initHeight } = originSize;
    const { size } = this.props || {};
    const {
      height, width, minHeight, minWidth, maxHeight, maxWidth,
    } = size;
    if ((maxWidth !== undefined && initWidth + vary > maxWidth)
      || (minWidth !== undefined && initWidth + vary < minWidth)
    ) {
      return initWidth;
    } else {
      return initWidth + vary;
    }
    // this.con.style.width = `${initWidth + vary}px`;
  }

  getResizeHeight = (vary) => {
    const { originSize } = this.state;
    const { width: initWidth, height: initHeight } = originSize;
    const { size } = this.props || {};
    const {
      height, width, minHeight, minWidth, maxHeight, maxWidth,
    } = size;
    if ((maxHeight !== undefined && initHeight + vary > maxWidth)
      || (minHeight !== undefined && initHeight + vary < minHeight)
    ) {
      return initHeight;
    } else {
      return initHeight + vary;
    }
    // this.con.style.height = `${initHeight + vary}px`;
  }
  
  handleMouseMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { mode, originSize } = this.state;
    const { x, y } = originSize;
    let { width, height } = originSize;

    switch (mode) {
      case 'top': {
        height = this.getResizeHeight(y - e.clientY);
        break;
      }
      case 'topRight': {
        height = this.getResizeHeight(y - e.clientY);
        width = this.getResizeWidth(e.clientX - x);  
        break;
      }
      case 'right': {
        width = this.getResizeWidth(e.clientX - x);
        break;
      }
      case 'bottomRight': {
        width = this.getResizeWidth(e.clientX - x);
        height = this.getResizeHeight(e.clientY - y);
        break;
      }
      case 'bottom': {
        height = this.getResizeHeight(e.clientY - y);
        break;
      }
      case 'bottomLeft': {
        height = this.getResizeHeight(e.clientY - y);
        width = this.getResizeWidth(x - e.clientX);
        break;
      }
      case 'left': {
        width = this.getResizeWidth(x - e.clientX);
        break;
      }
      case 'topLeft': {
        height = this.getResizeHeight(y - e.clientY);
        width = this.getResizeWidth(x - e.clientX);
        break;
      }
      default: break;
    }
    this.setState({
      size: {
        width,
        height,
      },
    });
  }

  render() {
    const { modes, children } = this.props;
    const { size, resizing, mode } = this.state;
    const defaultSize = {
      width: 200,
      height: 200,
    };
    return (
      <div
        className="resizeable container"
        ref={this.saveRef('con')}
        style={
          {
            ...defaultSize,
            ...size,
          }
        }
      >
        {resizing && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 9999,
            cursor: MODES[mode].cursor,
          }}
          />
        )}
        {children}
        {       
          modes.map(position => <div role="none" style={{ position: 'absolute', ...MODES[position] }} onMouseDown={this.handleMouseDown.bind(this, position)} />)
        }
      </div>
    );
  }
}

// ResizeAble.propTypes = {

// };

export default ResizeAble;

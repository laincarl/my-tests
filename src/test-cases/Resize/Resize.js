import React, {
  Component, Fragment, useState, useImperativeHandle, forwardRef, useRef,
} from 'react';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';

import './Resize.css';

class Resize extends Component {
  componentDidMount() {
    const ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const {
          left, top, width, height,
        } = entry.contentRect;

        console.log('Element:', entry.target);
        console.log(`Element's size: ${width}px x ${height}px`);
        console.log(`Element's paddings: ${top}px ; ${left}px`);
      }
    });
    ro.observe(document.getElementById('test'));
  }

  render() {
    return (
      <Fragment>
        <div style={{ display: 'flex' }}>
          <div contentEditable>
            111
          </div>
          <div id="test" style={{ flex: 1 }} contentEditable>
            Resize
          </div>
        </div>
        <div className="container">
          <div className="child" />
          <div className="child" />
          <div className="child" />
          <div className="child" />
          <div className="child" />
          <div className="child" />
          <div className="child" />
          <div className="child" />
          <div className="child" />
          <div className="child" />
        </div>
      </Fragment>

    );
  }
}
const Child = forwardRef((props, ref) => {
  const [value, setValue] = useState([]);
  useImperativeHandle(ref, () => ({
    value,
  }));
  return (
    <button
      type="button"
      onClick={() => {
        setValue([...value, Math.random()]);
      }}
    >
      increase
    </button>
  );
});
const Parent = () => {
  const [value, setValue] = useState(0);
  const handleClick = async () => {
    console.log(value);
    setTimeout(() => {
      setValue(5);
    }, 1000);
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
      >
        get
      </button>
    </div>
  );
};

Resize.propTypes = {

};

export default Parent;

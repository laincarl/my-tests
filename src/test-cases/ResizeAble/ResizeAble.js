import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './ResizeAble.css';

class ResizeAble extends Component {
  saveRef = name => (ref) => {
    this[name] = ref;
  }

  handleMouseDown = (mode, e) => {
    e.stopPropagation();
    e.preventDefault();

    this.initPosition = {
      mode,
      width: this.con.offsetWidth,
      height: this.con.offsetHeight,
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseUp = (e) => {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  resizeWidth=(vary) => {
    const { width: initWidth } = this.initPosition;
    const { size } = this.props || {};
    const {
      height, width, minHeight, minWidth, maxHeight, maxWidth, 
    } = size;
    if ((maxWidth !== undefined && initWidth + vary > maxWidth)
     || (minWidth !== undefined && initWidth + vary < minWidth)
    ) {
      return;
    }
    this.con.style.width = `${initWidth + vary}px`;
  }

  resizeHeight=(vary) => {
    const { height: initHeight } = this.initPosition;
    const { size } = this.props || {};
    const {
      height, width, minHeight, minWidth, maxHeight, maxWidth, 
    } = size;
    if ((maxHeight !== undefined && initHeight + vary > maxWidth)
     || (minHeight !== undefined && initHeight + vary < minHeight)
    ) {
      return;
    }
    this.con.style.height = `${initHeight + vary}px`;
  }

  handleMouseMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const { size } = this.props || {};
    const {
      height, width, minHeight, minWidth, maxHeight, maxWidth, 
    } = size;
    requestAnimationFrame(() => {
      const {
        width, height, x, y, mode,
      } = this.initPosition;
      console.log(mode, e.clientY, y);
      switch (mode) {
        case 'top': {  
          this.resizeHeight(y - e.clientY);
          break;
        }
        case 'topright': {
          this.resizeHeight(y - e.clientY);
          this.resizeWidth(e.clientX - x);          
          break;
        }
        case 'right': {
          this.resizeWidth(e.clientX - x);
          break;
        }
        case 'bottomright': {
          this.resizeWidth(e.clientX - x);
          this.resizeHeight(e.clientY - y);
          break;
        }
        case 'bottom': {
          this.resizeHeight(e.clientY - y);
          break;
        }
        case 'bottomleft': {
          this.resizeHeight(e.clientY - y);
          this.resizeWidth(x - e.clientX);
          break;
        }
        case 'left': {
          this.resizeWidth(x - e.clientX);
          break;
        }
        case 'lefttop': {
          this.resizeHeight(y - e.clientY);
          this.resizeWidth(x - e.clientX);
          break;
        }
        default: break;
      }
    });
  }

  render() {
    const { modes, children } = this.props;
    return (
      <div className="resizeable container" ref={this.saveRef('con')}>
        {children}
        {
          // ['top', 'right', 'bottom', 'left', 'bottomright', 'topright', 'bottomleft', 'lefttop']
          modes.map(position => <div role="none" className={`resizeable-bar-${position}`} onMouseDown={this.handleMouseDown.bind(this, position)} />)
        }
      </div>
    );
  }
}

// ResizeAble.propTypes = {

// };

export default ResizeAble;

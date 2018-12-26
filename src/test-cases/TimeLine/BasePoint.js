import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd';
import Portal from './Portal';

class BasePoint extends Component {
  static defaultProps = {
    contentShow: true,
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  render() {
    const {
      color, left, reverse, content, contentShow, getPopupContainer,
    } = this.props;

    return (
      <div
        className="Point"
        ref={this.saveRef('Point')}
        {...this.props}
        style={{
          background: reverse ? color : 'white',
          left: left || 0,
          ...this.props.style,
        }}
      >
        <div
          className="Point-inner"
          style={{
            background: reverse ? 'white' : color,
          }}
        />
        <div className="Point-content">
          {
            contentShow && (
              <Popover
                content={content}
                visible
                placement="bottom"
              // getPopupContainer={getPopupContainer}
              />
            )
          }
        </div>
      </div>
    );
  }
}

BasePoint.propTypes = {

};

export default BasePoint;

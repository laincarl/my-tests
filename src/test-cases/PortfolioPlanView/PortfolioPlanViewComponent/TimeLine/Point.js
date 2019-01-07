import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Point extends Component {
  static defaultProps = {
    size: 'medium',
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  render() {
    const {
      color, left, reverse, size, 
    } = this.props;

    return (
      <div
        className="Point"
        ref={this.saveRef('Point')}
        {...this.props}
        style={{
          background: reverse ? color : 'white',
          left: left || 0,
          transform: size === 'small' && 'scale(0.6)',
          ...this.props.style,
        }}
      >
        <div
          className="Point-inner"
          style={{
            background: reverse ? 'white' : color,
          }}
        />
      </div>
    );
  }
}

Point.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
};

export default Point;

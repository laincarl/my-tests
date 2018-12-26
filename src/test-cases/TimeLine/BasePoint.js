import React, { Component } from 'react';

class BasePoint extends Component {
  static defaultProps = {
    
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  render() {
    const {
      color, left, reverse, 
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
      </div>
    );
  }
}

BasePoint.propTypes = {

};

export default BasePoint;

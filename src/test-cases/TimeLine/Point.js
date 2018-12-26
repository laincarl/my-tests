import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BasePoint from './BasePoint';

class Point extends Component {
  state = {
    pointing: false,
    color: 'rgb(54, 179, 126)',

  }

  handleMouseEnter = (e) => {
    // e.stopPropagation();
    // e.preventDefault();
    this.setState({
      pointing: true,
    });
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  }

  handleMouseLeave = (e) => {
    // e.stopPropagation();
    // e.preventDefault();
    this.setState({
      pointing: false,
    });
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  }

  render() {
    const { pointing, color } = this.state;
    return (
      <BasePoint        
        {...this.props}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        color={color}
        reverse={pointing}
        // contentShow={pointing}        
      />      
    );
  }
}

Point.propTypes = {

};

export default Point;

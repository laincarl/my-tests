import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Point from './Point';

class HoverPoint extends Component {
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
      <Point 
        color={color}       
        {...this.props}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}        
        reverse={pointing}
        // contentShow={pointing}        
      />      
    );
  }
}

HoverPoint.propTypes = {

};

export default HoverPoint;

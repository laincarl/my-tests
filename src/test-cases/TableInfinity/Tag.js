import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tag extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }
  
  render() {
    const { data, dataIndex } = this.props;
    return (
      data[dataIndex]
    );
  }
}

Tag.propTypes = {

};

export default Tag;

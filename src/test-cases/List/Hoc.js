import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Hoc extends Component {
  render() {
    const { data } = this.props;
    return (this.props.children(data));
  }
}

Hoc.propTypes = {

};

export default Hoc;

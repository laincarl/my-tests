import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Child from './Child';
import SecChild from './SecChild';

class Hooks extends Component {
  render() {
    return (
      <div>
        Hooks
        <Child />
        <SecChild />
      </div>
    );
  }
}

Hooks.propTypes = {

};

export default Hooks;

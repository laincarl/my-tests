import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UseComponent from './UseComponent';
import UseFunction from './UseFunction';
import './ComponentVSfunction.css';


class ComponentVSfunction extends Component {
  render() {
    return (
      <div>
        ComponentVSfunction
        <UseComponent />
        {/* <UseFunction /> */}
      </div>
    );
  }
}

ComponentVSfunction.propTypes = {

};

export default ComponentVSfunction;

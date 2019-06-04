import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Connector.scss';

class Connector extends Component {
  render() {
    const { from, to } = this.props;
    return (
      <path
        className="line"
        d={`
        M${from.x},${from.y} 
        C${from.x + 50},${from.y} ${to.x - 50},${to.y} ${to.x},${to.y}`}
      />
    );
  }
}

Connector.propTypes = {

};

export default Connector;

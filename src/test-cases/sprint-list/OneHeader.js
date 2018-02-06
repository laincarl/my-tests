import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OneHeader extends Component {
  render() {
    return (
      <div
        style={{
          height: '41px',
          background: '#FAFAFA',
          fontSize: '14px',
          color: 'rgba(0,0,0,0.65)',
          lineHeight: '41px',
          marginLeft: '13px',
        }}
      >
        Release 3.0000000000000
      </div>
    );
  }
}

OneHeader.propTypes = {};

export default OneHeader;

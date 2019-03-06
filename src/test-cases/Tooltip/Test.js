import React, { Component } from 'react';
import Tooltip from './Tooltip';

class Test extends Component {
  render() {
    return (
      <div>
        <Tooltip title="这里是提示">
          <div style={{
            display: 'inline-block',
            padding: '10px',
            border: '1px dashed pink',
          }}
          >
            Tooltip
          </div>
        </Tooltip>
        <Tooltip title="这里是一个很长的提示">
          <div style={{
            width: 70,
            padding: '10px',
            border: '1px dashed pink',
            marginTop: 200,
          }}
          >
            Tooltip
          </div>
        </Tooltip>
      </div>
    );
  }
}

Test.propTypes = {

};

export default Test;

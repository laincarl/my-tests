
import React, { Component } from 'react';
import Material from './Material';

class Test extends Component {
  render() {
    return (
      <Material>          
        <div style={{
          height: 200, width: 200, border: '1px solid black', userSelect: 'none', 
        }}
        >
            点击会有Material水波效果
        </div>
      </Material>
    );
  }
}


export default Test;

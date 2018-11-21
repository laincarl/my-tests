import React, { Component } from 'react';
import ResizeAble from './ResizeAble';

class Test extends Component {
  render() {
    return (
      <div>
        <ResizeAble
          modes={['top', 'right', 'bottom', 'left', 'bottomRight', 'topRight', 'bottomLeft', 'topLeft'] || ['right', 'bottom']}
          size={{
            // maxHeight: 500,
            // minWidth: 100,
            // maxWidth: 500,
          }}
        >
          <div style={{ textAlign: 'center' }}>sss</div>
        </ResizeAble>
      </div>
    );
  }
}


export default Test;

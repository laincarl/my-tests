import React, { Component } from 'react';
import Anchor from './Anchor';

const { Point, Pointer } = Anchor;
class Test extends Component {
  render() {
    return (
      <div>
        <Anchor getContainer={() => this.scroll}>
          <div style={{ display: 'flex' }}>
            <div
              ref={(scroll) => { this.scroll = scroll; }}
              style={{
                height: 500, width: 500, overflow: 'auto', border: '2px dashed gray',
              }}
            >
              <Point id="point1">
                <div style={{ height: 600 }}>
                Point1
                </div>
              </Point>
              <Point id="point2">
                <div style={{ height: 500 }}>
                Point2
                </div>
              </Point>
            </div>
            <div>
              <Pointer to="point1">
                <div>
                Pointer1
                </div>
              </Pointer>
              <Pointer to="point2">
                <div>
                Pointer2
                </div>
              </Pointer>
            </div>
          </div>
        </Anchor>
      </div>
    );
  }
}

Test.propTypes = {

};

export default Test;

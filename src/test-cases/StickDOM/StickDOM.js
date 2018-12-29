import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stickyard from './stickyard';

export class StickDOM extends Component {
  handleScroll=(e) => {
    console.log(e.target.offsetParent, this.ss.offsetParent, e.target.scrollHeight);
    console.log(e.target.offsetTop, this.ss.offsetTop);
  }

  render() {
    const items = [{
      key: 1,
      sticky: true,
      label: 'test1',
    }, {
      key: 2,
      sticky: false,
      label: 'test2',
    }, {
      key: 3,
      sticky: true,
      label: 'test3',
    }, {
      key: 4,
      sticky: true,
      label: 'test4',
    }, {
      key: 5,
      sticky: true,
      label: 'test5',
    }];
    return (
      <div>
        <Stickyard stickPosition="bottom">
          {({ registerContainer, registerSticky }) => (
            <div ref={registerContainer} style={{ height: 150, overflow: 'auto' }}>
              {items.map((item, index) => (
                <div>
                  <div style={{ height: 60 }}>
                    {'content'}
                  </div>                  
                  <div style={{ height: 50 }} key={item.key} ref={item.sticky ? registerSticky : null}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Stickyard>       
      </div>
    );
  }
}


export default StickDOM;

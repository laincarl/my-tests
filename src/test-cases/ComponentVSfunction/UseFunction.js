import React, { Component } from 'react';
import StatusFunction from './StatusFunction';

const statusList = Array(10000).fill({
  name: 'test',
  type: 'todo',
});
class UseFunction extends Component {
  render() {
    return (
      <div>
        Component
        {statusList.map(status => <StatusFunction status={status} />)}       
      </div>
    );
  }
}
export default UseFunction;

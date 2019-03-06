import React, { Component } from 'react';
import StatusComponent from './StatusComponent';

const statusList = Array(10000).fill({
  name: 'test',
  type: 'todo',
});
class UseComponent extends Component {
  render() {
    return (
      <div>
        Component
        {statusList.map(status => <StatusComponent status={status} />)}       
      </div>
    );
  }
}
export default UseComponent;

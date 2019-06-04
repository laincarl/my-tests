import React, { Component } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import StatusComponent from './StatusComponent';

const statusList = Array(100000).fill({
  name: 'test',
  type: 'todo',
});
class UseComponent extends Component {
  rowRenderer = ({
    key,
    index,
    isScrolling,
    isVisible,
    style,
  }) => (
    <div
      key={key}
      style={style}
    >
      <StatusComponent status={statusList[index]} />
    </div>
  )

  render() {
    return (
      <div style={{ height: 500 }}>
        Component
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={statusList.length}
              rowHeight={30}
              rowRenderer={this.rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}
export default UseComponent;

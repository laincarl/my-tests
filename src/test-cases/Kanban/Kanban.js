import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  List, AutoSizer, WindowScroller, CellMeasurer, CellMeasurerCache,
} from 'react-virtualized';
import './Kanban.css';

const cache = new CellMeasurerCache({ defaultHeight: 150, fixedWidth: true });
function cellRenderer({
  index, key, parent, style,
}) {
  console.log(index);

  return (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      parent={parent}
      rowIndex={index}
    >
      <div
        style={style}
      >
        <div style={{ height: 150 }}>
          test
        </div>
      </div>
    </CellMeasurer>
  );
}
class Kanban extends Component {
  render() {
    return (
      <div style={{ height: '100%', width: '100%', overflow: 'auto' }} ref={scroller => this.scroller = scroller}>
        <WindowScroller scrollElement={this.scroller}>
          {({
            height, isScrolling, onChildScroll, scrollTop,
          }) => (
            <List
              autoHeight
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              rowCount={1000}
              rowHeight={cache.rowHeight}
              rowRenderer={cellRenderer}
              scrollTop={scrollTop}
              width={150}
            />
          )}
        </WindowScroller> 
      </div>
    );
  }
}

Kanban.propTypes = {

};

export default Kanban;

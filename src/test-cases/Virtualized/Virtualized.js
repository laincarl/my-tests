import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  List, AutoSizer, CellMeasurer, CellMeasurerCache, 
} from 'react-virtualized';
import Item from './Item';
import Item2 from './Item2';
import './Virtualized.css';

const list = [{
  name: 1,
  size: 50,
}];
class Virtualized extends Component {
  constructor(props, context) {
    super(props, context);

    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 10,
    });

    this._rowRenderer = this._rowRenderer.bind(this);
    this._rowRenderer2 = this._rowRenderer2.bind(this);
  }

  handleResize=(index) => {
    this._cache.clear(index, 0);
    this.list.recomputeRowHeights(index);
  }

  _rowRenderer({ 
    index, key, parent, style, 
  }) {
    return (
      <Item
        cache={this._cache}
        columnIndex={0}
        key={key}
        itemKey={key}
        index={index}
        parent={parent}
        style={style}
      />
    );
  }

  _rowRenderer2({ 
    index, key, parent, style, 
  }) {
    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={0}
        key={key}
        rowIndex={index}
        parent={parent}
      >
        {({ measure }) => (
          <div style={style}>
            <Item2 resize={this.handleResize} index={index} />
          </div>
        )}
      </CellMeasurer>
    );
  }

  render() {
    return (
      <List
        ref={thisList => this.list = thisList}
        // className={styles.BodyGrid}
        deferredMeasurementCache={this._cache}
        height={400}
        overscanRowCount={0}
        rowCount={1000}
        rowHeight={this._cache.rowHeight}
        rowRenderer={this._rowRenderer2}
        width={500}
      />
    );
  }
}

Virtualized.propTypes = {

};

export default Virtualized;

import React, { useState, memo } from 'react';
import {
  List, AutoSizer, CellMeasurer, CellMeasurerCache, 
} from 'react-virtualized';
import Item from './Item';

const ItemContainer = ({
  cache, index, style, itemKey, 
}) => {
  console.log(`render${index}`);
  const [collapse, setCollapse] = useState(true);

  return (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      // key={itemKey}
      rowIndex={index}
      parent={parent}
    >
      {({ measure }) => (
        <div style={style}>
          <Item collapse={collapse} setCollapse={setCollapse} />
        </div>
      )}
    </CellMeasurer>
    
  );
};

export default memo(ItemContainer);

import React, { useState, memo } from 'react';
import {
  List, AutoSizer, CellMeasurer, CellMeasurerCache, 
} from 'react-virtualized';

const Item = ({
  cache, index, style, itemKey, 
}) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={itemKey}
      rowIndex={index}
      parent={parent}
    >
      {({ measure }) => (
        <div style={style}>
          <div role="none" onClick={() => setCollapse(!collapse)}>
            {collapse ? (
              <div>
          collapse
              </div>
            ) : (
              <div style={{ height: 50 }}>
            expand
              </div>
            )}
          </div>
        </div>
      )}
    </CellMeasurer>
    
  );
};

export default memo(Item);

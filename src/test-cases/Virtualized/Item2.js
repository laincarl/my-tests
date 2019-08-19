import React, { useState, memo } from 'react';
import {
  List, AutoSizer, CellMeasurer, CellMeasurerCache,
} from 'react-virtualized';

const Item = ({
  cache, index, style, itemKey, resize,
}) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <div
      role="none"
      onClick={() => {
        setCollapse(!collapse);
        setTimeout(() => {
          resize(index);
        });
      }
    
    }
    >
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
  );
};
export default memo(Item);

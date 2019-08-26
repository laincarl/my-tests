import React, { useState, memo } from 'react';
import {
  List, AutoSizer, CellMeasurer, CellMeasurerCache, 
} from 'react-virtualized';

const Item = ({
  collapse, setCollapse,
}) => (
   
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
    
);

export default memo(Item);

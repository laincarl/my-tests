import React, {
  useState, memo, useMemo, useEffect, useRef,
} from 'react';
import { debounce } from 'lodash';
import {
  List, AutoSizer, CellMeasurer, CellMeasurerCache,
} from 'react-virtualized';
import { observer } from 'mobx-react-lite';
import { addResizeListener, removeResizeListener } from './ResizeListener';

const Item = observer(({
  data, index, resize, setCollapse,
}) => {
  const { collapse } = data;
  const ref = useRef(null);
  const handleResize = (e) => {
    console.log('resize', index);
    resize(index);
  };
  useEffect(() => {
    addResizeListener(ref.current, handleResize);
    return () => { removeResizeListener(ref.current, handleResize); };
  }, []);
  // useLayoutEffect(() => {
  //   resize(index);
  // });
  return (
    <div style={{ minHeight: 200 }} ref={ref}>
      <button
        type="button"
        onClick={() => {
          setCollapse(index, !collapse);
          // setTimeout(() => {
          //   resize(index);
          // });
        }}
      >
        switch
      </button>
      {collapse ? (
        <div>
          collapse
        </div>
      ) : (
        <div>
            expand
          <div contentEditable>sss</div>
        </div>
      )}
      {/* <AutoSizer onResize={handleResize}>
        {() => {}}
      </AutoSizer> */}
    </div>
  );
});
export default memo(Item);

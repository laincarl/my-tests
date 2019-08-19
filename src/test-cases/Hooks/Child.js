import React, { useContext, useMemo } from 'react';
import TextContext from './store';

const Child = () => {
  const { state } = useContext(TextContext);
  console.log('Child render');
  return useMemo(() => <div>{state.value}</div>, [state.value]);
};
export default Child;

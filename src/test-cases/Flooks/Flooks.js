import React, { useState } from 'react';
import { setModel, useModel } from 'flooks';
import Child from './Child';
import SecChild from './SecChild';

const counter = {
  state: {
    count: 0,
    test: 1,
  },
  actions: ({ model, setState }) => ({
    increment() {
      const { count } = model();
      setState({ count: count + 1 });
    },
    decrement() {
      const { count } = model();
      setState({ count: count - 1 });
    },
    async incrementAsync() {
      const { increment } = model();
      await new Promise(resolve => setTimeout(resolve, 1000));
      increment();
    },
  }),
};

setModel('counter', counter);
function test() {
  const [num, setNum] = useState(0);
  return <div>{num}</div>;
}
function Counter() {
  const {
    count, increment, decrement, incrementAsync,
  } = useModel('counter');
  return (
    <>
      Count:
      {' '}
      {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={incrementAsync}>
        + async
        {incrementAsync.loading && '...'}
      </button>
      <Child />
      <SecChild />
      {test()}
      <button onClick={() => { test(); }}>dd</button>
    </>
  );
}
export default Counter;

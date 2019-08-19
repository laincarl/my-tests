import React, { useContext } from 'react';
import TextContext from './store';

const SecChild = () => {
  const { state, dispatch } = useContext(TextContext);
  const { test } = state;
  const handleClick = () => {
    dispatch({
      type: 'increment',
    });
  };
  return (
    <div>
      <button onClick={handleClick}>add</button>
      {test}
    </div>
  );
};
export default SecChild;

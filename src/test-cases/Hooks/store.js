import React, { useReducer, createContext, useMemo } from 'react';

const TestContext = createContext();

export default TestContext;
const augmentDispatch = (dispatch, state) => input => (input instanceof Function ? input(dispatch, state) : dispatch(input));
export const setSync = value => (dispatch, state) => {
  setTimeout(() => {
    dispatch({
      type: 'set',
      payload: value,
    });
  }, 5000);
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, test: state.test + 1 };
    case 'set':
      return { ...state, test: action.payload };
    default:
      throw new Error();
  }
}

export const TestContextProvider = (props) => {
  const initialState = {
    test: 1,
    value: 2,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TestContext.Provider value={{ state, dispatch: augmentDispatch(dispatch, state) }}>
      {props.children}
    </TestContext.Provider>
  );
};

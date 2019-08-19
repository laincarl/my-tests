import React from 'react';

import { setModel, useModel } from 'flooks';

const Child = () => {
  const { count } = useModel('counter');
  return <div>{count}</div>;
};
export default Child;

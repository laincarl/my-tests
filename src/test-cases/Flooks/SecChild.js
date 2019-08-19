import React from 'react';

import { setModel, useModel } from 'flooks';

const SecChild = () => {
  const { test } = useModel('counter');
  return <div>{test}</div>;
};
export default SecChild;

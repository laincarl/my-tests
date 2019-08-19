import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'Loading';
import { TestContextProvider } from './store';

const Hooks = Loadable({
  loader: () => import('./Hooks'),
  loading: Loading,
});
const HooksWithProvider = props => (
  <TestContextProvider {...props}>
    <Hooks />
  </TestContextProvider>
);
export default HooksWithProvider;

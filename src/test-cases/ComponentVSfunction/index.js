import Loadable from 'react-loadable';
import Loading from 'Loading';

const ComponentVSfunction = Loadable({
  loader: () => import('./Test'),
  loading: Loading
});
export default ComponentVSfunction;
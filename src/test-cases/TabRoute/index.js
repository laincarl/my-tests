import Loadable from 'react-loadable';
import Loading from 'Loading';

const TabRoute = Loadable({
  loader: () => import('./Test'),
  loading: Loading,
});
export default TabRoute;

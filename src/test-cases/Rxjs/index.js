import Loadable from 'react-loadable';
import Loading from 'Loading';

const Rxjs = Loadable({
  loader: () => import('./Rxjs'),
  loading: Loading
});
export default Rxjs;
import Loadable from 'react-loadable';
import Loading from 'Loading';

const Virtualized = Loadable({
  loader: () => import('./Virtualized'),
  loading: Loading
});
export default Virtualized;
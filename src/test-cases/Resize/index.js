import Loadable from 'react-loadable';
import Loading from 'Loading';
const Resize = Loadable({
  loader: () => import('./Resize'),
  loading: Loading
});
export default Resize;
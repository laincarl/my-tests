import Loadable from 'react-loadable';
import Loading from 'Loading';
const StickDOM = Loadable({
  loader: () => import('./Test'),
  loading: Loading
});
export default StickDOM;
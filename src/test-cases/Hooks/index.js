import Loadable from 'react-loadable';
import Loading from 'Loading';
const Hooks = Loadable({
  loader: () => import('./Test'),
  loading: Loading
});
export default Hooks;
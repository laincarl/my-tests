import Loadable from 'react-loadable';
import Loading from 'Loading';

const Tooltip = Loadable({
  loader: () => import('./Test'),
  loading: Loading
});
export default Tooltip;
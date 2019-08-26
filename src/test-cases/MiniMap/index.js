import Loadable from 'react-loadable';
import Loading from 'Loading';
const MiniMap = Loadable({
  loader: () => import('./Test'),
  loading: Loading
});
export default MiniMap;
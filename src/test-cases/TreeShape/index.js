import Loadable from 'react-loadable';
import Loading from 'Loading';
const TreeShape = Loadable({
  loader: () => import('./TreeShape'),
  loading: Loading
});
export default TreeShape;
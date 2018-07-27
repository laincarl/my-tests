import Loadable from 'react-loadable';
import Loading from 'Loading';
const TreeRender = Loadable({
  loader: () => import('./TreeRender'),
  loading: Loading
});
export default TreeRender;
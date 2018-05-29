import Loadable from 'react-loadable';
import Loading from 'Loading';
const Drag = Loadable({
  loader: () => import('./Drag'),
  loading: Loading
});
export default Drag;
import Loadable from 'react-loadable';
import Loading from 'Loading';
const TableNest = Loadable({
  loader: () => import('./TableNest'),
  loading: Loading
});
export default TableNest;
import Loadable from 'react-loadable';
import Loading from 'Loading';
const TableDrag = Loadable({
  loader: () => import('./TableDrag'),
  loading: Loading
});
export default TableDrag;
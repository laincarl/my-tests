import Loadable from 'react-loadable';
import Loading from 'Loading';
const TableCol = Loadable({
  loader: () => import('./TableCol'),
  loading: Loading
});
export default TableCol;
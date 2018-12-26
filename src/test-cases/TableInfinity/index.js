import Loadable from 'react-loadable';
import Loading from 'Loading';
const TableInfinity = Loadable({
  loader: () => import('./TableInfinity'),
  loading: Loading
});
export default TableInfinity;
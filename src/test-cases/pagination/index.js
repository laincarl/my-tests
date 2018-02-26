import Loadable from 'react-loadable';
import Loading from 'Loading';
const MyPagination = Loadable({
  loader: () => import('./MyPagination'),
  loading: Loading
});
export default MyPagination;
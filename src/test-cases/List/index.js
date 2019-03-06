import Loadable from 'react-loadable';
import Loading from 'Loading';
const List = Loadable({
  loader: () => import('./List'),
  loading: Loading
});
export default List;
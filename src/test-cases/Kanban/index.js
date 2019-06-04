import Loadable from 'react-loadable';
import Loading from 'Loading';
const Kanban = Loadable({
  loader: () => import('./Kanban'),
  loading: Loading
});
export default Kanban;
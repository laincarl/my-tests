import Loadable from 'react-loadable';
import Loading from 'Loading';
const Schedule = Loadable({
  loader: () => import('./Schedule'),
  loading: Loading
});
export default Schedule;
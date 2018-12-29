import Loadable from 'react-loadable';
import Loading from 'Loading';
const WorkLoad = Loadable({
  loader: () => import('./Test'),
  loading: Loading
});
export default WorkLoad;
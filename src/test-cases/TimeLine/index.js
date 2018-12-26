import Loadable from 'react-loadable';
import Loading from 'Loading';
const TimeLine = Loadable({
  loader: () => import('./Test'),
  loading: Loading
});
export default TimeLine;
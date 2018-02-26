import Loadable from 'react-loadable';
import Loading from 'Loading';
const Main = Loadable({
  loader: () => import('./Main'),
  loading: Loading
});
export default Main;
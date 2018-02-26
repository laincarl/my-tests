import Loadable from 'react-loadable';
import Loading from 'Loading';
const NotFoundPage = Loadable({
  loader: () => import('./NotFoundPage'),
  loading: Loading
});
export default NotFoundPage
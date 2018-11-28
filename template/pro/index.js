import Loadable from 'react-loadable';
import Loading from 'Loading';
const {%Component%} = Loadable({
  loader: () => import('./Test'),
  loading: Loading
});
export default {%Component%};
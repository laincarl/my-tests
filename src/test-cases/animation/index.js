import Loadable from 'react-loadable';
import Loading from 'Loading';
const Animation = Loadable({
  loader: () => import('./Animation'),
  loading: Loading
});
export default Animation;
import Loadable from 'react-loadable';
import Loading from 'Loading';

const Flooks = Loadable({
  loader: () => import('./Flooks'),
  loading: Loading,
});
export default Flooks;

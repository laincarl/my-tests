import Loadable from 'react-loadable';
import Loading from 'Loading';

const Dragreact = Loadable({
  loader: () => import('./Dragreact'),
  loading: Loading,
});
export default Dragreact;

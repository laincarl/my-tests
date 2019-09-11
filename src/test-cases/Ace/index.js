import Loadable from 'react-loadable';
import Loading from 'Loading';
const Ace = Loadable({
  loader: () => import('./Ace'),
  loading: Loading
});
export default Ace;
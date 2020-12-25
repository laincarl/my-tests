import Loadable from 'react-loadable';
import Loading from 'Loading';

const Quill = Loadable({
  loader: () => import('./Quill'),
  loading: Loading
});
export default Quill;
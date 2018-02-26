import Loadable from 'react-loadable';
import Loading from 'Loading';
const Modal = Loadable({
  loader: () => import('./Use'),
  loading: Loading
});
export default Modal;
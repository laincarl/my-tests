import Loadable from 'react-loadable';
import Loading from 'Loading';

const ResizeAble = Loadable({
  loader: () => import('./Test'),
  loading: Loading,
});
export default ResizeAble;

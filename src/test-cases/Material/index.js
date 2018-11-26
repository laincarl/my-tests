import Loadable from 'react-loadable';
import Loading from 'Loading';

const Material = Loadable({
  loader: () => import('./Test'),
  loading: Loading,
});
export default Material;

import Loadable from 'react-loadable';
import Loading from 'Loading';
const CssModule2 = Loadable({
  loader: () => import('./CssModule2'),
  loading: Loading
});
export default CssModule2;
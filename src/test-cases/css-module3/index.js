import Loadable from 'react-loadable';
import Loading from 'Loading';
const CssModule3 = Loadable({
  loader: () => import('./CssModule3'),
  loading: Loading
});
export default CssModule3;
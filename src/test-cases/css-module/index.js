import Loadable from 'react-loadable';
import Loading from 'Loading';
const CssModule = Loadable({
  loader: () => import('./CssModule'),
  loading: Loading
});
export default CssModule;
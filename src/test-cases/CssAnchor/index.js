import Loadable from 'react-loadable';
import Loading from 'Loading';
const CssAnchor = Loadable({
  loader: () => import('./CssAnchor'),
  loading: Loading
});
export default CssAnchor;
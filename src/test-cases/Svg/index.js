import Loadable from 'react-loadable';
import Loading from 'Loading';
const Svg = Loadable({
  loader: () => import('./Svg'),
  loading: Loading
});
export default Svg;
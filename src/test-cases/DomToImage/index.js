import Loadable from 'react-loadable';
import Loading from 'Loading';
const DomToImage = Loadable({
  loader: () => import('./DomToImage'),
  loading: Loading
});
export default DomToImage;
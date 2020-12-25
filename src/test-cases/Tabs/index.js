import Loadable from 'react-loadable';
import Loading from 'Loading';

const Tabs = Loadable({
  loader: () => import('./Test'),
  loading: Loading
});
export default Tabs;
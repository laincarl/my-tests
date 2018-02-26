import Loadable from 'react-loadable';
import Loading from 'Loading';
const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading
});
export default Home
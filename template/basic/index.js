import Loadable from 'react-loadable';
import Loading from 'Loading';
const {%Component%} = Loadable({
  loader: () => import('./{%Component%}'),
  loading: Loading
});
export default {%Component%};
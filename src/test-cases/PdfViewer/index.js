import Loadable from 'react-loadable';
import Loading from 'Loading';

const Test = Loadable({
  loader: () => import('./Test'),
  loading: Loading,
});
export default Test;

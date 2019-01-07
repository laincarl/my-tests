import Loadable from 'react-loadable';
import Loading from 'Loading';
const PortfolioPlanView = Loadable({
  loader: () => import('./Test'),
  loading: Loading
});
export default PortfolioPlanView;
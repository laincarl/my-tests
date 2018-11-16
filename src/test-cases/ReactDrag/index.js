import Loadable from 'react-loadable';
import Loading from 'Loading';
const ReactDrag = Loadable({
  loader: () => import('./ReactDrag'),
  loading: Loading
});
export default ReactDrag;
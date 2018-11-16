import Loadable from 'react-loadable';
import Loading from 'Loading';
const CalendarTimeline = Loadable({
  loader: () => import('./CalendarTimeline'),
  loading: Loading
});
export default CalendarTimeline;
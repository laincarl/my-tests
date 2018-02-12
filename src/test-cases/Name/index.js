
import asyncComponent from "../../AsyncComponent";
const Name = asyncComponent(() => import('./Name'));
export default Name;
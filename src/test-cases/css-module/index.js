import asyncComponent from "../../AsyncComponent";
const CssModule = asyncComponent(() => import('./CssModule'));
const CssModule2 = asyncComponent(() => import('./CssModule2'));
const CssModule3 = asyncComponent(() => import('./CssModule3'));
export { CssModule, CssModule2, CssModule3 };
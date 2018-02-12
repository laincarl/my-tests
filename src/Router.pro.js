import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from './AsyncComponent';
const Home = asyncComponent(() => import("./test-cases/Main"));
const NotFoundPage = asyncComponent(() => import("./test-cases/NotFoundPage"));
const Animation = asyncComponent(() => import("./test-cases/Animation"));
const CssModule = asyncComponent(() => import("./test-cases/css-module"));
const Main = asyncComponent(() => import("./test-cases/Main"));
const CssModule2 = asyncComponent(() => import("./test-cases/css-module2"));
const CssModule3 = asyncComponent(() => import("./test-cases/css-module3"));
const MyPagination = asyncComponent(() => import("./test-cases/pagination"));
const TableNest = asyncComponent(() => import("./test-cases/table-nest"));
const Modal = asyncComponent(() => import("./test-cases/modal"));
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Animation" component={Animation} />
<Route path="/CssModule" component={CssModule} />
<Route path="/Main" component={Main} />
<Route path="/CssModule2" component={CssModule2} />
<Route path="/CssModule3" component={CssModule3} />
<Route path="/MyPagination" component={MyPagination} />
<Route path="/TableNest" component={TableNest} />
<Route path="/Modal" component={Modal} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;
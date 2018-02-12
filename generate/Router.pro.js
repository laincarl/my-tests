import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from './AsyncComponent';
const Home = asyncComponent(() => import("./test-cases/Main"));
const NotFoundPage = asyncComponent(() => import("./test-cases/NotFoundPage"));
{%async_imports%}
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    {%routers%}
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;
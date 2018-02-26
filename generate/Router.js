import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFoundPage, {%imports%} } from './test-cases';
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
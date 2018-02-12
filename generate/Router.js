import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFoundPage, {%imports%} } from './test-cases';
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    {%routers%}
    {/* <Route path="/tablenest" component={TableNest} />
    <Route path="/cssmodule" component={CssModule} />
    <Route path="/cssmodule2" component={CssModule2} />
    <Route path="/cssmodule3" component={CssModule3} />
    <Route path="/pagination" component={MyPagination} />
    <Route path="/animation" component={Animation} /> */}
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;

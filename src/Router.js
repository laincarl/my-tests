import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './mobx-react-router/Home';
import Test from './mobx-react-router/Test';
import NotFoundPage from './mobx-react-router/NotFoundPage';
import TableNest from './table-nest/TableNest';
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/test" component={Test} />
    <Route path="/tablenest" component={TableNest} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;
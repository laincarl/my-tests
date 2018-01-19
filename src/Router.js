import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './mobx-react-router/Home';
import Test from './mobx-react-router/Test';
import NotFoundPage from './mobx-react-router/NotFoundPage';
import TableNest from './table-nest/TableNest';
import CssModule from './css-module/CssModule';
import CssModule2 from './css-module/CssModule2';
import CssModule3 from './css-module/CssModule3';
import MyPagination from './pagination/MyPagination';
import Animation from './animation/Animation';

const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/test" component={Test} />
    <Route path="/tablenest" component={TableNest} />
    <Route path="/cssmodule" component={CssModule} />
    <Route path="/cssmodule2" component={CssModule2} />
    <Route path="/cssmodule3" component={CssModule3} />
    <Route path="/pagination" component={MyPagination} />  
    <Route path="/animation" component={Animation} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;

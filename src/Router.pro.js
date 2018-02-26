import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFoundPage,  Animation , CssModule , CssModule2 , CssModule3 , Main , Modal , MyPagination , TableNest , TreeShape  } from './test-cases';
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/CssModule2" component={CssModule2} />
    <Route path="/Animation" component={Animation} />
    <Route path="/CssModule" component={CssModule} />
    <Route path="/CssModule3" component={CssModule3} />
    <Route path="/Main" component={Main} />
    <Route path="/MyPagination" component={MyPagination} />
    <Route path="/Modal" component={Modal} />
    <Route path="/TreeShape" component={TreeShape} />
    <Route path="/TableNest" component={TableNest} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;
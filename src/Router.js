import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFoundPage,  Anchor, Dragreact, Main, Material, Modal, ResizeAble, Tabs, TreeRender } from './test-cases';
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Anchor" component={Anchor} />
<Route path="/Dragreact" component={Dragreact} />
<Route path="/Main" component={Main} />
<Route path="/Material" component={Material} />
<Route path="/Modal" component={Modal} />
<Route path="/TreeRender" component={TreeRender} />
<Route path="/Tabs" component={Tabs} />
<Route path="/ResizeAble" component={ResizeAble} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;
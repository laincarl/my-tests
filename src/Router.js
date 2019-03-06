import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFoundPage,  Anchor, ComponentVSfunction, Dragreact, Hooks, List, Main, Material, Modal, PortfolioPlanView, ResizeAble, ResizeDivider, Schedule, StickDOM, TableInfinity, Tabs, TimeLine, Tooltip, TreeRender, WorkLoad } from './test-cases';
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/ComponentVSfunction" component={ComponentVSfunction} />
<Route path="/Anchor" component={Anchor} />
<Route path="/Hooks" component={Hooks} />
<Route path="/Main" component={Main} />
<Route path="/Dragreact" component={Dragreact} />
<Route path="/List" component={List} />
<Route path="/ResizeDivider" component={ResizeDivider} />
<Route path="/Modal" component={Modal} />
<Route path="/Material" component={Material} />
<Route path="/ResizeAble" component={ResizeAble} />
<Route path="/PortfolioPlanView" component={PortfolioPlanView} />
<Route path="/Tabs" component={Tabs} />
<Route path="/StickDOM" component={StickDOM} />
<Route path="/TableInfinity" component={TableInfinity} />
<Route path="/Schedule" component={Schedule} />
<Route path="/Tooltip" component={Tooltip} />
<Route path="/TreeRender" component={TreeRender} />
<Route path="/TimeLine" component={TimeLine} />
<Route path="/WorkLoad" component={WorkLoad} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;
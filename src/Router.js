import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFoundPage,  Anchor, ComponentVSfunction, CssAnchor, Dragreact, Flooks, HooksWithProvider, Kanban, List, Main, Material, Modal, PortfolioPlanView, Quill, ResizeAble, ResizeDivider, Rxjs, Schedule, StickDOM, Svg, TableInfinity, TabRoute, Tabs, TimeLine, Tooltip, TreeRender, WorkLoad } from './test-cases';
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/ComponentVSfunction" component={ComponentVSfunction} />
<Route path="/Anchor" component={Anchor} />
<Route path="/List" component={List} />
<Route path="/CssAnchor" component={CssAnchor} />
<Route path="/Flooks" component={Flooks} />
<Route path="/Kanban" component={Kanban} />
<Route path="/Material" component={Material} />
<Route path="/PortfolioPlanView" component={PortfolioPlanView} />
<Route path="/Quill" component={Quill} />
<Route path="/Modal" component={Modal} />
<Route path="/ResizeDivider" component={ResizeDivider} />
<Route path="/ResizeAble" component={ResizeAble} />
<Route path="/Schedule" component={Schedule} />
<Route path="/StickDOM" component={StickDOM} />
<Route path="/Main" component={Main} />
<Route path="/Rxjs" component={Rxjs} />
<Route path="/HooksWithProvider" component={HooksWithProvider} />
<Route path="/Svg" component={Svg} />
<Route path="/Tabs" component={Tabs} />
<Route path="/TabRoute" component={TabRoute} />
<Route path="/TableInfinity" component={TableInfinity} />
<Route path="/TreeRender" component={TreeRender} />
<Route path="/Dragreact" component={Dragreact} />
<Route path="/WorkLoad" component={WorkLoad} />
<Route path="/TimeLine" component={TimeLine} />
<Route path="/Tooltip" component={Tooltip} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;
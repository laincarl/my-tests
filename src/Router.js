import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFoundPage,  Anchor, ComponentVSfunction, CssAnchor, Dragreact, Hooks, Kanban, List, Main, Material, Modal, PortfolioPlanView, Quill, ResizeAble, ResizeDivider, Rxjs, Schedule, StickDOM, Svg, TableInfinity, Tabs, TimeLine, Tooltip, TreeRender, Virtualized, WorkLoad } from './test-cases';
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/ComponentVSfunction" component={ComponentVSfunction} />
<Route path="/Anchor" component={Anchor} />
<Route path="/CssAnchor" component={CssAnchor} />
<Route path="/Hooks" component={Hooks} />
<Route path="/Dragreact" component={Dragreact} />
<Route path="/List" component={List} />
<Route path="/Kanban" component={Kanban} />
<Route path="/Main" component={Main} />
<Route path="/Material" component={Material} />
<Route path="/Modal" component={Modal} />
<Route path="/Quill" component={Quill} />
<Route path="/ResizeAble" component={ResizeAble} />
<Route path="/PortfolioPlanView" component={PortfolioPlanView} />
<Route path="/ResizeDivider" component={ResizeDivider} />
<Route path="/Rxjs" component={Rxjs} />
<Route path="/Schedule" component={Schedule} />
<Route path="/StickDOM" component={StickDOM} />
<Route path="/Svg" component={Svg} />
<Route path="/TableInfinity" component={TableInfinity} />
<Route path="/Tabs" component={Tabs} />
<Route path="/TimeLine" component={TimeLine} />
<Route path="/Tooltip" component={Tooltip} />
<Route path="/TreeRender" component={TreeRender} />
<Route path="/WorkLoad" component={WorkLoad} />
<Route path="/Virtualized" component={Virtualized} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;
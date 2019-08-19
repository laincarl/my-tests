import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Home, NotFoundPage, Anchor, ComponentVSfunction, CssAnchor, Dragreact, Flooks, HooksWithProvider, Kanban, List, Main, Material, Modal, PortfolioPlanView, Quill, ResizeAble, ResizeDivider, Rxjs, Schedule, StickDOM, Svg, TableInfinity, TabRoute, Tabs, TimeLine, Tooltip, TreeRender, Virtualized, WorkLoad, 
} from './test-cases';

const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Anchor" component={Anchor} />
    <Route path="/ComponentVSfunction" component={ComponentVSfunction} />
    <Route path="/Flooks" component={Flooks} />
    <Route path="/Dragreact" component={Dragreact} />
    <Route path="/HooksWithProvider" component={HooksWithProvider} />
    <Route path="/Kanban" component={Kanban} />
    <Route path="/CssAnchor" component={CssAnchor} />
    <Route path="/List" component={List} />
    <Route path="/Main" component={Main} />
    <Route path="/Material" component={Material} />
    <Route path="/Modal" component={Modal} />
    <Route path="/PortfolioPlanView" component={PortfolioPlanView} />
    <Route path="/Quill" component={Quill} />
    <Route path="/ResizeAble" component={ResizeAble} />
    <Route path="/ResizeDivider" component={ResizeDivider} />
    <Route path="/Rxjs" component={Rxjs} />
    <Route path="/Schedule" component={Schedule} />
    <Route path="/StickDOM" component={StickDOM} />
    <Route path="/Svg" component={Svg} />
    <Route path="/TableInfinity" component={TableInfinity} />
    <Route path="/TabRoute" component={TabRoute} />
    <Route path="/Tabs" component={Tabs} />
    <Route path="/TimeLine" component={TimeLine} />
    <Route path="/Tooltip" component={Tooltip} />
    <Route path="/TreeRender" component={TreeRender} />
    <Route path="/Virtualized" component={Virtualized} />
    <Route path="/WorkLoad" component={WorkLoad} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Home, NotFoundPage, Ace, Anchor, ComponentVSfunction, CssAnchor, Dragreact, HooksWithProvider, 
  List, Main, Material, Modal, PdfViewer, Quill, Resize, ResizeAble, 
  ResizeDivider, Rxjs, Svg, Tabs, Tooltip, Virtualized, 
} from './test-cases';

const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Ace" component={Ace} />
    <Route path="/Anchor" component={Anchor} />
    <Route path="/HooksWithProvider" component={HooksWithProvider} />
    <Route path="/CssAnchor" component={CssAnchor} />
    <Route path="/ComponentVSfunction" component={ComponentVSfunction} />
    <Route path="/Main" component={Main} />
    <Route path="/Material" component={Material} />
    <Route path="/PdfViewer" component={PdfViewer} />
    <Route path="/Dragreact" component={Dragreact} />
    <Route path="/Quill" component={Quill} />
    <Route path="/Resize" component={Resize} />
    <Route path="/ResizeDivider" component={ResizeDivider} />
    <Route path="/ResizeAble" component={ResizeAble} />
    <Route path="/Rxjs" component={Rxjs} />
    <Route path="/Svg" component={Svg} />
    <Route path="/Modal" component={Modal} />
    <Route path="/Tabs" component={Tabs} />
    <Route path="/Virtualized" component={Virtualized} />
    <Route path="/Tooltip" component={Tooltip} />
    <Route path="/List" component={List} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFoundPage,  Anchor, CalendarTimeline, CssModule, CssModule2, CssModule3, DomToImage, Drag, Dragreact, Main, Material, Modal, MyPagination, ReactDrag, ResizeAble, TableNest, TableCol, TableDrag, TreeRender, TreeShape } from './test-cases';
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Anchor" component={Anchor} />
<Route path="/CalendarTimeline" component={CalendarTimeline} />
<Route path="/CssModule2" component={CssModule2} />
<Route path="/CssModule" component={CssModule} />
<Route path="/CssModule3" component={CssModule3} />
<Route path="/Drag" component={Drag} />
<Route path="/DomToImage" component={DomToImage} />
<Route path="/Dragreact" component={Dragreact} />
<Route path="/Main" component={Main} />
<Route path="/Modal" component={Modal} />
<Route path="/Material" component={Material} />
<Route path="/MyPagination" component={MyPagination} />
<Route path="/ResizeAble" component={ResizeAble} />
<Route path="/ReactDrag" component={ReactDrag} />
<Route path="/TableNest" component={TableNest} />
<Route path="/TableDrag" component={TableDrag} />
<Route path="/TableCol" component={TableCol} />
<Route path="/TreeRender" component={TreeRender} />
<Route path="/TreeShape" component={TreeShape} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;
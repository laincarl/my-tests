import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, NotFoundPage,  Anchor, CssModule, CssModule2, CssModule3, Dragreact, Main, Material, Modal, ResizeAble, TreeRender } from './test-cases';
const PageSet = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/CssModule" component={CssModule} />
<Route path="/CssModule2" component={CssModule2} />
<Route path="/CssModule3" component={CssModule3} />
<Route path="/Dragreact" component={Dragreact} />
<Route path="/Main" component={Main} />
<Route path="/Anchor" component={Anchor} />
<Route path="/Material" component={Material} />
<Route path="/Modal" component={Modal} />
<Route path="/ResizeAble" component={ResizeAble} />
<Route path="/TreeRender" component={TreeRender} />
    <Route path="/404" component={NotFoundPage} />
    {/* 其他重定向到 404 */}
    <Redirect from="*" to="/404" />
  </Switch>
);
export default PageSet;
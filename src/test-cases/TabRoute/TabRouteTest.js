import React, { Fragment, useContext, useEffect } from 'react';
import { withRouter, Route } from 'react-router-dom';

import { Tabs } from 'antd';
import { find } from 'lodash';
import { TabContext } from './TabRouter';

const { TabPane } = Tabs;
const TabRouteTest = (props) => {
  const { registerRoute, TabComponent } = useContext(TabContext);
  useEffect(() => {
    registerRoute(props);
  }, []);
  const { component: Component, path } = props;
  return (
    <Route path={path} render={routeProps => <Component {...routeProps} TabComponent={TabComponent} />} />
  );
};

TabRouteTest.propTypes = {

};
export default TabRouteTest;

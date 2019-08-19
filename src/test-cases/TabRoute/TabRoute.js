import React, { createContext, useState, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { Tabs } from 'antd';
import { find } from 'lodash';

const { TabPane } = Tabs;
const TabRoute = withRouter(({
  routes, history, location,
}) => {
  const callback = (key) => {
    history.push(key);
  };
  const currentPath = location.pathname;

  const renderRoutes = () => routes.map(route => <Route {...route} />);
  const renderPanes = () => routes.map(({ title, path }) => <TabPane tab={title} key={path} />);
  const isMatch = find(routes, { path: currentPath });
  return (
    <Fragment>
      {isMatch ? (
        <Fragment>
          <Tabs activeKey={currentPath} onChange={callback}>
            {renderPanes()}
          </Tabs>
          {renderRoutes()}
        </Fragment>
      ) : null }
      <Route path="*" component={() => <div>404</div>} />
    </Fragment>
  );
});

TabRoute.propTypes = {

};
export default TabRoute;

import React, { createContext, useState, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { Tabs } from 'antd';
import { find } from 'lodash';

const { TabPane } = Tabs;
const TabContext = createContext();
export { TabContext };
const TabRoute = withRouter(({
  history, location, children,
}) => {
  const callback = (key) => {
    history.push(key);
  };
  const [routes, setRoutes] = useState([]);
  const registerRoute = (route) => {
    routes.push(route);
    setRoutes([...routes]);
  };
  const currentPath = location.pathname;
  const renderPanes = () => routes.map(({ title, path }) => <TabPane tab={title} key={path} />);
  const TabComponent = (
    <Tabs activeKey={currentPath} onChange={callback}>
      {renderPanes()}
    </Tabs>
  );
  // const renderRoutes = () => routes.map(route => <Route {...route} />);
  
  // const isMatch = find(routes, { path: currentPath });
  return (
    <TabContext.Provider value={{ registerRoute, TabComponent }}>
      {/* {isMatch ? (
        <Fragment>
          <Tabs activeKey={currentPath} onChange={callback}>
            {renderPanes()}
          </Tabs>
          {renderRoutes()}
        </Fragment>
      ) : null}
      <Route path="*" component={() => <div>404</div>} /> */}
      {children}
    </TabContext.Provider>
  );
});

TabRoute.propTypes = {

};
export default TabRoute;

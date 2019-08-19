import React, { Fragment } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import TabRoute from './TabRoute';
import TabRouter from './TabRouter';
import TabRouteTest from './TabRouteTest';

const Test = ({ match }) => (
  <Fragment>
    <Switch>
      <TabRouter>
        <TabRouteTest
          title="待办事项"
          path={`${match.url}/1`}
          component={({ TabComponent }) => (
            <div>
              {TabComponent}
            待办事项
            </div>
          )}
        />
        <TabRouteTest
          title="问题管理"
          path={`${match.url}/2`}
          component={({ TabComponent }) => (
            <div>
              {TabComponent}
            问题管理
            </div>
          )}
        />
      </TabRouter>
      <Route path="*" component={() => <div>404</div>} />
    </Switch>
    {/* <TabRoute routes={[{
      title: '待办事项',
      path: `${match.url}/1`,
      component: () => <div>待办事项</div>,
    }, {
      title: '问题管理',
      path: `${match.url}/2`,
      component: () => <div>问题管理</div>,
    }]}
    /> */}
    {/* <Link to={`${match.url}/1`}>待办事项</Link>
    <br />
    <Link to={`${match.url}/2`}>问题管理</Link>       */}
  </Fragment>
);
Test.propTypes = {

};

export default Test;

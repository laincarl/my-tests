import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import MenuTest from './MenuTest';
import ProRouter from './Router.pro';
import DevRouter from './Router.dev';
import menuStore from './menuStore';
const stores = {
  // Key can be whatever you want
  routing: menuStore,
  // ...other stores
};

export default class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={createBrowserHistory}>
          <div style={{ display: 'flex' }}>
            <div>
              <MenuTest />
            </div>
            <div>
              {process.env.NODE_ENV === 'production' ? <ProRouter /> : <DevRouter />}
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

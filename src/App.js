import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import MenuTest from './MenuTest';
import DevRouter from './Router';
import menuStore from './menuStore';

const stores = {
  // Key can be whatever you want
  routing: menuStore,
  // ...other stores
};

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router history={createBrowserHistory}>
          <div style={{ display: 'flex' }}>
            <div>
              <MenuTest />
            </div>
            <div>
              <DevRouter />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default hot(module)(App);

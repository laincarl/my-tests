import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { inject, observer } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import MenuTest from './MenuTest';
import ProRouter from './Router.pro';
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
              <ProRouter />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));


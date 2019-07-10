import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
// import * as Sentry from '@sentry/browser';
import MenuTest from './MenuTest';
import Routes from './Router';
import menuStore from './menuStore';
import ErrorCatch from './ErrorCatch';
import './index.css';

// Sentry.init({ dsn: 'https://5d4c26a6acab457c9e0f2621525c2170@sentry.io/1474700' });
ErrorCatch.init({
  url: 'http://localhost:9000/report',
});
const stores = {
  // Key can be whatever you want
  routing: menuStore,
  // ...other stores
};

class App extends Component {
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  
  render() {
    return (
      <Provider {...stores}>
        <Router history={createBrowserHistory}>
          <div style={{ display: 'flex' }}>
            <div style={{
              width: 256, height: '100vh', overflowX: 'hidden', overflowY: 'auto',
            }}
            >
              <MenuTest />
            </div>
            <div style={{ flex: 1, height: '100vh', overflow: 'auto' }}>
              <Routes />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import menuStore from './menuStore';
const stores = {
  // Key can be whatever you want
  routing: menuStore,
  // ...other stores
};

// const history = syncHistoryWithStore(browserHistory, routingStore);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={createBrowserHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

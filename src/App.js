import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import MenuTest from './test-cases/mobx-react-router/MenuTest';
import Router from './Router';

export default class App extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <MenuTest />
        </div>
        <div>
          <Router />
        </div>
      </div>
    );
  }
}
 
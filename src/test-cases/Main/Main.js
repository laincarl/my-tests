import React, { Component } from 'react';
import './Main.css';
import Pic from './test.gif';

class Main extends Component {
  render() {
    return (
      <div>
        <img src={Pic} alt="" />
      </div>
    );
  }
}

export default Main;

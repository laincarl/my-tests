import { Menu, Icon, Button } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const SubMenu = Menu.SubMenu;

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }
  clear() {
    this.setState({
      value: '',
    });
  }
  render() {
    return <div>{this.state.value}</div>;
  }
}

export default class Tip extends React.Component {
  dochild() {    
    console.log(ReactDOM.findDOMNode(this.refs.c).clientHeight);
  }
  render() {
    return (
      <div style={{ width: 240 }}>
        <button onClick={this.dochild.bind(this)}>clear</button>
        <Child ref="c" value="ccc"/>
        <Child ref="b" value="bbb"/>
      </div>
    );
  }
}

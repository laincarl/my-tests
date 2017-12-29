import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import {withRouter} from 'react-router'
const SubMenu = Menu.SubMenu;
// import menuStore from '../menuStore';
@inject('routing')
// @observer
class MenuTest extends Component {
  render() {
    const { routing, history } = this.props;
    // console.log(location);
    const currentMenu = routing.currentMenu();
    console.log(routing.currentMenu());
    return (
      <Menu
        mode="inline"
        style={{ width: 256 }}
        selectedKeys={[currentMenu]}
        onClick={({ item, key }) => {
          console.log(key);
          history.push(key);
        }}>
        <Menu.Item key="/">首页</Menu.Item>
        <Menu.Item key="/test">test</Menu.Item>
        <Menu.Item key="/tablenest">tablenest</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </Menu>
    );
  }
}
export default withRouter(MenuTest);
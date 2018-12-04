import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
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
        style={{ height: '100%'}}
        selectedKeys={[currentMenu]}
        onClick={({ item, key }) => {
          // console.log(key);
          if (routing.currentMenu() !== key) {
            history.push(key);
          }
        }}>
        <Menu.Item key="/">首页</Menu.Item>
        {%menus%}
        {/* <Menu.Item key="/tablenest">tablenest</Menu.Item>
        <Menu.Item key="/cssmodule">cssmodule</Menu.Item>
        <Menu.Item key="/cssmodule2">cssmodule2</Menu.Item>
        <Menu.Item key="/cssmodule3">cssmodule3</Menu.Item>
        <Menu.Item key="/pagination">pagination</Menu.Item>
        <Menu.Item key="/animation">animation</Menu.Item> */}
      </Menu>
    );
  }
}
export default withRouter(MenuTest);

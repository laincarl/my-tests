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
        style={{ width: 256 }}
        selectedKeys={[currentMenu]}
        onClick={({ item, key }) => {
          // console.log(key);
          if (routing.currentMenu() !== key) {
            history.push(key);
          }
        }}>
        <Menu.Item key="/">首页</Menu.Item>
        <Menu.Item key="/CssModule">CssModule</Menu.Item>
<Menu.Item key="/CssModule2">CssModule2</Menu.Item>
<Menu.Item key="/CssModule3">CssModule3</Menu.Item>
<Menu.Item key="/Main">Main</Menu.Item>
<Menu.Item key="/Modal">Modal</Menu.Item>
<Menu.Item key="/Animation">Animation</Menu.Item>
<Menu.Item key="/Name">Name</Menu.Item>
<Menu.Item key="/MyPagination">MyPagination</Menu.Item>
<Menu.Item key="/TableNest">TableNest</Menu.Item>
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

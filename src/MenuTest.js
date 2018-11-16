import React, { Component } from 'react';
import { Menu } from 'antd';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

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
        onClick={({ key }) => {
          if (routing.currentMenu() !== key) {
            history.push(key);
          }
        }}
      >
        <Menu.Item key="/">首页</Menu.Item>
        <Menu.Item key="/Anchor">Anchor</Menu.Item>
        <Menu.Item key="/Animation">Animation</Menu.Item>
        <Menu.Item key="/CalendarTimeline">CalendarTimeline</Menu.Item>
        <Menu.Item key="/CssModule">CssModule</Menu.Item>
        <Menu.Item key="/CssModule2">CssModule2</Menu.Item>
        <Menu.Item key="/CssModule3">CssModule3</Menu.Item>
        <Menu.Item key="/DomToImage">DomToImage</Menu.Item>
        <Menu.Item key="/Drag">Drag</Menu.Item>
        <Menu.Item key="/Main">Main</Menu.Item>
        <Menu.Item key="/Dragreact">Dragreact</Menu.Item>
        <Menu.Item key="/Modal">Modal</Menu.Item>
        <Menu.Item key="/MyPagination">MyPagination</Menu.Item>
        <Menu.Item key="/ReactDrag">ReactDrag</Menu.Item>
        <Menu.Item key="/TableNest">TableNest</Menu.Item>
        <Menu.Item key="/TableDrag">TableDrag</Menu.Item>
        <Menu.Item key="/TableCol">TableCol</Menu.Item>
        <Menu.Item key="/TreeRender">TreeRender</Menu.Item>
        <Menu.Item key="/TreeShape">TreeShape</Menu.Item>
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

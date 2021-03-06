import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';

const { SubMenu } = Menu;
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
        style={{ height: '100%' }}
        selectedKeys={[currentMenu]}
        onClick={({ item, key }) => {
          // console.log(key);
          if (routing.currentMenu() !== key) {
            history.push(key);
          }
        }}
      >
        <Menu.Item key="/">首页</Menu.Item>
        <Menu.Item key="/Ace">Ace</Menu.Item>
        <Menu.Item key="/Anchor">Anchor</Menu.Item>
        <Menu.Item key="/HooksWithProvider">HooksWithProvider</Menu.Item>
        <Menu.Item key="/CssAnchor">CssAnchor</Menu.Item>
        <Menu.Item key="/ComponentVSfunction">ComponentVSfunction</Menu.Item>
        <Menu.Item key="/Main">Main</Menu.Item>
        <Menu.Item key="/Material">Material</Menu.Item>
        <Menu.Item key="/PdfViewer">PdfViewer</Menu.Item>
        <Menu.Item key="/Dragreact">Dragreact</Menu.Item>
        <Menu.Item key="/Quill">Quill</Menu.Item>
        <Menu.Item key="/Resize">Resize</Menu.Item>
        <Menu.Item key="/ResizeDivider">ResizeDivider</Menu.Item>
        <Menu.Item key="/ResizeAble">ResizeAble</Menu.Item>
        <Menu.Item key="/Rxjs">Rxjs</Menu.Item>
        <Menu.Item key="/Svg">Svg</Menu.Item>
        <Menu.Item key="/Modal">Modal</Menu.Item>
        <Menu.Item key="/Tabs">Tabs</Menu.Item>
        <Menu.Item key="/Virtualized">Virtualized</Menu.Item>
        <Menu.Item key="/Tooltip">Tooltip</Menu.Item>
        <Menu.Item key="/List">List</Menu.Item>
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

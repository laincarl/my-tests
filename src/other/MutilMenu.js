import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MutilMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menudata: this.props.menudata[0],
      indexs: [],
    };
  }
  handleClick = (menus, index) => {
    console.log(menus, index);
    this.setState(
      {
        menudata: menus,
        indexs: [...this.state.indexs, index],
      },
      () => {
        console.log('next:', this.state.indexs);
      },
    );
  };
  preLevel() {
    if (this.state.indexs.length > 0) {
      this.setState(
        {
          menudata: this.getindexdata(1),
          indexs: this.state.indexs.slice(0, -1),
        },
        () => {
          console.log('preLevel:', this.state.indexs);
        },
      );
    }
  }
  nextLevel(item) {
    let index = this.getIndex(item.key);
    console.log(index);
    if (
      this.state.menudata.menus[index] &&
      this.state.menudata.menus[index].menus
    ) {
      this.setState({
        menudata: this.state.menudata.menus[index],
        indexs: [...this.state.indexs, index],
      });
    }
  }
  getIndex(key) {
    for (let i = 0; i < this.state.menudata.menus.length; i += 1) {
      if (this.state.menudata.menus[i].code === key) {
        return i;
      }
    }
    return 0;
  }
  getindexdata(index) {
    let indexs = [...this.state.indexs];
    let data = this.props.menudata[0];
    while (indexs.length > index) {
      data = data.menus[indexs.shift()];
    }
    return data;
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.preLevel.bind(this)}>
          <Icon type="left" />上一级
        </Button>
        <Menu
          style={{ width: 240 }}
          onClick={this.nextLevel.bind(this)}
          mode="inline"
        >
          <MenuItemGroup
            key={this.state.menudata.code}
            title={this.state.menudata.code}
          >
            {this.state.menudata.menus.map(data => (
              <Menu.Item key={data.code}>{data.code}</Menu.Item>
            ))}
          </MenuItemGroup>
        </Menu>
      </div>
    );
  }
}
export default MutilMenu;
{
  /* <Menu>
  <Menu.Item>菜单项</Menu.Item>
  <SubMenu title="子菜单">
    <Menu.Item>子菜单项</Menu.Item>
  </SubMenu>
</Menu>; */
}

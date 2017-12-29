import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const menudata = [
  {
    code: 'default',
    id: 1,
    name: '核心产品',
    menus: [
      {
        code: 'hap-user-service',
        id: 1,
        menus: [
          {
            code: 'hap-user-service.client',
            id: 1,
            name: '客户端管理',
            menus: [
              {
                code: 'a',
                id: 1,
                name: '客户端管理',
              },
              {
                code: 'b',
                id: 1,
                name: '数据管理',
              },
            ],
          },
          {
            code: 'hap-user-service.excel',
            id: 1,
            name: '数据管理',
          },
        ],
      },
    ],
  },
];
class MyMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      index: this.props.index,
    };
  }
  handleClick() {
    if (this.state.data.menus) {
      this.props.handleClick(this.state.data, this.state.index);
    }
  }
  render() {
    return (
      <div
        onClick={this.handleClick.bind(this)}
        className="ant-select-dropdown-menu-item"
      >
        {this.props.data.code}
      </div>
    );
  }
}
class MutilMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menudata: menudata[0],
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
  pre() {
    if (this.state.indexs.length > 0) {
      this.setState(
        {
          menudata: this.getindexdata(1),
          indexs: this.state.indexs.slice(0, -1),
        },
        () => {
          console.log('pre:', this.state.indexs);
        },
      );
    }
  }
  getindexdata(index) {
    let indexs = [...this.state.indexs];
    let data = menudata[0];
    while (indexs.length > index) {
      data = data.menus[indexs.shift()];
    }
    console.log(data);
    return data;
  }
  render() {
    return (
      <div>
        <div>
          <Button type="primary">
            <Icon type="left" />上一级
          </Button>
        </div>
        <span onClick={this.pre.bind(this)}>{this.state.menudata.code}</span>
        {this.state.menudata.menus.map((data, i) => (
          <MyMenu
            key={data.code}
            index={i}
            data={data}
            handleClick={this.handleClick.bind(this)}
          />
        ))}
      </div>
    );
  }
}
export default MutilMenu;
<Menu>
  <Menu.Item>菜单项</Menu.Item>
  <SubMenu title="子菜单">
    <Menu.Item>子菜单项</Menu.Item>
  </SubMenu>
</Menu>
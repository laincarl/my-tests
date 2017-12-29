import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const menudata = [
  {
    code: 'default',
    id: 1,
    name: '核心产品',
    services: [
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
class TreeMenu extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };
  fillmenu(item) {
    console.log(item);
    if (item.menus) {
      return (
        <SubMenu key={item.code} title={item.name}>
          {item.menus.map(one => this.fillmenu(one))}
        </SubMenu>
      );
    } else {
      return <Menu.Item key={item.code}>{item.name}</Menu.Item>;
    }
  }
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 240 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        {menudata.map(one => {
          let serviceMenus = one.services || [];
          console.log(one);
          return serviceMenus.map(reitem => {
            console.log(reitem);
            return (
              <SubMenu key="sub2" title={reitem.code}>
                {reitem.menus.map(item => {
                  return this.fillmenu(item);
                })}
              </SubMenu>
            );
          });
        })}
      </Menu>
    );
  }
}
export default TreeMenu;

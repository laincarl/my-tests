import React, { Component } from 'react';
import { Tabs, Card, Col, Row, Icon, Table, Menu } from 'antd';
import pic1 from './webpack.png';
import pic2 from './react.png';
import pic3 from './gulp.png';

const TabPane = Tabs.TabPane;
const data = [
  {
    title: '项目信息',
    icon: 'apple',
    list: [
      {
        content: '内容1',
        link: 'http://www.baidu.com'
      },
      {
        content: '内容2',
        link: ''
      },
      {
        content: '内容3',
        link: ''
      }
    ]
  },
  {
    title: '其他',
    icon: 'appstore',
    list: [
      {
        content: '项目名称:Origamiboat',
        link: ''
      },
      {
        content: '内容2',
        link: ''
      },
      {
        content: '内容3',
        link: ''
      }
    ]
  }
];
const menulist = [
  {
    title: '特性',
    link: ''
  },
  {
    title: '支持环境',
    link: ''
  },
  {
    title: '版本',
    link: ''
  },
  {
    title: '安装',
    link: ''
  },
  {
    title: '实例',
    link: ''
  },
  {
    title: '链接',
    link: ''
  },
  {
    title: '谁在使用',
    link: ''
  }
];
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { cardData, menuList } = this.props;
    return (
      <div>
        <Tabs defaultActiveKey="1">
          <TabPane tab="信息中心" key="1">
            <Row gutter={16}>
              {cardData.map(one => (
                <Col span={6}>
                  <Card
                    title={
                      <div>
                        <Icon type={one.icon} />
                        &nbsp;{one.title}
                      </div>
                    }
                    /* extra={<Icon type="apple" />} */
                  >
                    {one.list.map(item => {
                      return (
                        <li
                          style={{ listStyle: 'none', margin: '5px' }}
                          className="ant-select-dropdown-menu-item"
                        >
                          <a
                            href={item.link}
                            target="_blank"
                            style={{ color: '#555', display: 'block' }}
                          >
                            {item.content}
                          </a>
                        </li>
                      );
                    })}
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tab="技术栈" key="2">
            <Row gutter={16} type="flex" align="middle">
              <Col span={3} style={{ height: '200px' }}>
                <img
                  src={pic1}
                  alt=""
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Col>
              <span style={{ fontSize: '50px' }}>+</span>
              <Col span={3} style={{ height: '200px', lineHeight: '200px' }}>
                <img
                  src={pic2}
                  alt=""
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Col>
              <span style={{ fontSize: '50px' }}>+</span>

              <Col span={3} style={{ height: '200px' }}>
                <img
                  src={pic3}
                  alt=""
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </Col>
            </Row>
            <Col span={4} style={{margin:"20px"}}>
              {menuList.map(one => {
                return (
                  <li
                    style={{ listStyle: 'none', margin: '5px' }}
                    className="ant-select-dropdown-menu-item"
                  >
                    <a
                      href={one.link}
                      target="_blank"
                      style={{ color: '#555', display: 'block' ,fontSize:"16px"}}
                    >
                      {one.title}
                    </a>
                  </li>
                );
              })}
            </Col>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default Home;


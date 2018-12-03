import React, { Component } from 'react';
import Tabs from './Tabs';
import './Tabs.less';

function callback(key) {
  console.log(key);
}

const { TabPane } = Tabs;
function Test() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="2" onChange={callback}>
        <TabPane tab="Tab 1" key="a">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Test;

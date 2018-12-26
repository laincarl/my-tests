import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin, Table, Button } from 'antd';
// import { PageTable as Table } from 'antd-table-infinity';
import './TableInfinity.css';
import Tag from './Tag';
// import 'antd-table-infinity/index.css';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render(name, record) {
    return <Tag data={record} dataIndex="name" />;
  },
}, {
  title: 'Age',
  dataIndex: 'age',
  render(name, record) {
    return <Tag data={record} dataIndex="age" />;
  },
}, {
  title: 'Address',
  dataIndex: 'address',
  render(name, record) {
    return <Tag data={record} dataIndex="address" />;
  },
}];
  
const data = [];
for (let i = 0; i < 2000; i += 1) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
class TableInfinity extends Component {
    state = {
      page: 1,
      loading: false,
      mode: 1,
    };

    handleSwitch=() => {
      const { mode } = this.state;
      this.setState({
        mode: mode === 1 ? 0 : 1,
      });
    }

    render() {
      const { page, loading, mode } = this.state;

      return ([
        <Button onClick={this.handleSwitch}>switch</Button>,
        <Table
          className="custom-classname"
          pagination={{
            // position: 'both',
            // defaultCurrent: 21,
            pageSize: 200,
            // className: 'custom-classname-pagination',
          }}
          loading={loading}          
        //   pageSize={100}
        //   bidirectionalCachePages={1}
        //   total={5000}
          dataSource={data}
          columns={mode === 1 ? columns : columns.slice(2)}
        //   scroll={{ x: 2500, y: 650 }}
          bordered
          debug
        />]
      );
    }
}

TableInfinity.propTypes = {

};

export default TableInfinity;

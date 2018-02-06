import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import { Pagination, Spin,Select } from 'antd';
const Option = Select.Option;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class MyPagination extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      current: 1,
    };
  }
  componentDidMount() {
    this.loadData(1);
  }

  loadData = page => {
    console.log(omit({a:'a',b:{c:'c'},c:function(){}},[]));
    console.log(page);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, current: page });
    }, 500);
  };
  render() {
    console.log('render');
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <div>当前页码{this.state.current}</div>
          <Pagination
            onChange={page => {
              console.log(page);
              this.loadData(page);
            }}
            current={this.state.current}
            pageSize={1}
            total={30000}
          />
          <Select
          onPopupScroll={()=>{console.log('sss')}}   
          defaultValue="a1"
          // onChange={handleChange}
          style={{ width: 200 }}
        >
          {children}
        </Select>
        </Spin>
      </div>
    );
  }
}

MyPagination.propTypes = {};

export default MyPagination;

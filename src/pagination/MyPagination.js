import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination, Spin } from 'antd';
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
        </Spin>
      </div>
    );
  }
}

MyPagination.propTypes = {};

export default MyPagination;

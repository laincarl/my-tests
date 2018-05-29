import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import axios from 'axios';
import './TreeShape.css'
import Node from './Node';
import tree from './store/tree';
@observer
class TreeShape extends Component {
  initData = () => {
    tree.init();
  }
  modifyDate = () => {
    tree.modifyData();
  }
  loadData = () => {
    axios.get('/api/tags/ssss').then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const data = tree.data;
    return (
      <div>
        <button onClick={this.initData}>初始化数据</button>
        <button onClick={this.modifyDate}>修改数据</button>
        <button onClick={this.loadData}>加载数据</button>
        <br />
        x:<input type="number" style={{ width: '50px' }} /><br />
        y:<input type="number" style={{ width: '50px' }} /><br />
        TreeShape
        <div style={{ display: 'flex' }}>
          {
            data.map((one, i) => <Node key={one.id} x={1} y={i} data={one} />)
          }
        </div>
      </div>
    )
  }
}

TreeShape.propTypes = {

};

export default TreeShape;
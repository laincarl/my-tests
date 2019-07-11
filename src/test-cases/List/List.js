import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import axios from 'axios';
import './List.css';
import Item from './Item';
import ListStore from './ListStore';
import Hoc from './Hoc';

@observer
class List extends Component {
  handleRefresh = () => {
    ListStore.ppp();
    ListStore.setList([{
      id: 1,
      title: 'a',
    }, {
      id: 2,
      title: 'b',
    }, {
      id: 3,
      title: 'c',
    }, {
      id: 4,
      title: 'f',
    }]);
  }

  fetchError=() => {
    fetch('http://localhost/');
  }

  ajaxError=() => {
    axios.get('http://localhost/');
  }

  renderError=() => {
    ListStore.setList(null);
  }

  resourceError=() => {
    const script = document.createElement('script');
    script.src = 'scriptLink.js';
    document.body.append(script);
  }

  render() {
    // const { list } = this.state;
    const list = ListStore.getList;
    return (
      <div>
        <Button onClick={this.handleRefresh}>refresh</Button>
        <Button onClick={this.fetchError}>fetchError</Button>
        <Button onClick={this.ajaxError}>ajaxError</Button>
        <Button onClick={this.renderError}>renderError</Button>
        <Button onClick={this.resourceError}>resourceError</Button>
        <Hoc data={list}>
          {data => <div>{data.map(item => <Item key={item.id} data={item} />)}</div>}
        </Hoc>
      </div>
    );
  }
}

List.propTypes = {

};

export default List;

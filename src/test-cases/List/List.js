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
  getSnapshotBeforeUpdate() {
    this.scrollTop = this.con.scrollTop;
    this.scrollHeight = this.con.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState) {
    this.con.scrollTop = this.scrollTop + (this.con.scrollHeight - this.scrollHeight);
  }

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

  fetchError = () => {
    fetch('http://localhost/');
  }

  ajaxError = () => {
    axios.get('http://localhost/');
    axios.get('http://localhost/2');
    axios.post('http://localhost/', {
      test: 'ss',
    });
  }

  renderError = () => {
    ListStore.setList(null);
  }

  resourceError = () => {
    const script = document.createElement('script');
    script.src = 'scriptLink.js';
    document.body.append(script);
  }

    addItem = () => {
      ListStore.addItem();
    }

    handleScroll=(e) => {
      console.log(e.target.scrollTop);
      if (e.target.scrollTop === 0) {
        this.addItem();
      }
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
          <Button onClick={this.addItem}>add</Button>
          {/* <Hoc data={list}> */}
          <div onScroll={this.handleScroll} style={{ height: 200, overflow: 'auto' }} ref={con => this.con = con}>{list.map(item => <Item key={item.id} data={item} />)}</div>
          {/* </Hoc> */}
        </div>
      );
    }
}

List.propTypes = {

};

export default List;

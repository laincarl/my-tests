import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import './List.css';
import Item from './Item';
import ListStore from './ListStore';
import Hoc from './Hoc';

@observer
class List extends Component {
  state = {
    list: [{
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
      title: 'd',
    }],
  }

  handleRefresh = () => {
    // this.setState({
    //   list: [{
    //     id: 1,
    //     title: 'a',
    //   }, {
    //     id: 2,
    //     title: 'b',
    //   }, {
    //     id: 3,
    //     title: 'c',
    //   }, {
    //     id: 4,
    //     title: 'f',
    //   }],
    // });
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

  componentDidMount() {
    console.log('fup');
  }

  render() {
    // const { list } = this.state;
    const list = ListStore.getList;
    return (
      <div>
        <button onClick={this.handleRefresh}>refresh</button>
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

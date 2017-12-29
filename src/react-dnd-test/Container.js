import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';
import Trash from './Trash';
class Container extends Component {
  render() {
    return (
      <div>
        <List />
        <Trash />
      </div>
    );
  }
}

Container.propTypes = {};

export default DragDropContext(HTML5Backend)(Container);

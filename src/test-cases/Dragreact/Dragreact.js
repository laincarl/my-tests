import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragItem from './DragItem';

class Dragreact extends Component {
  render() {
    const items = ['1', '2', '3', '4'];
    return (
      <div>
        {'Dragreact'}
        {items.map(item => <DragItem text={item} />)}
      </div>
    );
  }
}

Dragreact.propTypes = {

};

export default Dragreact;

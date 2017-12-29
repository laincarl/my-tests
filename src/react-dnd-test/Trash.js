import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props) {
    // moveKnight(props.x, props.y);
    console.log('SSS');
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class Trash extends Component {
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div style={{ width: '500px', height: '500px', background: 'blue' }}>
        Trash
      </div>
    );
  }
}

Trash.propTypes = {};

export default DropTarget(ItemTypes.STORY, squareTarget, collect)(Trash);

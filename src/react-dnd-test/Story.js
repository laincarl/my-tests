import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource, DropTarget } from 'react-dnd';

//拖动开始
const storySource = {
  beginDrag(props) {
    console.log('start', props.data);
    return props.data;
  },
  endDrag(props, monitor) {
    console.log('从drag获取drop数据:', monitor.getDropResult());
  },
};
//拖动drop
const storyTarget = {
  drop(props, monitor) {
    // moveKnight(props.x, props.y);
    console.log('drop', props.data);
    console.log('从drop中获取drag数据：', monitor.getItem());
    return props.data;
  },
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}
function dropcollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}
class Story extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      connectDragSource,
      isDragging,
      connectDropTarget,
      isOver,
    } = this.props;
    const data = this.props.data;
    return connectDropTarget(
      connectDragSource(
        <div style={{ width: '100px', height: '100px', background: 'red' }}>
          <span>{data.description}</span>
        </div>,
      ),
    );
  }
}

Story.propTypes = {};

export default DropTarget(ItemTypes.STORY, storyTarget, dropcollect)(
  DragSource(ItemTypes.STORY, storySource, collect)(Story),
);

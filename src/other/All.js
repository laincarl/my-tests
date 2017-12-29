import { Menu, Icon, Button, Slider } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StoryCard from './StoryCard';

export default class All extends Component {
  render() {
    return (
      <div>
        <div
          style={{ width: '200px', height: '200px', backgroundColor: 'red' }}
        />
        <Slider
          defaultValue={10}
          min={2}
          max={50}
          onChange={this.scale}
          tipFormatter={scale => scale / 10}
        />
        <StoryCard />
      </div>
    );
  }
}

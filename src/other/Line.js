import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const styles = {
  line: {
    display: 'flex',
    borderBottom: '2px dashed #bebdbd',
  },
};
export default class Line extends Component {
  constructor(props) {
    super(props);
    console.log();
  }
  render() {
    let amount = this.props.amount;
    let cards = [];
    while (amount > 0) {
      cards.push(
        <Draggable key={Math.random()} draggableId={Math.random()} type="MMA">
          {(provided, snapshot) => (
            <div>
              <div
                ref={provided.innerRef}
                style={provided.draggableStyle}
                {...provided.dragHandleProps}
              >
                <Card
                  style={this.props.cardStyle}
                  isChoosing={this.props.isChoosing}
                  add={this.props.add}
                />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>,
      );
      amount--;
    }
    return (
      <Droppable droppableId={Math.random()} type="MMA" direction="horizontal">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={styles.line}>
            {cards}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

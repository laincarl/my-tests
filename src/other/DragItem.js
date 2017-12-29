import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React from 'react';
const data = [
  {
    id: 1,
    name: 's',
  },
  {
    id: 2,
    name: 'f',
  },
  {
    id: 3,
    name: 'k',
  },
];
export default class DragItem extends React.Component {
  onDragStart = () => {
    /*...*/
  };
  onDragEnd = () => {
    /*...*/
  };

  render() {
    return (
      <div>
        <div style={{ width: '200px', height: '200px' }} />
        <div style={{ display: 'flex' }}>
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
          >
            <Droppable
              droppableId="droppable-1"
              type="PERSON"
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
                  }}
                >
                  <Draggable draggableId="draggable-1" type="PERSON">
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          style={provided.draggableStyle}
                          {...provided.dragHandleProps}
                        >
                          <div
                            style={{
                              width: '200px',
                              height: '200px',
                              border: '2px solid red',
                            }}
                          >
                            My draggable
                          </div>
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                  <Draggable draggableId="draggable-2" type="PERSON">
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          style={provided.draggableStyle}
                          {...provided.dragHandleProps}
                        >
                          <div
                            style={{
                              width: '200px',
                              height: '200px',
                              border: '2px solid red',
                            }}
                          >
                            My draggable
                          </div>
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>;
          </DragDropContext>
        </div>
      </div>
    );
  }
}

import { Menu, Icon, Button, Slider } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Item from './Item';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const styles = {
  cardstyle: {
    width: '150px',
    height: '100px',
    overflow: 'hidden',
    padding: '10px',
    border: '1px solid #000',
    margin: '10px',
  },
  content: {
    paddingBottom: '10px',
    wordBreak: 'break-all',
    wordWrap: 'break-word',
  },
  container: {
    display: 'flex',
    // alignItems: 'flex-start',
    transformOrigin: 'left top',
    // transform: 'scale(0.3)',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px dashed gray',
  },
  line: {
    display: 'flex',
  },
};
const config = [
  {
    epic: 1,
    feature: 2,
    story: 2,
  },
  {
    epic: 1,
    feature: 3,
    story: 3,
  },
];
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export default class StoryCard extends Component {
  constructor() {
    super();
    this.state = {
      items: config,
      isChoosing: false,
      scale: 1,
    };
    this.enterChoose = this.enterChoose.bind(this);
    this.scale = this.scale.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.rightheight = this.rightheight.bind(this);
  }
  enterChoose() {
    this.setState({
      isChoosing: !this.state.isChoosing,
    });
  }
  scale(num) {
    this.setState({
      scale: num / 10,
    });
  }
  onDragStart = start => {
    // console.log(start);
    this.top = this.draging
      ? ReactDOM.findDOMNode(this.draging).getBoundingClientRect().top
      : null;
    this.left = this.draging
      ? ReactDOM.findDOMNode(this.draging).getBoundingClientRect().left
      : null;
    this.width = this.draging
      ? ReactDOM.findDOMNode(this.draging).getBoundingClientRect().width
      : null;
    this.height = this.draging
      ? ReactDOM.findDOMNode(this.draging).getBoundingClientRect().height
      : null;

    /*...*/
  };
  onDragEnd = result => {
    /*...*/
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      items,
    });
  };
  rightheight() {
    const width = this.width;
    const height = this.height;
    console.log();
    this.rightplaceholder =
      width && height ? (
        <div style={{ width: width, height: height, overflow: 'hidden' }}>
          {this.placeholder}
        </div>
      ) : (
        this.placeholder
      );
  }
  render() {
    return (
      <div style={{}}>
        <Slider
          defaultValue={10}
          min={2}
          max={50}
          onChange={this.scale}
          tipFormatter={scale => scale / 10}
        />

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
                  ...styles.container,
                  ...{ zoom: this.state.scale},
                }}
              >
                <Button onClick={this.enterChoose}>选定</Button>
                {this.state.items.map(item => (
                  <Draggable
                    key={item.feature}
                    draggableId={item.feature}
                    type="PERSON"
                  >
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          style={{
                            ...provided.draggableStyle,
                            ...{
                              top: this.top ? this.top : null,
                              left: this.left ? this.left : null,
                              width: this.width ? this.width : null,
                              height: this.height ? this.height : null,
                            },
                          }}
                          /* style={{transform: `translate(${100}px, ${100}px)`}} */
                          {...provided.dragHandleProps}
                        >
                          <Item
                            ref={instance =>
                              snapshot.isDragging
                                ? (this.draging = instance)
                                : null}
                            config={item}
                            isChoosing={this.state.isChoosing}
                          />
                        </div>

                        <div
                          style={{
                            width:
                              snapshot.isDragging && this.draging
                                ? ReactDOM.findDOMNode(
                                    this.draging,
                                  ).getBoundingClientRect().width
                                : null,
                            // transform: `scale(${this.state.scale})`,
                          }}
                        >
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

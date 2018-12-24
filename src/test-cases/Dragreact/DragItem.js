import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dragreact.css';

class DragItem extends Component {
  state = {
    over: false,
  }

  render() {
    const { text } = this.props;
    const { over } = this.state;
    return (
      <div
        ref={(instance) => { this.instance = instance; }}
        className="item"
        style={{
          background: over && 'green',
        }}
        draggable        
        onDragStart={() => {
          console.log('start');
        }}
        onDrop={() => {
          console.log('drop');
        }}
        onDragEnter={() => {
          console.log('enter');
          // this.instance.style.background = 'green';
          this.setState({
            over: true,
          });
        }}
        onDragLeave={() => {
          console.log('leave');
          this.setState({
            over: false,
          });
          // this.instance.style.background = 'red';
        }}
      >
        {text}
      </div>
    );
  }
}

DragItem.propTypes = {

};

export default DragItem;

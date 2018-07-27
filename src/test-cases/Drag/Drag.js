import React, { Component } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import './Drag.css'

// const styles={
//   container:{
//     height:500,
//     overflow:'auto',
//     border:'1px solid black'
//   }
// }
// // fake data generator
// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`,
//   }));

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: 'none',
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? 'lightgreen' : 'grey',

//   // styles we need to apply on draggables
//   ...draggableStyle,
// });

// const getListStyle = isDraggingOver => ({
//   background: isDraggingOver ? 'lightblue' : 'lightgrey',
//   padding: grid,
//   width: 250,
// });

// class Drag extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: getItems(10),
//     };
//     this.onDragEnd = this.onDragEnd.bind(this);
//   }

//   onDragEnd(result) {
//     // dropped outside the list
//     if (!result.destination) {
//       return;
//     }

//     const items = reorder(
//       this.state.items,
//       result.source.index,
//       result.destination.index
//     );

//     this.setState({
//       items,
//     });
//   }

//   // Normally you would want to split things out into separate components.
//   // But in this example everything is just done in one place for simplicity
//   render() {
//     return (
//       <div style={styles.container}>
//         <DragDropContext onDragEnd={this.onDragEnd}>
//           <Droppable droppableId="droppable">
//             {(provided, snapshot) => (
//               <div
//                 ref={provided.innerRef}
//                 style={getListStyle(snapshot.isDraggingOver)}
//               >
//                 {this.state.items.map((item, index) => (
//                   <Draggable key={item.id} draggableId={item.id} index={index}>
//                     {(provided, snapshot) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         style={getItemStyle(
//                           snapshot.isDragging,
//                           provided.draggableProps.style
//                         )}
//                       >
//                         {item.content}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </div>
//     );
//   }
// }

// export default Drag;
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,

  // styles we need to apply on draggables
  // ...draggableStyle
  display:'table'
});

const getListStyle = isDraggingOver => ({
  backgroundColor: isDraggingOver ? "lightblue" : "#b0bec5",
  padding: grid
});

const getTdStyle = isDragging => ({
  // width: "200px",
  display:'table-cell',
  backgroundColor: isDragging ? "lightgreen" : "grey"
});

class Drag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  getRow(provided, snapshot) {
    return [
      <tr
        ref={provided.innerRef}
        style={getItemStyle(provided.draggableStyle, snapshot.isDragging)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <td style={getTdStyle(snapshot.isDragging)}>1</td>
        <td style={getTdStyle(snapshot.isDragging)}>2</td>
        <td style={getTdStyle(snapshot.isDragging)}>3</td>
      </tr>,
      provided.placeholder ? (
        <tr>
          <td
            colspan="3"
            style={{ padding: 0, transform: "translate(0px, 20px)" }}
          >
            {provided.placeholder}
          </td>
        </tr>
      ) : null
    ];
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <table
        class="table table-hover"
        style={{ tableLayout: "fixed", width: "600px" }}
      >
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <tbody
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {this.getRow}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
    );
  }
}
export default Drag;
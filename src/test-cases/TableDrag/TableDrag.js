import React, { Component } from 'react';
import './TableDrag.less'
import { Table, Button } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
  const result =[...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];


class TableWrapper extends React.Component {
  render() {
    const { children } = this.props;

    return (<Droppable droppableId="dropTable">
      {(provided, snapshot) => (
        <tbody
          {...this.props}
          ref={provided.innerRef}
        // style={{                                      
        //   borderBottom: '1px solid rgba(0,0,0,0.12)',
        //   marginBottom: 0,
        // }}
        >
          {/* {provided.placeholder} */}
          {children}
          {/* {provided.placeholder ?
            <tr>
              <td
                colspan="3"
                style={{ padding: 0, transform: "translate(0px, 20px)" }}
              >
                {provided.placeholder}
              </td>
            </tr> : null
          } */}
        </tbody>

      )}
    </Droppable>);
  }
}
class TableRow extends React.Component {
  render() {
    const { children, record, index } = this.props;
    window.console.log(this.props, record.key, index)
    // const { record, index } = props;
    const props = { ...this.props };
    delete props.className;
    delete props.index;
    return <Draggable key={record.key} draggableId={record.key} index={index}>
      {(provided, snapshot) =>
        (
          <tr
            ref={provided.innerRef}
            // {...props}              
            {...provided.draggableProps}
            {...provided.dragHandleProps}

          >
            {children}
          </tr>
        )
      }
    </Draggable>

  }
}


class TableDrag extends React.Component {
  state = {
    data: [{
      key: 'a',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: 'b',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: 'c',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }],
  }
  sort = () => {
    const { data } = this.state;
    const Data=[...data.reverse()];
    this.setState({
      data:Data
    })
  }
  onDragEnd(result) {
    if (result.destination) {
      const fromIndex = result.source.index;
      const toIndex = result.destination.index;
      console.log(fromIndex, toIndex);
      if (fromIndex === toIndex) {
        return;
      }
      const data = reorder(
        this.state.data,
        fromIndex,
        toIndex,
      );
      debugger;
      this.setState({ data });

    }
  }
  renderThead = () => {
    // const { columns } = this.props;
    const ths = columns.map(column => (
      <th style={{ flex: column.flex || 1 }}>{column.title} </th>
    ));
    return (<tr>{ths}</tr>);
  }
  renderTbody(data) {
    // const { columns } = this.props;
    const rows = data.map((item, index) =>
      (<Draggable key={item.key} draggableId={item.key} index={index}>
        {(provided, snapshot) =>
          (
            <tr
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {columns.map((column) => {
                let renderedItem = null;
                const { dataIndex, key, flex, render } = column;
                if (render) {
                  renderedItem = render(data[index][dataIndex], data[index]);
                } else {
                  renderedItem = data[index][dataIndex];
                }
                return (<td style={{ flex: flex || 1 }} >
                  {renderedItem}
                </td>);
              })}
            </tr>
          )
        }
      </Draggable>),
    );
    return rows;
  }
  components = {
    //   table:()=><DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
    //   <table>
    //     <thead>
    //       {this.renderThead()}
    //     </thead>
    //     <Droppable droppableId="dropTable">
    //       {(provided, snapshot) => (
    //         <tbody
    //           ref={provided.innerRef}
    //           style={{                                      
    //             borderBottom: '1px solid rgba(0,0,0,0.12)',
    //             marginBottom: 0,
    //           }}
    //         >
    //           {this.renderTbody(this.state.data)}
    //           {provided.placeholder}
    //         </tbody>
    //       )}
    //     </Droppable>
    //   </table>
    // </DragDropContext>,
    body: {
      wrapper: (props) => <TableWrapper {...props} />,
      row: (props) => <TableRow {...props} />
    }

  }


  render() {
    return (
      <div>


        <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
          <Table
            columns={columns}
            dataSource={this.state.data}
            components={this.components}
            onRow={(record, index) => ({
              index,
              record,
              // moveRow: this.moveRow,
            })}
          />
        </DragDropContext>
        <Button onClick={this.sort} />
      </div>
    );
  }
}

export default TableDrag;
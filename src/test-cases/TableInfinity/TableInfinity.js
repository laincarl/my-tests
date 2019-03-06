import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin, Button, Checkbox } from 'antd';
import { Column, Table } from 'react-virtualized';
import _ from 'lodash';
// import 'react-virtualized/styles.css';
// only needs to be imported once
const CheckboxGroup = Checkbox.Group;
// Table data as an array of objects
const list = Array(100).fill(0).map(() => ({ name: 'Brian Vaughn', description: 'Software engineer' }));

class TableInfinity extends Component {
  state = {
    page: 1,
    loading: false,
    columns: [
      {
        label: 'Name',
        dataKey: 'name',
        width: 150,
        render: ({ cellData }) => (
          <div style={{ color: 'red' }}>
            {cellData}
          </div>
        ),
        show: true,
      }, {
        label: 'Description',
        dataKey: 'description',
        width: 250,
        show: true,
      }, {
        label: 'Action',
        dataKey: 'action',
        width: 200,
        render: () => <Button>click</Button>,
        show: true,
      },
    ],
  };
  
  handleChange = (checkedValues) => {
    const columns = [...this.state.columns];
    columns.forEach((column) => {
      if (checkedValues.includes(column.dataKey)) {
        column.show = true;
      } else {
        column.show = false;
      }
    });    
    this.setState({
      columns,
    });
  }


  render() {
    const {
      page, loading, columns, columnKeys,
    } = this.state;
    return (
<div>
      <CheckboxGroup options={columns.map(column => column.dataKey)} defaultValue={columns.map(column => column.dataKey)} onChange={this.handleChange} />
      <Table
        width={600}
        height={300}
        headerHeight={20}
        rowHeight={30}
        rowCount={list.length}
        rowGetter={({ index }) => list[index]}
      >
        {
          columns.map(column => (
            column.show && (
              <Column
                headerStyle={{ padding: 16 }}
                style={{ padding: 16 }}
                cellRenderer={column.render}
                label={column.label}
                dataKey={column.dataKey}
                width={column.width}
              />            
            )
          ))
        }
      </Table>
    </div>
    );
  }
}

TableInfinity.propTypes = {

};

export default TableInfinity;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Story from './Story';

const data = [
  {
    id: 1,
    description: 'story1',
  },
  {
    id: 2,
    description: 'story2',
  },
];

class List extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {data.map(one => <Story data={one} />)}
      </div>
    );
  }
}

List.propTypes = {};

export default List;

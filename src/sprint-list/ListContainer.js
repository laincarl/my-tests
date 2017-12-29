import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OneContainer from './OneContainer';
class ListContainer extends Component {
  render() {
    return (
      <div>
        <OneContainer />
      </div>
    );
  }
}

ListContainer.propTypes = {};

export default ListContainer;

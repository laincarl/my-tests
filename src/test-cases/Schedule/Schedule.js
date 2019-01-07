import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShowProjects from './ShowProjects';

import './Schedule.css';

class Schedule extends Component {
  render() {
    return (
      <div>
        <ShowProjects />
      </div>
    );
  }
}

Schedule.propTypes = {

};

export default Schedule;

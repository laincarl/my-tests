import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Project from './Project';

@observer
class ShowProjects extends Component {
  state={
    projects: [{
      id: 1,
      name: 'CE',
    }, {
      id: 2,
      name: 'MIN',
    }, {
      id: 3,
      name: 'ZHI',
    },
    ],
  }

  render() {
    const { projects } = this.state;
    return (
      <div style={{ height: '100%', overflow: 'auto' }}>
        {projects.map(project => <Project data={project} />)}
      </div>
    );
  }
}

ShowProjects.propTypes = {

};

export default ShowProjects;

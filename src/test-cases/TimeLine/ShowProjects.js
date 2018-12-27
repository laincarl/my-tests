import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import moment from 'moment';
import Project from './Project';
import TimeLineStore from './TimeLineStore';

@observer
class ShowProjects extends Component {
  state={
    projects: [{
      id: 1,
      name: 'CE',
      boards: [{
        title: 'C7N面板 Team (2)',
        issues: Array(20).fill(0).map((c, t) => [{
          id: `1_${t}_1`,
          proId: 1,
          fromDate: moment().startOf('month').add(5, 'days'),
          toDate: moment().startOf('month').add(6, 'days').endOf('day'),
          title: '自动化测试（前端）2',
        }, {
          id: `1_${t}_2`,
          proId: 1,
          fromDate: moment().startOf('month').add(9, 'days'),
          toDate: moment().startOf('month').add(13, 'days').endOf('day'),
          title: '自动化测试（前端）',
        }]), 
      }],
    }, {
      id: 2,
      name: 'MIN',
      boards: [{
        title: 'C7N面板 Team (2)',
        issues: Array(20).fill(0).map((c, t) => [{
          id: `2_${t}_1`,
          proId: 2,
          fromDate: moment().startOf('month').add(5, 'days'),
          toDate: moment().startOf('month').add(6, 'days').endOf('day'),
          title: '自动化测试（前端）2',
        }, {
          id: `2_${t}_2`,
          proId: 2,
          fromDate: moment().startOf('month').add(9, 'days'),
          toDate: moment().startOf('month').add(13, 'days').endOf('day'),
          title: '自动化测试（前端）',
        }]), 
      }],
    }, {
      id: 3,
      name: 'ZHI',
      boards: [{
        title: 'C7N面板 Team (2)',
        issues: Array(20).fill(0).map((c, t) => [{
          id: `3_${t}_1`,
          proId: 3,
          fromDate: moment().startOf('month').add(5, 'days'),
          toDate: moment().startOf('month').add(6, 'days').endOf('day'),
          title: '自动化测试（前端）2',
        }, {
          id: `3_${t}_2`,
          proId: 3,
          fromDate: moment().startOf('month').add(9, 'days'),
          toDate: moment().startOf('month').add(13, 'days').endOf('day'),
          title: '自动化测试（前端）',
        }]), 
      }],
    },
    ],
  }

  /**
   * 点击页面重设日期高亮
   */
  resetHeightDuring = () => {
    TimeLineStore.setHeightLightDuring({});
  }

  render() {
    const { projects } = this.state;
    return (
      <div style={{ height: '100%', overflowX: 'hidden', overflowY: 'auto' }} onClick={this.resetHeightDuring} role="none">
        {projects.map(project => <Project data={project} />)}
      </div>
    );
  }
}

ShowProjects.propTypes = {

};

export default ShowProjects;

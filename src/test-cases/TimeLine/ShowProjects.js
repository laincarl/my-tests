import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { observer } from 'mobx-react';
import moment from 'moment';
import Project from './Project';
import TimeLineStore from './TimeLineStore';
import './ShowProjects.scss';
import Stickyard from '../StickDOM/stickyard';

moment.locale('zh-cn');
function rnd(n, m) {
  const random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}
@observer
class ShowProjects extends Component {
  state = {
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
      marks: [{ key: 'plan_1', date: moment().startOf('month').add(rnd(2, 20), 'days'), title: ' 猪齿鱼1.0版本' }],
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
      marks: [{ key: 'plan_2', date: moment().startOf('month').add(rnd(2, 20), 'days'), title: ' 猪齿鱼2.0版本' }],
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
      marks: [{ key: 'plan_3', date: moment().startOf('month').add(rnd(2, 20), 'days'), title: ' 猪齿鱼3.0版本' }],
    },
    ],
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }


  /**
   * 点击页面重设日期高亮
   */
  resetHeightDuring = () => {
    TimeLineStore.setHeightLightDuring({});
  }

  render() {
    const { projects } = this.state;
    const StickData = TimeLineStore.getStickData;
    const { 
      singleWidth, proId, range, HeightLightDuring, marks,
    } = StickData;
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <Stickyard stickPosition="bottom">
          {({ registerContainer, registerSticky }) => (
            <div className="Projects" onClick={this.resetHeightDuring} role="none" ref={registerContainer}>
              {projects.map((project, i) => <Project data={project} registerSticky={registerSticky} sticky />)}
            </div>               
          )}
        </Stickyard>     
           
      </div>
    );
  }
}

ShowProjects.propTypes = {

};

export default ShowProjects;

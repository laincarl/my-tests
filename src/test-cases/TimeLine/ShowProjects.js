import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { observer } from 'mobx-react';
import moment from 'moment';
import Project from './Project';
import TimeLineStore from './TimeLineStore';
import './ShowProjects.scss';
import icon from './assets/test.png';
import Line from './Line';

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

  componentDidMount() {
    // console.log(this.TimeLines[0].setStick);
    this.setStickTop();
    // 设置初始固定
    setTimeout(() => {
      this.TimeLines[0].setStick();
      this.currentStickIndex = 0;
    }, 0);
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  setStickTop=() => {
    this.stickTop = this.stick.getBoundingClientRect().top;
  }

  handleSaveTimeLineRef=(i, ref) => {
    if (!this.TimeLines) {
      this.TimeLines = {};
    }
    this.TimeLines[i] = ref;
    // console.log(this.TimeLines);
  }

  handleScroll = () => {
    console.log('top', this.stickTop);
    const { currentStickIndex } = this;
    const tops = [];
    for (let i = 0; i < Object.keys(this.TimeLines).length; i += 1) {
      const node = findDOMNode(this.TimeLines[i]);
      
      const top = node.getBoundingClientRect().top;
      // console.log(top);
      tops.push(top);
    }
    let targetIndex = 0;
    if (tops[0] > this.stickTop) {
      targetIndex = 0;
    } else if (tops[tops.length - 1].top < this.stickTop) {
      targetIndex = tops.length - 1;     
    } else {
      for (let j = 0; j < tops.length; j += 1) {
        if (tops[j] < this.stickTop && tops[j + 1] >= this.stickTop) {
          targetIndex = j + 1;   
        }
      }
    }
    // console.log(targetIndex);
    if (currentStickIndex !== targetIndex) {
      this.currentStickIndex = targetIndex;
      this.TimeLines[targetIndex].setStick();
    }
    
    // console.log('scroll');
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
        <div className="Projects" onClick={this.resetHeightDuring} role="none" onScroll={this.handleScroll}>
          {projects.map((project, i) => <Project data={project} saveTimeLineRef={this.handleSaveTimeLineRef.bind(this, i)} />)}
        </div>
        {/* 下方固定区域 */}
        <div className="Project-stick" ref={this.saveRef('stick')}>   
          <div className="Project-stick-content-left">            
            <div className="Project-content-left-content">
              <img src={icon} className="Project-icon" alt="" />
              <div>{name}</div>
            </div>
          </div>
          
          <div className="Project-stick-content-right">
            <Line
              singleWidth={singleWidth}
              marks={marks}
              proId={proId}
              range={range}
              HeightLightDuring={HeightLightDuring}
            />
          </div>
        </div>
      </div>

    );
  }
}

ShowProjects.propTypes = {

};

export default ShowProjects;

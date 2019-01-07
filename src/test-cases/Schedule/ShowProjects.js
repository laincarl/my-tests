import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { observer } from 'mobx-react';
import moment from 'moment';
import Project from './Project';
import TimeLineStore from '../TimeLine/TimeLineStore';
import '../TimeLine/ShowProjects.scss';
import icon from './test.png';
import Line from '../TimeLine/Line';

import Stickyard from './Stickyard';

@observer
class ShowProjects extends Component {
  state = {
    scale: 2,
    displayMethod: 'project',
    sprintAndStage: true,
    projects: [{
      id: 1,
      name: 'CE',
      boards: [{
        title: 'C7N面板 Team (2)',
        sprintsAndIssues: [
          {
            sprintId: 1,
            sprintName: 'sprint1',
            fromDate: moment().startOf('month'),
            toDate: moment().startOf('month').add(6, 'days').endOf('day'),
            issues: [{
              id: 1,
              proId: 1,
              title: '自动化测试（前端）2',
              stageCode: 'code',
              stageName: '编码中',
              rowId: 1, 
              fromDate: moment().startOf('month'),
              toDate: moment().startOf('month').add(6, 'days').endOf('day'),
            }, {
              id: 2,
              proId: 1,
              title: '自动化测试（前端）',
              stageCode: 'study',
              stageName: '学习中',
              rowId: 1, 
              fromDate: moment().startOf('month').add(7, 'days'),
              toDate: moment().startOf('month').add(15, 'days').endOf('day'),
            }],
          },
          {
            sprintId: 2,
            sprintName: 'sprint2',
            fromDate: moment().startOf('month').add(7, 'days').endOf('day'),
            toDate: moment().startOf('month').add(20, 'days').endOf('day'),
            issues: [{
              id: 1,
              proId: 2,
              title: '自动化测试（前端）2',
              stageCode: 'study',
              stageName: '学习中',
              rowId: 1, 
              fromDate: moment().startOf('month').add(20, 'days'),
              toDate: moment().startOf('month').add(25, 'days').endOf('day'),
            }, {
              id: 2,
              proId: 2,
              title: '自动化测试（前端）',
              stageCode: 'test',
              stageName: '测试中',
              rowId: 2, 
              fromDate: moment().startOf('month'),
              toDate: moment().startOf('month').add(13, 'days').endOf('day'),
            }],
          },
        ],
      }],
    }, {
      id: 2,
      name: 'MIN',
      boards: [{ 
        title: 'C7N面板 Team (3)',
        sprintsAndIssues: [
          {
            sprintId: 1,
            sprintName: 'sprint1',
            fromDate: moment().startOf('month'),
            toDate: moment().startOf('month').add(13, 'days').endOf('day'),
            issues: [{
              id: 1,
              proId: 2,
              title: '自动化测试',
              stageCode: 'study',
              stageName: '学习中',
              rowId: 3, 
              fromDate: moment().startOf('month'),
              toDate: moment().startOf('month').add(2, 'days').endOf('day'),
            }, {
              id: 2,
              proId: 1,
              title: '自动化测试（前端）',
              stageCode: 'test',
              stageName: '测试中',
              rowId: 3, 
              fromDate: moment().startOf('month').add(6, 'days'),
              toDate: moment().startOf('month').add(13, 'days').endOf('day'),
            }],
          },
          {
            sprintId: 2,
            sprintName: 'sprint2',
            fromDate: moment().startOf('month').add(14, 'days').endOf('day'),
            toDate: moment().startOf('month').add(20, 'days').endOf('day'),
            issues: [{
              id: 1,
              proId: 2,
              title: '自动化测试（前端）2',
              stageCode: 'code',
              stageName: '编码中',
              rowId: 4, 
              fromDate: moment().startOf('month').add(6, 'days'),
              toDate: moment().startOf('month').add(13, 'days').endOf('day'),
            }, {
              id: 2,
              proId: 2,
              title: '自动化测试（前端）',
              stageCode: 'test',
              stageName: '测试中',
              rowId: 4, 
              fromDate: moment().startOf('month').add(20, 'days'),
              toDate: moment().startOf('month').add(27, 'days').endOf('day'),
            }],
          },
        ],
      }],
    },
    ],
  }

  componentDidMount() {
    // console.log(this.TimeLines[0].setStick);
    // this.setStickTop();
    // 设置初始固定
    setTimeout(() => {
      this.TimeLines[0].setStick();
      this.currentStickIndex = 0;
    }, 0);
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  // setStickTop=() => {
  //   this.stickTop = this.stick.getBoundingClientRect().top;
  // }

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
    const {
      projects, scale, displayMethod, sprintAndStage, 
    } = this.state;
    const StickData = TimeLineStore.getStickData;
    const { 
      singleWidth, proId, range, HeightLightDuring, marks,
    } = StickData;
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <Stickyard stickPosition="bottom">
          {({ registerContainer, registerSticky }) => (
            <div className="Projects" ref={registerContainer} style={{ maxHeight: 200 }} onClick={this.resetHeightDuring} role="none">
              {projects.map((project, i) => <Project data={project} scale={scale} sprintAndStage={sprintAndStage} registerSticky={registerSticky} displayMethod={displayMethod} saveTimeLineRef={this.handleSaveTimeLineRef.bind(this, i)} />)}
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

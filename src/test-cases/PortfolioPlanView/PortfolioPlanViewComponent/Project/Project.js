import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { findDOMNode } from 'react-dom';
import 'moment/locale/zh-cn';
import { extendMoment } from 'moment-range';
import { observer } from 'mobx-react';
import PortfolioPlanViewStore from '../../PortfolioPlanViewStore';
import './Project.scss';
import icon from '../../assets/test.png';
// import Board from './Board';
import ScheduleBoard from '../ScheduleBoard/ScheduleBoard';
import WorkLoadBoard from '../WorkLoadBoard/WorkLoadBoard';
import TargetScheduleBoard from '../TargetScheduleBoard/TargetScheduleBoard';

import TimeLine from '../TimeLine/TimeLine';

import Stickyard from '../../../StickDOM/stickyard';


const moment = extendMoment(Moment);
moment.locale('zh-cn');
function rnd(n, m) {
  const random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}

const Boards = {
  TargetScheduleBoard,
  WorkLoadBoard,
  ScheduleBoard,
};
@observer
class Project extends Component {
  constructor() {
    super();
    const start = moment().startOf('month');
    const end = moment().endOf('month');
    const range = moment.range(start, end);
    // 时间段数
    const days = range.diff('days') + 1;
    this.state = {
      range,
      days,
      singleWidth: 0,
    };
  }

  componentDidMount() {
    this.setSingleWidth();
  }

  setSingleWidth = () => {
    const { days, singleWidth } = this.state;
    const { width } = this.container.getBoundingClientRect();
    const newSingleWidth = Math.floor(width / days);
    const totalWidth = newSingleWidth * days;
    this.container.style.width = `${totalWidth}px`;
    // console.log(width, newSingleWidth);
    if (newSingleWidth !== singleWidth) {
      this.setState({
        singleWidth: newSingleWidth,
      });
    }
  }


  saveRef = name => (ref) => {
    if (name === 'line' && this.props.saveTimeLineRef) {
      this.props.saveTimeLineRef(ref);
    }
    this[name] = ref;
  }


  getHeightLightStyle = () => {
    const HeightLightDuring = PortfolioPlanViewStore.getHeightLightDuring;
    const {
      start, end, offsetTop, proId,
    } = HeightLightDuring;
    const { data } = this.props;
    const { id } = data;
    if (!start || !end || id !== proId) {
      return {};
    }
    const { range, singleWidth } = this.state;
    const marginLeft = moment(start).diff(moment(range.start), 'days') * singleWidth;
    const width = (moment(end).diff(moment(start), 'days') + 1) * singleWidth;
    const top = offsetTop;
    return {
      position: 'absolute',
      // height: 'calc(100% - 5px)',
      pointerEvents: 'none',
      borderLeft: '1px dashed red',
      borderRight: '1px dashed red', // rgb(76, 154, 255)
      marginLeft,
      width,
      top,
      bottom: 0,
    };
  }

  getHeightLightTodayStyle = () => {
    const { range, singleWidth } = this.state;
    const marginLeft = moment().diff(moment(range.start), 'days') * singleWidth;

    return {
      position: 'absolute',
      pointerEvents: 'none',
      borderLeft: '1px dashed orange',
      marginLeft,
      width: 0,
      top: 0,
      bottom: 0,
    };
  }

  /**
   * 点击页面重设日期高亮
   */
  resetHeightDuring = () => {
    PortfolioPlanViewStore.setHeightLightDuring({});
  }

  renderBoard = () => {
    const currentModeType = PortfolioPlanViewStore.getCurrentModeType;
    const { singleWidth, range } = this.state;
    const {
      data, scale, displayMethod, sticky, registerSticky, sprintAndStage,
    } = this.props;
    const { boards } = data;
    return boards.map((board) => {
      if (currentModeType === 'TargetSchedule') {
        return (
          <TargetScheduleBoard scale={scale} singleWidth={singleWidth} range={range} lineName={board.title} issues={board.issues} />
        );
      }
      if (currentModeType === 'WorkLoad') {
        return (
          <WorkLoadBoard lineData={board} singleWidth={singleWidth} range={range} lineName={board.title} sprintWorkLoad={board.sprintWorkLoad} />
        );
      } 
      if (currentModeType === 'Schedule') {
        return (
          <ScheduleBoard scale={scale} singleWidth={singleWidth} range={range} lineName={board.title} sprintsAndIssues={board.sprintsAndIssues} sprintAndStage={sprintAndStage} />
        );
      } 
    });
  }

  render() {
    const { singleWidth, range } = this.state;
    const HeightLightDuring = PortfolioPlanViewStore.getHeightLightDuring;
    const {
      data, scale, displayMethod, sticky, registerSticky, sprintAndStage,
    } = this.props;
    const { name, boards, id } = data;
    const marks = [{ key: 'plan_1', date: moment().startOf('month').add(rnd(2, 20), 'days'), title: ' 猪齿鱼1.0版本' }];
    return (
      <div
        className="Project"
        style={{
          paddingLeft: 100,
          background: '#f5f5f5',
        }}
      >
        {/* 中间数据区域 */}
        <div
          className="Project-content"
          style={{
            background: '#fff',
            position: 'relative',
          }}
        >
          <div className="Project-content-right" ref={this.saveRef('container')}>
            {/* 内容区域 */}
            <div
              className="Project-content-right-board-area"
              style={{
                // display: 'flex',
                // flexDirection: 'center',
              }}
            >
              {
                // boards.map(board => <TargetScheduleBoard scale={scale} singleWidth={singleWidth} range={range} lineName={board.title} issues={board.issues} />)
                
                // boards.map((board) => {
                //   this.renderBoard(board);
                // })

              this.renderBoard()

              }
              <div className="HeightLightToday" style={this.getHeightLightTodayStyle()} />
              <div className="HeightLightDuring" style={this.getHeightLightStyle()} />
            </div>
          </div>
          {/* 时间轴区域 */}
          <div>
            {
              <div
                style={{
                  position: 'relative',
                  height: 55,
                  background: '#fff',
                }}
                ref={sticky ? registerSticky : null}
              >
                <div
                  className="Project-content-left"
                  style={{
                    position: 'absolute',
                    left: -91,
                    top: -14,
                  }}
                >
                  <div className="Project-content-left-content" style={{ display: 'flex', flexDirection: 'row' }}>
                    <img src={icon} className="Project-icon" alt="" />
                    <div style={{ marginTop: 5 }}>{name}</div>
                  </div>
                </div>
                <div
                  className="Project-content-right-time-line"
                  style={{
                    //  display: 'inline-block',
                    background: '#fff',
                  }}
                >
                  <TimeLine singleWidth={singleWidth} proId={id} range={range} HeightLightDuring={HeightLightDuring} marks={marks} />
                </div>
              </div>
            }

          </div>
        </div>
      </div>
    );
  }
}

Project.propTypes = {

};

export default Project;

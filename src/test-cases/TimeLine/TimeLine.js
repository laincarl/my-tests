import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { findDOMNode } from 'react-dom';
import 'moment/locale/zh-cn';
import { extendMoment } from 'moment-range';
import './TimeLine.css';
import { observer } from 'mobx-react';
import Point from './Point';
import BasePoint from './BasePoint';
import TimeEvents from './TimeEvents';
import TimeLineStore from './TimeLineStore';

const moment = extendMoment(Moment);
moment.locale('zh-cn');
const MovePoint = props => (
  <BasePoint
    color="rgb(0, 101, 255)"
    reverse
    {...props}
    content={moment(props.date).format('LL')}
  />

);
@observer
class TimeLine extends Component {
  constructor() {
    super();
    const start = moment().startOf('month');
    const end = moment().endOf('month');
    const range = moment.range(start, end);
    // 时间段数
    const days = range.diff('days') + 1;    
    this.state = {
      pointing: false,
      left: 0,
      currentDate: start,
      range,
      days,
      singleWidth: 0,
      marks: [{ date: start.add(5, 'days'), title: ' 猪齿鱼1.0版本' }],
    };
  }

  componentDidMount() {
    this.setSingleWidth();
  }

  setSingleWidth = () => {
    const { days, singleWidth } = this.state;
    const { width } = this.line.getBoundingClientRect();
    const newSingleWidth = Math.floor(width / days);
    this.container.style.width = `${newSingleWidth * days}px`;
    console.log(width, newSingleWidth);
    if (newSingleWidth !== singleWidth) {
      this.setState({
        singleWidth: newSingleWidth,
      });
    }
  }

  setCurrentDate = (pos) => {
    const { singleWidth, currentDate, range } = this.state;
    // 向上舍入，因为时间点应该标记在时间的末尾
    const diffDay = Math.floor(pos / singleWidth);
    // console.log(pos, diffDay, singleWidth);
    const newCurrentDay = moment(range.start).add(diffDay, 'days');
    
    if (currentDate.isSame(newCurrentDay, 'day')) {
      console.log('diff');
      this.setState({
        currentDate: newCurrentDay,
      });
    }
  }

  handleMouseEnter = (e) => {
    const { left } = this.line.getBoundingClientRect();
    const pos = e.clientX - left;

    this.setCurrentDate(e.clientX - left);
    this.setState({
      pointing: !this.pointingOther,
      left: pos - 8,
    });
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseLeave = (e) => {
    // console.log('leave');
    this.setState({
      pointing: false,
    });
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseMove = (e) => {
    const { left } = this.line.getBoundingClientRect();
    const pos = e.clientX - left;
    this.setCurrentDate(e.clientX - left);
    // const hasMark = marks.some(mark => mark.isSame(currentDate, 'day'));
    this.setState({
      pointing: !this.pointingOther,
      left: pos - 8,
    });
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  calculateLeft = (date) => {
    const { singleWidth, range } = this.state;
    const tempRange = moment.range(moment(range.start), date);
    return (tempRange.diff('days') + 1) * singleWidth;
  }

  getHeightLightStyle = () => {
    const HeightLightDuring = TimeLineStore.getHeightLightDuring;
    const { start, end } = HeightLightDuring;
    if (!start || !end) {
      return {};
    }
    const { range, singleWidth } = this.state;
    const marginLeft = moment(start).diff(moment(range.start), 'days') * singleWidth;   
    const width = (moment(end).diff(moment(start), 'days') + 1) * singleWidth;    
    return {
      position: 'absolute',
      height: 'calc(100% - 5px)',
      pointerEvents: 'none',
      borderLeft: '1px dashed red',
      borderRight: '1px dashed red',
      marginLeft,
      width,
    };
  }

  render() {
    const {
      pointing, left, currentDate, marks, singleWidth, days, range,
    } = this.state;

    return (
      <div className="TimeLine-container" ref={this.saveRef('container')}>
        <div className="HeightLightDuring" style={this.getHeightLightStyle()} />
        <div className="TimeLine-content">
          {'content'}
          <TimeEvents singleWidth={singleWidth} range={range} />
        </div>
        {/* <div className="TimeLine-event-container" ref={this.saveRef('test')} /> */}
        <div className="TimeLine-line-container">
          <div className="TimeLine-line" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} ref={this.saveRef('line')}>
            {pointing && <MovePoint left={left} date={currentDate} />}
          </div>
          <div>
            {
              marks.map(mark => (
                <Point
                  key={mark.title}
                  left={this.calculateLeft(mark.date)}
                  onMouseEnter={() => {
                    this.pointingOther = true;
                  }}
                  onMouseLeave={() => {
                    this.pointingOther = false;
                  }}
                  content={`${mark.date.format('LL')}-${mark.title}`}
                />
              ))
            }
          </div>
        </div>

      </div>
    );
  }
}

TimeLine.propTypes = {

};

export default TimeLine;

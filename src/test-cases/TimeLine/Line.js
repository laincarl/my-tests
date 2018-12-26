import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { findDOMNode } from 'react-dom';
import { extendMoment } from 'moment-range';
import Point from './Point';
import BasePoint from './BasePoint';
import AlignBox from './AlignBox';

const moment = extendMoment(Moment);
const MOVE_COLOR = 'rgb(0, 101, 255)';
class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointing: false,
      left: 0,
      currentDate: props.range.start,
      singleWidth: 0,
      marks: [{ date: moment().startOf('month').add(5, 'days'), title: ' 猪齿鱼1.0版本' }],
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { singleWidth, range } = props;
    return {
      singleWidth, range,
    };
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  setCurrentDate = (pos) => {
    const { singleWidth, currentDate, range } = this.state;
    // 向上舍入，因为时间点应该标记在时间的末尾
    const diffDay = Math.floor(pos / singleWidth);
    // console.log(pos, diffDay, singleWidth);
    const newCurrentDay = moment(range.start).add(diffDay, 'days');

    if (!moment(currentDate).isSame(newCurrentDay, 'day')) {
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

  calculateLeft = (date) => {
    const { singleWidth, range } = this.state;
    const tempRange = moment.range(moment(range.start), date);
    return (tempRange.diff('days') + 1) * singleWidth;
  }

  render() {
    const {
      pointing, left, currentDate, marks, singleWidth, days, range,
    } = this.state;
    const { totalWidth } = this.props;    
    return (
      <div className="TimeLine-line-container">
        <div className="TimeLine-line" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} ref={this.saveRef('line')}>
          {pointing && <BasePoint left={left} reverse color="rgb(0, 101, 255)" date={currentDate} />}
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
              />
            ))
          }
        </div>
        {/* 内容区域 */}
        <div style={{ height: 50 }}>
          <div>
            {
              marks.map(mark => (
                <AlignBox left={this.calculateLeft(mark.date)} totalWidth={totalWidth}>        
                  <span
                    key={mark.title}
                    style={{
                      display: 'inline-block',
                      marginTop: 8,                   
                      background: 'white',
                    }}
                  >
                    {`${mark.date.format('LL')}-${mark.title}`}
                  </span>      
                </AlignBox>                
              ))
            }
          </div>
          {/* 实时滚动时间 */}
          <div>
            {pointing && (
              <AlignBox left={left} totalWidth={totalWidth}>        
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: 8,
                    // transform: 'translateX(-50%)',
                    background: 'white',
                    color: MOVE_COLOR,
                    border: `1px solid ${MOVE_COLOR}`,
                    borderRadius: 5,
                  }}
                >         
                  {moment(currentDate).format('LL')}        
                </span>             
              </AlignBox>              
            )}
          </div>
          {'content area'}
        </div>
      </div>
    );
  }
}

Line.propTypes = {

};

export default Line;

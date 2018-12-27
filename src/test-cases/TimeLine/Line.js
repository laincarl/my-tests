import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { findDOMNode } from 'react-dom';
import { extendMoment } from 'moment-range';
import HoverPoint from './HoverPoint';
import Point from './Point';
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
      marks: [{ key: 'plan_1', date: moment().startOf('month').add(15, 'days'), title: ' 猪齿鱼1.0版本' }],
      activePoint: 'move',
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
    const { activePoint } = this.state;
    const { left } = this.line.getBoundingClientRect();
    const pos = e.clientX - left;

    this.setCurrentDate(e.clientX - left);
    this.setState({
      pointing: activePoint === 'move',
      left: pos,
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
    const { activePoint } = this.state;
    const { left, width } = this.line.getBoundingClientRect();
    const pos = Math.min(e.clientX - left, width - 8); // 保证向右，不会超出
    this.setCurrentDate(e.clientX - left);
    this.setState({
      pointing: activePoint === 'move',
      left: pos,
    });
  }

  calculateLeft = (date) => {
    const { singleWidth, range } = this.state;
    const tempRange = moment.range(moment(range.start), date);
    return (tempRange.diff('days') + 1) * singleWidth;
  }

  renderHeightLightDuring = () => {
    const { HeightLightDuring } = this.props;
    const { start, end, offsetTop } = HeightLightDuring || {};
    if (!start || !end) {
      return null;
    }
    const { singleWidth, range } = this.state;
    const startLeft = moment(start).diff(moment(range.start), 'days') * singleWidth;
    const width = (moment(end).diff(moment(start), 'days') + 1) * singleWidth;
    const endLeft = startLeft + width;
    return [
      <AlignBox left={startLeft}>
        <span
          style={{
            display: 'inline-block',
            marginTop: 8,
            background: 'white',
            color: MOVE_COLOR,
            border: `1px solid ${MOVE_COLOR}`,
            borderRadius: 5,
          }}
        >
          {moment(start).format('LL')}
        </span>
      </AlignBox>,
      <AlignBox left={endLeft}>
        <span
          style={{
            display: 'inline-block',
            marginTop: 8,
            background: 'white',
            color: MOVE_COLOR,
            border: `1px solid ${MOVE_COLOR}`,
            borderRadius: 5,
          }}
        >
          {moment(end).format('LL')}
        </span>
      </AlignBox>,
    ];
  }

  render() {
    const {
      pointing, left, currentDate, marks, singleWidth, days, range, activePoint,
    } = this.state;

    return (
      <div className="TimeLine-line-container">
        <div className="TimeLine-line" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} ref={this.saveRef('line')}>
          {pointing && <Point left={left} reverse color="rgb(0, 101, 255)" date={currentDate} />}
          {/* 当前时间点 */}
          <Point size="small" color="orange" reverse left={this.calculateLeft(moment().subtract(1, 'days'))} />
          {/* 显示开始时间 */}
          <HoverPoint
            color="gray"
            left={8}
            onMouseEnter={() => {
              this.setState({
                activePoint: 'start',
              });
            }}
            onMouseLeave={() => {
              this.setState({
                activePoint: 'move',
              });
            }}
          />
        </div>
        {/* 轴上的标记点 */}
        <div>
          {
            marks.map(mark => (
              <HoverPoint
                key={mark.title}
                left={this.calculateLeft(mark.date)}
                onMouseEnter={() => {
                  this.setState({
                    activePoint: mark.key,
                  });
                }}
                onMouseLeave={() => {                 
                  this.setState({
                    activePoint: 'move',
                  });
                }}
              />
            ))
          }
        </div>
        {/* 内容区域 */}
        <div style={{ height: 50 }}>
          {/* 开始时间 */}
          <AlignBox left={0}>
            <span
              style={{
                display: 'inline-block',
                marginTop: 8,
                background: 'white',
                color: 'gray',
                border: activePoint === 'start' && '1px solid gray',
                borderRadius: 5,
              }}
            >
              {`${moment().format('LL')}-开始`}
            </span>
          </AlignBox>
          <div>
            {
              marks.map(mark => (
                <AlignBox left={this.calculateLeft(mark.date)}>
                  <span
                    key={mark.title}
                    style={{
                      display: 'inline-block',
                      marginTop: 8,
                      background: 'white',
                      color: 'rgb(54, 179, 126)',
                      border: activePoint === mark.key && '1px solid rgb(54, 179, 126)',
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
              <AlignBox left={left} zIndex={6}>
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
          <div>
            {this.renderHeightLightDuring()}
          </div>
        </div>
      </div>
    );
  }
}

Line.propTypes = {

};

export default Line;

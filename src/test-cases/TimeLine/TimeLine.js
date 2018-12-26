import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { findDOMNode } from 'react-dom';
import 'moment/locale/zh-cn';
import { extendMoment } from 'moment-range';
import './TimeLine.css';
import { observer } from 'mobx-react';
import TimeEvents from './TimeEvents';
import TimeLineStore from './TimeLineStore';
import Line from './Line';

const moment = extendMoment(Moment);
moment.locale('zh-cn');

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
      range,
      days,
      singleWidth: 0, 
      totalWidth: 0,    
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
    console.log(width, newSingleWidth);
    if (newSingleWidth !== singleWidth) {
      this.setState({
        singleWidth: newSingleWidth,
        totalWidth,
      });
    }
  }


  saveRef = name => (ref) => {
    this[name] = ref;
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

  /**
   * 点击页面重设日期高亮
   */
  resetHeightDuring=() => {
    TimeLineStore.setHeightLightDuring({});
  }

  render() {
    const { singleWidth, range, totalWidth } = this.state;
    console.log(totalWidth);
    return (
      <div role="none" className="TimeLine-container" ref={this.saveRef('container')} onClick={this.resetHeightDuring}>         
        <div style={{ height: 'calc(100% - 56px)', overflow: 'auto' }}>          
          <div className="HeightLightDuring" style={this.getHeightLightStyle()} />
          <div className="TimeLine-content">
            {'content'}
            <Line singleWidth={singleWidth} range={range} totalWidth={totalWidth} />
            <TimeEvents singleWidth={singleWidth} range={range} />      
            {/* <Line singleWidth={singleWidth} range={range} />       */}
          </div> 
        </div>
        <div className="fixed-line">
          <Line singleWidth={singleWidth} range={range} totalWidth={totalWidth} /> 
        </div>
        
      </div>
    );
  }
}

TimeLine.propTypes = {

};

export default TimeLine;

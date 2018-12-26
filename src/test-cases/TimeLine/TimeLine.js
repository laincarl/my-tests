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
    };
  }

  componentDidMount() {
    this.setSingleWidth();
  }

  setSingleWidth = () => {
    const { days, singleWidth } = this.state;
    const { width } = this.container.getBoundingClientRect();
    const newSingleWidth = Math.floor(width / days);
    this.container.style.width = `${newSingleWidth * days}px`;
    console.log(width, newSingleWidth);
    if (newSingleWidth !== singleWidth) {
      this.setState({
        singleWidth: newSingleWidth,
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

  render() {
    const { singleWidth, range } = this.state;

    return (
      <div className="TimeLine-container" ref={this.saveRef('container')}>         
        <div style={{ height: 'calc(100% - 106px)', overflow: 'auto' }}>          
          <div className="HeightLightDuring" style={this.getHeightLightStyle()} />
          <div className="TimeLine-content">
            {'content'}
            <TimeEvents singleWidth={singleWidth} range={range} />            
          </div> 
        </div>      
        <Line singleWidth={singleWidth} range={range} />
      </div>
    );
  }
}

TimeLine.propTypes = {

};

export default TimeLine;

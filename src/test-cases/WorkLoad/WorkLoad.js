import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import 'moment/locale/zh-cn';
import PropTypes from 'prop-types';
import SprintLine from './SprintLine';
import Line from '../TimeLine/Line';
import './WorkLoad.css';
import '../TimeLine/TimeLine.scss';
import ResizeContainer from '../ResizeDivider/ResizeContainer';

const { Divider, Section } = ResizeContainer;

const moment = extendMoment(Moment);
moment.locale('zh-cn');
class WorkLoad extends Component {
  constructor(props) {
    super(props);
    const rangeStart = moment().startOf('month');
    const rangeEnd = moment().endOf('month');
    const range = moment.range(rangeStart, rangeEnd);
    const days = range.diff('days') + 1;
    this.state = {
      singleWidth: 0,
      range,
      days,
      line: 'global',
      grouping: 'team',
      data: [
        {
          team: [
            { 
              'c7n面板 Team': [
                {
                  sprintId: 1,
                  sprintName: '敏捷Sprint1',
                  startDate: moment().startOf('month'),
                  endDate: moment().startOf('month').add(13, 'days').endOf('day'),
                  freeWorkLoad: 1.3,
                  planWorkLoad: 31.2,
                  blk: ['编码'],
                  freeCapacity: ['编码', '数据库设计', '前后端调试', '页面开发', '页面设计'],
                }, {
                  sprintId: 2,
                  sprintName: '敏捷Sprint1',
                  startDate: moment().startOf('month').add(14, 'days'),
                  endDate: moment().startOf('month').add(20, 'days').endOf('day'),
                  freeWorkLoad: 25,
                  planWorkLoad: 25,
                  blk: ['编码', '数据库设计'],
                  freeCapacity: ['页面开发', '页面设计'],
                },
              ],
            },
            { 
              'QVXR面板 Team': [
                {
                  sprintId: 3,
                  sprintName: '敏捷Sprint1',
                  startDate: moment().startOf('month'),
                  endDate: moment().startOf('month').add(6, 'days').endOf('day'),
                  freeWorkLoad: 1.2,
                  planWorkLoad: 18.8,
                  blk: [],
                  freeCapacity: ['数据库设计', '页面设计'],
                }, {
                  sprintId: 4,
                  sprintName: '敏捷Sprint1',
                  startDate: moment().startOf('month').add(7, 'days'),
                  endDate: moment().startOf('month').add(13, 'days').endOf('day'),
                  freeWorkLoad: 20,
                  planWorkLoad: 0,
                  blk: [],
                  freeCapacity: ['编码', '数据库设计', '前后端调试', '页面开发', '页面设计'],
                }, 
              ],
            },
          ],
        },
        {
          person: [

          ],
        },
      ],
    };
  }

  componentDidMount() {
    this.getSingleWidth();
  }

  getContainer = container => (ref) => {
    this[container] = ref;
  }

  getSingleWidth = () => {
    const { days, singleWidth } = this.state;
    const { width } = this.container.getBoundingClientRect();
    const newSingleWidth = width / days;
    console.log(`singleWidth： ${singleWidth},  newSingleWidth: ${newSingleWidth}`);
    if (newSingleWidth !== singleWidth) {
      this.setState(
        {
          singleWidth: newSingleWidth,
        },
      );
    }
  }

  renderAllLine() {
    const { 
      singleWidth, range, line, grouping, data, 
    } = this.state;
    const isFreeWorkLoadVisible = line === 'global';
    const visableData = Object.values(data.find(item => Object.keys(item)[0] === grouping))[0];
    if (visableData && visableData.length) {
      return visableData.map(item => <SprintLine lineData={item} singleWidth={singleWidth} range={range} isFreeWorkLoadVisible={isFreeWorkLoadVisible} />);
    }
    return '';
  }

  render() {
    const { singleWidth, range } = this.state;
    return (
      <ResizeContainer type="vertical">
        <Section size={{
          height: 300,
          minHeight: 200,
        }}
        >
          <div className="workLoad-container" style={{ height: '100%', overflow: 'auto' }} ref={this.getContainer('container')}>
            {this.renderAllLine()}
            <div className="workLoad-fixed-line">
              <Line singleWidth={singleWidth} range={range} /> 
            </div>
          </div>
        </Section>
        <Divider />
        <Section size={{
          height: 120,
          minHeight: 50,
        }}
        >
          <div style={{ flex: 1, height: '100%' }}>
            {'bottom'}
          </div>
        </Section>          
      </ResizeContainer>
    );
  }
}

WorkLoad.propTypes = {

};

export default WorkLoad;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from 'antd';
import TimeLineStore from './TimeLineStore';

const Event = (props) => {
  const {
    preEvent, event, singleWidth, range,
  } = props;
  const pre = preEvent || { fromDate: range.start, toDate: moment(range.start).subtract(1, 'days').endOf('day') };
  const { fromDate, toDate, title } = event;
  const marginLeft = (moment(fromDate).diff(moment(pre.toDate), 'days')) * singleWidth;
  const tempRange = moment.range(fromDate, toDate);
  const days = tempRange.diff('days') + 1;
  const width = singleWidth * days;
  return (
    <div
      role="none"
      style={{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        background: 'rgb(59, 127, 196)',
        color: 'white',
        cursor: 'pointer',
        padding: 1,
        width,
        marginLeft,
      }}
      onClick={() => {
        TimeLineStore.setHeightLightDuring({
          start: fromDate,
          end: toDate,
        });
      }}
    >
      <Tooltip title={`${moment(fromDate).format('LL')}-${moment(toDate).format('LL')}`}>
        {title}
      </Tooltip>
    </div>
  );
};
const EventLine = (props) => {
  const { lineEvents, ...restProps } = props;
  return (
    <div style={{ width: '100%', display: 'flex', margin: '3px 0' }}>
      {
        lineEvents.map((event, i) => (
          <div>
            <Event preEvent={lineEvents[i - 1]} event={event} {...restProps} />
          </div>
        ))
      }
    </div>
  );
};
class TimeEvents extends Component {
  state = {
    events: [
      [{
        fromDate: moment().startOf('month').add(5, 'days'),
        toDate: moment().startOf('month').add(6, 'days').endOf('day'),
        title: '自动化测试（前端）2',
      }, {
        fromDate: moment().startOf('month').add(9, 'days'),
        toDate: moment().startOf('month').add(13, 'days').endOf('day'),
        title: '自动化测试（前端）',
      }],
      [{
        fromDate: moment().startOf('month').add(5, 'days'),
        toDate: moment().startOf('month').add(7, 'days').endOf('day'),
        title: '自动化测试（前端）',
      }, {
        fromDate: moment().startOf('month').add(9, 'days'),
        toDate: moment().startOf('month').add(9, 'days').endOf('day'),
        title: '自动化测试（前端）',
      }],
    ],
  }

  render() {
    const { events } = this.state;
    const { ...restProps } = this.props;
    return (
      <div style={{ width: '100%' }}>
        {events.map(lineEvents => <EventLine lineEvents={lineEvents} {...restProps} />)}
      </div>
    );
  }
}

TimeEvents.propTypes = {

};

export default TimeEvents;
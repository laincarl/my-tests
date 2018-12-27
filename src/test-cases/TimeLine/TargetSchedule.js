import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tooltip } from 'antd';
import { observer } from 'mobx-react';
import TimeLineStore from './TimeLineStore';

@observer
class Event extends Component {
  render() {
    const {
      preEvent, event, singleWidth, range,
    } = this.props;
    const pre = preEvent || { fromDate: range.start, toDate: moment(range.start).subtract(1, 'days').endOf('day') };
    const {
      fromDate, toDate, title, id, proId,
    } = event;
    const marginLeft = (moment(fromDate).diff(moment(pre.toDate), 'days')) * singleWidth;
    const tempRange = moment.range(fromDate, toDate);
    const days = tempRange.diff('days') + 1;
    const width = singleWidth * days;
    const HeightLightDuring = TimeLineStore.getHeightLightDuring;
    const { id: selectedId } = HeightLightDuring;
    return (
      <div
        role="none"
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          background: `rgba(59, 127, 196 ,${selectedId && selectedId !== id ? 0.6 : 1})`,
          color: 'white',
          cursor: 'pointer',
          padding: 1,
          width,
          marginLeft,
        }}
        onClick={(e) => {
          const { offsetTop } = e.target;
          e.stopPropagation();
          TimeLineStore.setHeightLightDuring({
            start: fromDate,
            end: toDate,
            offsetTop,
            id,
            proId,
          });
        }}
      >
        <Tooltip title={`${moment(fromDate).format('LL')}-${moment(toDate).format('LL')}`}>
          {title}
        </Tooltip>
      </div>
    );
  }
}
  

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
@observer
class TargetSchedule extends Component {
  render() {
    const { issues, ...restProps } = this.props;
    return (
      <div style={{ width: '100%' }}>
        {issues.map(lineEvents => <EventLine lineEvents={lineEvents} {...restProps} />)}
      </div>
    );
  }
}

TargetSchedule.propTypes = {

};

export default TargetSchedule;

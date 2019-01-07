import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TargetSchedule from './TargetSchedule';
import PortfolioPlanViewStore from '../../PortfolioPlanViewStore';

@observer
class TargetScheduleBoard extends Component {
  state={

  }

  render() {
    const HeightLightDuring = PortfolioPlanViewStore.getHeightLightDuring;
    const { singleWidth, range, issues } = this.props;
    return (
      <div>
        <div>title</div>
        <TargetSchedule singleWidth={singleWidth} range={range} issues={issues} />
      </div>
    );
  }
}

TargetScheduleBoard.propTypes = {

};

export default TargetScheduleBoard;

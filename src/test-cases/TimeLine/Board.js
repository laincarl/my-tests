import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TargetSchedule from './TargetSchedule';
import TimeLineStore from './TimeLineStore';

@observer
class Board extends Component {
  state={

  }

  render() {
    const HeightLightDuring = TimeLineStore.getHeightLightDuring;
    const { singleWidth, range, issues } = this.props;
    return (
      <div>
        <div>title</div>
        <TargetSchedule singleWidth={singleWidth} range={range} issues={issues} />
      </div>
    );
  }
}

Board.propTypes = {

};

export default Board;

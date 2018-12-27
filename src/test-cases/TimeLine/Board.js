import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TargetSchedule from './TargetSchedule';

@observer
class Board extends Component {
  state={

  }

  render() {
    const { singleWidth, range } = this.props;
    return (
      <div>
        <div>title</div>
        <TargetSchedule singleWidth={singleWidth} range={range} />
      </div>
    );
  }
}

Board.propTypes = {

};

export default Board;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Popover } from 'antd';
import map from 'lodash/map';
import PortfolioPlanViewStore from '../../PortfolioPlanViewStore';
// import moment = require('moment');

@observer
class ScheduleBoard extends Component {
  state={

  }

  getIssuePopover(issue) {
    return (
      <div>
        <div>{issue.id}</div>
        <div>{issue.title}</div>
        <div>阶段</div>
        <div>{issue.stageName}</div>
      </div>
    );
  }

  renderScheduleBoardContent() {
    const HeightLightDuring = PortfolioPlanViewStore.getHeightLightDuring;
    const {
      singleWidth, range, lineName, sprintsAndIssues, scale, sprintAndStage,
    } = this.props;
    const STAGECOLORS = {
      study: 'rgb(76, 154, 255)',
      code: 'rgb(222, 53, 11)',
      test: 'rgb(0, 184, 217)',
    };

    const issues = map(sprintsAndIssues, 'issues');
    
    if (true) {
      return (
        <div style={{
          marginBottom: 10,
        }}
        >
          <div>{lineName}</div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
          }}
          >
            {
              sprintsAndIssues && sprintsAndIssues.length && sprintsAndIssues.map((item, i) => (
                <div
                  style={{
                    width: singleWidth * (item.toDate.diff(item.fromDate, 'days') + 1),
                    background: `${i % 2 === 1 ? '#f5f5f5' : '#fff'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 3,
                  }}
                >
                  <div key={item.sprintId}>{item.sprintName}</div>
                  <div style={{
                  }}
                  >
                    {
                      item.issues && item.issues.length && item.issues.map(issue => (
                        <Popover title="" content={this.getIssuePopover(issue)}>
                          <div 
                            key={issue.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              width: singleWidth * (item.toDate.diff(item.fromDate, 'days') + 1),
                              height: 18 * scale,
                              background: STAGECOLORS[issue.stageCode],
                              marginBottom: 3,
                            }}
                          >
                            {issue.title}
                          </div>
                        </Popover>
                      ))
                    }
                  </div>
                 
                </div>
              ))
            }
          </div>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderScheduleBoardContent()}
      </div>
    );
  }
}

ScheduleBoard.propTypes = {

};

export default ScheduleBoard;

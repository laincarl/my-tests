import React, { Component } from 'react';
import moment from 'moment';
import { Popover } from 'antd';
import './SprintRect.less';
import { renderReporter } from 'mobx-react';

const sprintLineHeight = 100;
// const SprintRect = (props) => {
//   const {
//     preSprintData, sprintData, perStoryPointHeight, singleWidth, range,
//   } = props;
//   const {
//     sprintName, startDate, endDate, freeWorkLoad, planWorkLoad, freeCapacity, 
//   } = sprintData;
//   const sprintDays = endDate.diff(startDate, 'days') + 1;
//   const singleSprintWidth = singleWidth * sprintDays;
//   const freeHeight = freeWorkLoad * perStoryPointHeight;
//   const planHeight = planWorkLoad * perStoryPointHeight;
//   const emptyHeight = sprintLineHeight - freeHeight - planHeight;

//   // getPopOverContent = () => (
//   //   <div className="Popover-content" />
//   // );

//   // handleSprintClick = () => {

//   // };

//   return (
//     <Popover title={sprintName} content={}>
//       <div 
//         className="workLoad-sprint-container"
//         style={{
//           width: singleSprintWidth,
//           marginLeft: 2,
//           height: sprintLineHeight,
//         }}
//       >
//         <div
//           className="workLoad-sprint-empty"
//           style={{
//             width: '100%',
//             height: emptyHeight,
//           }}
//         />
//         <div 
//           className="workLoad-sprint-free"
//           style={{
//             height: freeHeight,
//           }}
//         />
//         <div 
//           className="workLoad-sprint-plan"
//           style={{
//             height: planHeight,
//           }}
//         >
//           {planHeight > 15 ? planWorkLoad : ''}
//         </div>
//         <div className="workLoad-sprint-name">
//           {sprintName}
//         </div>
//       </div>
//     </Popover>
   
//   );
// };


class SprintRect extends Component {
  constructor(props) {
    super(props);
  }
 
  getPopOverContent = () => {
    const {
      sprintData,
    } = this.props;
    const {
      sprintName, startDate, endDate, freeWorkLoad, planWorkLoad, blk, freeCapacity, 
    } = sprintData;
    return (
      <div className="Popover-content">
        <div className="Popover-time">{`${moment(startDate).format('LL')} - ${moment(endDate).format('LL')}`}</div>
        <div className="PopOver-wordLoad">
          <div>
            <span>空闲工作量</span>
            <span>{freeWorkLoad}</span>
          </div>
          <div>
            <span>计划工作量</span>
            <span>{planWorkLoad}</span>
          </div>
          <div>
            <span>工作量利用</span>
            <span>{`${(planWorkLoad / (freeWorkLoad + planWorkLoad)).toFixed(2) * 100}%`}</span>
          </div>
        </div>
        <div className="Popover-blkOrfCapacity">
          {
          blk && blk.length && (
            <div>
              <span>瓶颈</span>
              <span>{blk.join(',')}</span>
            </div>
          )
        }
          <div>
            <span>空闲容量</span>
            <span>{freeCapacity.join(',')}</span>
          </div>
        </div>
      </div>
    );
  };

  // handleSprintClick = () => {

  // };
  render() {
    const {
      preSprintData, sprintData, perStoryPointHeight, singleWidth, range,
    } = this.props;
    const {
      sprintName, startDate, endDate, freeWorkLoad, planWorkLoad, freeCapacity, 
    } = sprintData;
    const sprintDays = endDate.diff(startDate, 'days') + 1;
    const singleSprintWidth = singleWidth * sprintDays;
    const freeHeight = freeWorkLoad * perStoryPointHeight;
    const planHeight = planWorkLoad * perStoryPointHeight;
    const emptyHeight = sprintLineHeight - freeHeight - planHeight;
    return (
      <Popover title={sprintName} trigger="click" content={this.getPopOverContent()}>
        <div 
          className="workLoad-sprint-container"
          style={{
            width: singleSprintWidth,
            marginLeft: 2,
            height: sprintLineHeight,
          }}
        >
          <div
            className="workLoad-sprint-empty"
            style={{
              width: '100%',
              height: emptyHeight,
            }}
          />
          <div 
            className="workLoad-sprint-free"
            style={{
              height: freeHeight,
            }}
          />
          <div 
            className="workLoad-sprint-plan"
            style={{
              height: planHeight,
            }}
          >
            {planHeight > 15 ? planWorkLoad : ''}
          </div>
          <div className="workLoad-sprint-name">
            {sprintName}
          </div>
        </div>
      </Popover>
    );
  }
}


export default SprintRect;

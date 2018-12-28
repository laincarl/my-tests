import React from 'react';
import SprintRect from './SprintRect';

const sprintLineHeight = 100;

const SprintLine = (props) => {
  const { lineData, ...restProps } = props;
  const arrLineData = Object.values(lineData)[0];
  const name = Object.keys(lineData)[0];
  if (arrLineData && arrLineData.length) {
    const maxTotalStoryPoints = Math.max(...arrLineData.map(item => item.freeWorkLoad + item.planWorkLoad));
    const perStoryPointHeight = sprintLineHeight / maxTotalStoryPoints;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'fex-start',
          width: '100%',
        }}
        >
          {name}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {arrLineData.map((item, i) => <SprintRect preSprintData={arrLineData[i - 1]} sprintData={item} perStoryPointHeight={perStoryPointHeight} {...restProps} />)}
        </div>
      </div>
    );
  }
  return '';
};
export default SprintLine;

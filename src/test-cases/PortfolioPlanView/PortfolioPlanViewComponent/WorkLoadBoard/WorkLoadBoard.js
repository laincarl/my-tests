import React from 'react';
import SprintRect from './SprintRect';

const sprintLineHeight = 100;

const SprintLine = (props) => {
  const { lineName, sprintWorkLoad, ...restProps } = props;
  if (sprintWorkLoad && sprintWorkLoad.length) {
    const maxTotalStoryPoints = Math.max(...sprintWorkLoad.map(item => item.freeWorkLoad + item.planWorkLoad));
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
          {sprintWorkLoad.map((item, i) => <SprintRect preSprintData={sprintWorkLoad[i - 1]} sprintData={item} perStoryPointHeight={perStoryPointHeight} {...restProps} />)}
        </div>
      </div>
    );
  }
  return '';
};
export default SprintLine;

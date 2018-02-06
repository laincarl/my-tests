import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  item: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
};
class OneItem extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid #D3D3D3',
          padding: '10px 36px',
          fontSize: '14px',
        }}
      >
        <div
          style={{
            ...styles.item,
            ...{ width: '98px', marginRight: '61px', color: '#3F51B5' },
          }}
        >
          稳住，我们能赢
        </div>
        <div
          style={{
            ...styles.item,
            ...{
              width: '84px',
              marginRight: '97px',
              color: 'rgba(0,0,0,0.65)',
              fontSize: '12px',
            },
          }}
        >
          稳住，我们能赢
        </div>
        <div
          style={{
            width: '73px',
            ...styles.item,
            ...{ marginRight: '47px', color: 'rgba(0,0,0,0.65)' },
          }}
        >
          已完成90%
        </div>
        <div
          style={{
            ...styles.item,
            ...{
              width: '77px',
              marginRight: '22px',
              color: 'rgba(0,0,0,0.65)',
            },
          }}
        >
          2017-12-03
        </div>
        <div
          style={{
            ...styles.item,
            ...{
              width: '77px',
              marginRight: '66px',
              color: 'rgba(0,0,0,0.65)',
            },
          }}
        >
          2017-12-03
        </div>
        <div
          style={{
            ...styles.item,
            ...{ marginRight: '64px', color: 'rgba(0,0,0,0.65)' },
          }}
        >
          开启
        </div>
        <div
          style={{
            ...styles.item,
            ...{ marginRight: '64px', color: 'rgba(0,0,0,0.65)' },
          }}
        >
          编辑
        </div>
        <div
          style={{
            ...styles.item,
            ...{ marginRight: '66px', color: 'rgba(0,0,0,0.65)' },
          }}
        >
          用户故事
        </div>
      </div>
    );
  }
}

OneItem.propTypes = {};

export default OneItem;

import React, { Component } from 'react';

export const STATUS = {
  todo: '#ffb100',
  doing: '#4d90fe',
  done: '#00bfa5',
};

class StatusTag extends Component {
  render() {
    const { style, status } = this.props;
    const { colour: statusColor, name: statusName, type: statusCode } = status || {};  
    return (
      <div
        className=""
        style={{
          display: 'inline-block',
          background: STATUS[statusCode],
          color: '#fff',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          borderRadius: '2px',
          padding: '0 6px',
          lineHeight: '20px',
          fontSize: '12px',
          width: 50,
          textAlign: 'center',
          ...style,
        }}
      >
        { statusName }
      </div>
    );
  }
}
export default StatusTag;

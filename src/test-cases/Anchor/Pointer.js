import React, { Component } from 'react';

export default class Pointer extends Component {
  state={
    active: false,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.anchor.current === props.to) {
      return {
        active: true,
      };
    } else {
      return {
        active: false,
      };
    }
  }

  handlePointerClick=() => {
    const { to, anchor } = this.props;
    anchor.scrollTo(to);
  }

  render() {
    const { anchor, children } = this.props;
    const { active } = this.state;
    const { points } = anchor;
   
    return (
      <div role="none" style={{ color: active && 'green', cursor: 'pointer' }} onClick={this.handlePointerClick}>
        {children}
      </div>
    );
  }
}

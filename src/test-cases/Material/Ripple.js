import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

const duration = 600;
export default class Ripple extends Component {
  state={
    entering: false,
    leaving: false,
  }

  onEnter = (node) => {
    console.log('onEnter box');
    setTimeout(() => {
      this.setState({
        entering: true,
      });
    }, 0);
  };

  onExit = (node) => {
    this.setState({
      leaving: true,
    });
    console.log('onExit box');
  };

  render() {   
    const { r, left, top } = this.props;
    const { entering, leaving } = this.state;
    return (
      <Transition
        {...this.props}
        timeout={{
          enter: duration,
          exit: duration,
        }}
        onEnter={this.onEnter}
        onExit={this.onExit}
      >
        <div 
          className={`ripple ${entering && 'ripple-active'} ${leaving && 'ripple-done'}`}
          style={{
            width: r * 2, height: r * 2, left, top, 
          }}
        />
      </Transition>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import Ripple from './Ripple';

import './Material.css';

class Material extends Component {
  state = {
    index: 0,
    ripples: [],
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.removeRipple);
  }
  
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.removeRipple);
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  handleMouseDown = (e) => {
    const wrapperHeight = this.rippleWrapper.getBoundingClientRect().height;
    const wrapperWidth = this.rippleWrapper.getBoundingClientRect().width;
    // 半径
    const r = Math.sqrt(wrapperHeight * wrapperHeight + wrapperWidth * wrapperWidth);
    const left = e.clientX - this.rippleWrapper.getBoundingClientRect().left - r;
    const top = e.clientY - this.rippleWrapper.getBoundingClientRect().top - r;
    const { ripples, index } = this.state;
    const ripple = <Ripple key={index} r={r} left={left} top={top} />;
    this.setState({
      index: index + 1,
      ripples: [...ripples, ripple],
    });
  }

  removeRipple = () => {
    const { ripples } = this.state;
    if (ripples && ripples.length) {
      this.setState({
        ripples: [],
      });
    }
  }

  rippleChild = () => {
    const { ripples } = this.state;
    const rippleWrapper = (
      <span ref={this.saveRef('rippleWrapper')} className="ripple-wrapper">
        <TransitionGroup component={null}>
          {ripples}
        </TransitionGroup>
      </span>
    );
    return rippleWrapper;
  }


  renderChildrenWithRipple = () => {
    const child = React.Children.only(this.props.children);
    const { children, style } = child.props;
    return React.cloneElement(this.props.children, {
      ref: this.saveRef('chil'),
      onMouseDown: this.handleMouseDown,
      children: [
        children,
        this.rippleChild(),
      ],
      style: {
        ...style,
        position: 'relative',
      },
    });
  }

  render() {
    return this.renderChildrenWithRipple();
  }
}

Material.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Material;

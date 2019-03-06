import React, { Component, Fragment } from 'react';
import { createPortal, findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import align from './utils';
import './Tooltip.scss';

const placements = {
  top: 'tooltip-placement-top',
  bottom: 'tooltip-placement-bottom',
};
class Tooltip extends Component {
  state = {
    visible: false,
  }


  componentDidUpdate(prevProps, prevState) {
    const placement = align(findDOMNode(this.tip), findDOMNode(this.target));
    const alignClassName = this.getPopupClassNameFromAlign(placement);
    const visibleClassName = this.getVisibleClassName();
    findDOMNode(this.tip).className = `${visibleClassName}  ${alignClassName}`;
  }

  getVisibleClassName=() => (this.state.visible ? 'tooltip' : 'tooltip tooltip-hidden')

  getPopupClassNameFromAlign = (placement) => {  
    const classNames = [];
    classNames.push(placements[placement]);
    return classNames.join(' ');
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  handleMouseEnter = (e) => {
    this.setState({
      visible: true,
    });
  }

  handleMouseLeave = (e) => {
    this.setState({
      visible: false,
    });
  }

  renderChildren = () => {
    const { children } = this.props;
    const child = React.Children.only(children);
    return React.cloneElement(child,
      {
        ref: this.saveRef('target'),
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
      });
  }

  renderTip = () => {
    const { title } = this.props;
    const { visible } = this.state;
    return createPortal(
      <div ref={this.saveRef('tip')} className={`tooltip ${visible ? '' : 'tooltip-hidden'}`}>
        <div className="tooltip-content">
          <div className="tooltip-arrow" />
          <div className="tooltip-inner">{title}</div>
        </div>
      </div>,
      document.body,
    );
  }


  render() {
    return (
      <Fragment>
        {this.renderChildren()}
        {this.renderTip()}
      </Fragment>
    );
  }
}

Tooltip.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string, 
    PropTypes.element,
  ]),
};

export default Tooltip;

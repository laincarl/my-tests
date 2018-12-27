/*
 * @Author: LainCarl 
 * @Date: 2018-12-26 17:47:28 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-12-26 18:07:44
 * @Feature: 保证点的描述渲染位置正确
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

class AlignBox extends Component {
  state = {
    left: 0,
  }

  static defaultProps = {
    totalWidth: 0,
    zIndex: 1,
  }

  componentDidMount() {
    this.setLeft();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setLeft();
  }

  setLeft = () => {
    const { left } = this.props;
    const node = findDOMNode(this);
    const contentWidth = node.offsetWidth + 2;
    // 父元素的宽度
    const totalWidth = node.parentNode.offsetWidth;
    let finalLeft = left; 
    finalLeft -= contentWidth / 2;// 向左移动，居中
    finalLeft = Math.max(0, finalLeft);// 保证向左不会超出父元素
    finalLeft = Math.min(finalLeft, totalWidth - contentWidth);// 保证向右不会超出父元素   
    finalLeft = Math.round(finalLeft);   
    // 防止渲染死循环
    if (Math.abs(this.state.left - finalLeft) > 1) {
      this.setState({
        left: finalLeft,
      });
    }
  }

  render() {
    const { left } = this.state;
    const { zIndex } = this.props;
    return (
      <div style={{
        display: 'inline-block', position: 'absolute', left, zIndex, 
      }}
      >
        {this.props.children}
      </div>
    );
  }
}

AlignBox.propTypes = {

};

export default AlignBox;

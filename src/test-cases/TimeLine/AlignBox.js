/*
 * @Author: LainCarl 
 * @Date: 2018-12-26 17:47:28 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-12-26 17:48:59
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
  }

  componentDidMount() {
    this.setLeft();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setLeft();
  }

  setLeft = () => {
    const { totalWidth, left } = this.props;
    const contentWidth = findDOMNode(this).offsetWidth;
    let finalLeft = left + 7; // 向左移动，抵消点的长度，居中
    finalLeft -= contentWidth / 2;// 向左移动，居中
    finalLeft = Math.max(0, finalLeft);// 保证向左不会超出父元素
    finalLeft = Math.min(finalLeft, totalWidth - contentWidth);// 保证向右不会超出父元素
    finalLeft = Math.round(finalLeft);
    // console.log(this.state.left, finalLeft);
    // 防止渲染死循环
    if (Math.abs(this.state.left - finalLeft) > 1) {
      this.setState({
        left: finalLeft,
      });
    }
  }

  render() {
    const { left } = this.state;
    return (
      <div style={{ display: 'inline-block', position: 'absolute', left }}>
        {this.props.children}
      </div>
    );
  }
}

AlignBox.propTypes = {

};

export default AlignBox;

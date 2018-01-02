import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Test from './test.css';
import { Button } from 'antd';
class CssModule extends Component {
  render() {
    return (
      <div className={Test.title}>
        title应该是红色
        <Button className={Test.button}>按钮颜色应该是红色</Button>
      </div>
    );
  }
}

CssModule.propTypes = {};

export default CssModule;

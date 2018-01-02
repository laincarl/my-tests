import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Test from './test.css';
class CssModule extends Component {
    render() {
        return (
            <div className={Test.title}>
                title应该是红色
                <div className={Test.content}>content应该是蓝色</div>
            </div>
        );
    }
}

CssModule.propTypes = {

};

export default CssModule;
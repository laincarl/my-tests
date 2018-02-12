import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CssModule extends Component {
    render() {
        return (
            <div className="title">
                title应该是黑色
            </div>
        );
    }
}

CssModule.propTypes = {

};

export default CssModule;
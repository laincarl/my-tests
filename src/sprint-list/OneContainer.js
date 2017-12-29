import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OneHeader from './OneHeader';
import OneItem from './OneItem';
class OneContainer extends Component {
    render() {
        return (
            <div>
                <OneHeader/>
                <OneItem/>
            </div>
        );
    }
}

OneContainer.propTypes = {

};

export default OneContainer;
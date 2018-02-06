/*eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
class Use extends Component {
    show=()=>{
        Modal.success("ss");
    }
    render() {
        return (
            <div id="ss">
                <button onClick={this.show}>sss</button>                
            </div>
        );
    }
}

Use.propTypes = {

};

export default Use;
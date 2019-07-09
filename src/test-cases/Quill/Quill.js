import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';

class Quill extends Component {
  state = {
    value: 'test',
  };

  handleChange = (value) => {
    this.setState({
      value,
    });
  };


  render() {
    return (
      <ReactQuill value={this.state.value} onChange={this.handleChange} />       
   
    );
  }
}

Quill.propTypes = {

};

export default Quill;

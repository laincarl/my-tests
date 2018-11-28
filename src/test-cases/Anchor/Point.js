/* eslint-disable react/no-find-dom-node */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Point extends Component {
  componentDidMount() {
    const { anchor, id } = this.props;
    const { points, addPoint } = anchor;    
    addPoint({ ref: ReactDOM.findDOMNode(this), id });
  }
  
  render() {
    const { id } = this.props;
    return <div {...this.props} />;
  }
}

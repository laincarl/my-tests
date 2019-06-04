import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Connector from './Connector';
import './Svg.css';

class Svg extends Component {
  constructor() {
    super();
    this.divA = React.createRef();
    this.divB = React.createRef();
    this.groups = [{
      from: this.divA.current,
      to: this.divB.current,
    }];
  }

  handleClick=(e) => {
    console.log(e);
  }
  

  getStartPoint=(element, isFrom) => {
    if (element) {
      return {
        x: element.offsetLeft + element.offsetWidth + 8,
        y: element.offsetTop + element.offsetHeight / 2,    
      };
    }
    return {
      x: 0,
      y: 0,
    };
  }

  getEndPoint=(element) => {
    if (element) {
      return {
        x: element.offsetLeft - 8,
        y: element.offsetTop + element.offsetHeight / 2,
      };
    }
    return {
      x: 0,
      y: 0,
    };
  }

  render() {
    // const connectors = this.groups.map(group => ({
    //   from: this.getStartPoint(group.start),
    //   to: this.getEndPoint(group.end),
    // }));
    return (
      <div className="container">
        <div>
          <div ref={this.divA} className="child">1</div>
          <div ref={this.divB} className="child" style={{ marginLeft: 200 }}>2</div>
        </div>
        <svg
          className="test"
          id="mysvg"
          xmlns="http://www.w3.org/2000/svg"
          // viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* <path     
            className="line"            
            onClick={this.handleClick}
            d="
            M120, 40
            L200, 120"
            // markerStart="url(#arrowhead)" 
            // markerMid="url(#arrowhead)" 
            markerEnd="url(#arrowhead)"
          /> */}
          <g fill="none" stroke="#3f51b5" strokeWidth="1" markerEnd="url(#arrowhead)">
            {/* {
              connectors.map(connector => <Connector from={connector.from} to={connector.to} />)
            } */}
            <Connector
              from={{
                x: 120,
                y: 40,
              }}
              to={{
                x: 196,
                y: 120,
              }}
            />
          </g>
          <defs>             
            <marker
              id="arrowhead"              
              viewBox="0 0 10 10"
              refX="3"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path fill="#3f51b5" d="M 0 0 L 10 5 L 0 10 z" />
            </marker>
          </defs>

        </svg>
      </div>
    );
  }
}
  
Svg.propTypes = {

};
          
export default Svg;

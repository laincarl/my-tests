import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashLink as Link } from 'react-router-hash-link';
import './CssAnchor.css';

class CssAnchor extends Component {
  render() {
    return (
      <div>
                CssAnchor
        <Link to="/CssAnchor#6">Link to Hash Fragment</Link>
        <div id="1" className="li">1</div>
        <div id="2" className="li">2</div>
        <div id="3" className="li">3</div>
        <div id="4" className="li">4</div>
        <div id="5" className="li">5</div>
        <div id="6" className="li">6</div>
        <div id="7" className="li">7</div>
        <div id="8" className="li">8</div>
        <div id="9" className="li">9</div>
        <div id="10" className="li">10</div>
      </div>
    );
  }
}

CssAnchor.propTypes = {

};

export default CssAnchor;

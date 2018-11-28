import React, { Component, createContext } from 'react';
import Point from './Point';
import Pointer from './Pointer';
import AnchorContext from './AnchorContext';
import withAnchor from './withAnchor';
import './Anchor.css';


class Anchor extends Component {
  static defaultProps = {
    getContainer: () => document,
  }

  state = {
    current: null,
  }

  points = [];


  componentDidMount() {
    this.getContainer().addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    this.getContainer().removeEventListener('scroll', this.handleScroll);
  }

  getContainer = () => this.props.getContainer()

  handleScroll = (e) => {
    for (let i = 0; i < this.points.length; i += 1) {
      const point = this.points[i].ref;
      if (point.offsetTop + point.offsetHeight > this.getContainer().scrollTop + 100) {       
        this.setState({
          current: this.points[i].id,
        });
        break;
      }
    }
  }

  collectPoints = (point) => {
    this.points.push(point);
  }

  handleScrollTo = (id) => {
    for (let i = 0; i < this.points.length; i += 1) {
      const pointId = this.points[i].id;
      if (pointId === id) { 
        this.points[i].ref.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          // inline: "nearest",
        });
      }
    }
  }

  render() {
    const { current } = this.state;
    return (
      <AnchorContext.Provider value={{
        points: this.points,
        current,
        addPoint: this.collectPoints,
        scrollTo: this.handleScrollTo,
      }}
      >
        <div>
          {this.props.children}
        </div>
      </AnchorContext.Provider>
    );
  }
}
Anchor.Point = withAnchor(Point);
Anchor.Pointer = withAnchor(Pointer);

export default Anchor;

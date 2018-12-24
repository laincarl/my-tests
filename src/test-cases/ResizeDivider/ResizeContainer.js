import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from './Divider';
import Section from './Section';
// import withContext from '../../utils/withContext';
import './ResizeContainer.css';

const ResizerContext = React.createContext({});
class ResizeContainer extends Component {
  static defaultProps = {
    type: 'horizontal',
  }

  componentDidMount() {
    // this.AnalyzeChildren();
    // const { type, test } = this.props;
    // console.log(test);
  }

  componentDidUpdate(prevProps, prevState) {
    // const { type, test } = this.props;
    // console.log(test);
  }

  handleResize = () => {
    console.log('resize');
  }

  saveRef = name => (ref) => {
    this[name] = ref;
  }

  AnalyzeChildren = () => {
    const children = React.Children.toArray(this.props.children);
    const newChildren = children.map((child, i) => {
      // console.log(child.type.displayName, child.type instanceof Divider);   
      if (child.type.displayName === 'Divider') {
        return React.cloneElement(
          child,
          {
            ...child.props,
            parent: this,
            bindings: [`Section_${i - 1}`, `Section_${i + 1}`],
            type: this.props.type,
          },
        );
      }

      return React.cloneElement(
        child,
        {
          ...child.props,
          ref: this.saveRef(`Section_${i}`),
          type: this.props.type,
        },
      );
    });
    return newChildren;
  }

  render() {
    const { type } = this.props;

    return (
      <div className={`resize-divider-container resize-divider-container-${type}`}>
        {this.AnalyzeChildren()}
      </div>
    );
  }
}

ResizeContainer.propTypes = {
  type: PropTypes.oneOf(['vertical', 'horizontal']),
};
ResizeContainer.Divider = Divider;
ResizeContainer.Section = Section;

export default ResizeContainer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class Item extends Component {
  componentDidMount() {
    console.log('mount');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('update');
  }
  
  render() {
    const { data } = this.props;
    return (
      <div style={{ height: 50 }}>
        {data.title}
      </div>
    );
  }
}

Item.propTypes = {

};

export default Item;

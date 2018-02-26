import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
const backgrounds = ['blue', 'green', 'blue', 'pink']
@observer
class Node extends Component {
  componentDidMount() {
    const { x, y } = this.props;
    console.log('didmount', x + ',' + y);
  }
  componentDidUpdate(prevProps, prevState) {
    const { x, y } = this.props;
    this.instance.style.background = 'red';
    console.log('didupdate', x + ',' + y)
  }
  render() {
    const { data, x, y } = this.props;

    return (
      <div ref={(instance) => { if (instance) this.instance = instance }} style={{ background: backgrounds[x], margin: 10, textAlign: 'center', minHeight: 30, minWidth: 30 }} title={x + ',' + y}>
        {data.name}
        <div style={{ display: 'flex' }}>
          {data.children ? data.children.map((one, i) => <Node x={x + 1} y={i} key={one.id} data={one} />) : null}
        </div>
      </div>
    );
  }
}

Node.propTypes = {

};

export default Node;
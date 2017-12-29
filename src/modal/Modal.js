/*eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

class MyModal extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.father);
    this.state = {
      visible: true,
    };
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  render() {
    return (
      <div>
        <Modal
          getContainer={() => this.props.father}
          title="Title"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <p>sss</p>
        </Modal>
      </div>
    );
  }
}
const MountNode = {
  prepare: () => {
    var div = document.createElement('div');
    document.body.appendChild(div);
    var div2 = document.createElement('div');
    let id = Math.random();
    div2.id = id;
    document.body.appendChild(div);
    document.body.appendChild(div2);
    // var MountedNode = ReactDOM.render(node, div);
    return [div, div2];
  },
  mount: (node, div) => {
    console.log(div);
    var MountedNode = ReactDOM.render(node, div);
    return MountedNode;
  },
  unmount: instance => {
    document.body.removeChild(instance);
  },
};
const FModal = {
  success: () => {
    console.log('success');
    let mountNode = MountNode.prepare();
    console.log(mountNode);
    let instance = MountNode.mount(
      <MyModal father={mountNode[1]} />,
      mountNode[0],
    );
    console.log(instance);
    // setTimeout(() => MountNode.unmount(instance), 1000);
    // ReactDOM.render(<MyModal />, div);
  },
};

MyModal.propTypes = {};

export default FModal;

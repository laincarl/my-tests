import React, { Component } from 'react';
import Modal from './Modal';

export default class Test extends Component {
  state = {
    visible: false,
  };

  handleModalClick = () => {
    // alert("click");
  };

  openModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div onClick={this.handleModalClick}>
        App
        <Modal visible={visible} onClose={this.handleModalClose}>
          <div>content</div>
        </Modal>
        <button onClick={this.openModal}>打开</button>
        <div style={{ height: 1000 }} />
      </div>
    );
  }
}

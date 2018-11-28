import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import './Modal.css';

export default class Modal extends Component {
  state = {
    visible: false,
  };

  static defaultProps = {
    visible: false,
  };

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.visible !== state.visible) {
      if (props.visible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return {
        visible: props.visible,
      };
    }
    return null;
  }

  onClose = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  render() {
    const { visible } = this.state;
    return createPortal(
      <div
        className={classnames('modal-wrapper', {
          'modal-hidden': !visible,
        })}
      >
        <div className="modal-mask" />
        <div className="modal">
          <button onClick={this.onClose}>关闭</button>
          {this.props.children}
        </div>
      </div>,
      document.body,
    );
  }
}

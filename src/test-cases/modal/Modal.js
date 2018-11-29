import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './Modal.less';

export default class Modal extends Component {
  clickPosition = {
    x: null,
    y: null,
  }

  static defaultProps = {
    visible: false,
  };

  componentDidMount() {
    document.documentElement.addEventListener('click', this.saveClickPosition);
  }


  componentWillUnmount() {
    document.documentElement.removeEventListener('click', this.saveClickPosition);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {   
    if (!prevProps.visible && this.props.visible) {
      document.body.style.overflow = 'hidden';
      this.setTransformOrigin();
    } else {
      document.body.style.overflow = '';
    }
    return null;
  }

  /**
   * 保存点击位置，使modal从点击位置展开
   */
  saveClickPosition = (e) => {   
    const { clientX, clientY } = e;
    this.clickPosition = {
      x: clientX,
      y: clientY,
    };

    // 在一定时间后清除，防止不是打开modal的点击影响.
    setTimeout(() => {
      this.clickPosition = {
        x: null,
        y: null,
      };
    }, 100);
  }

  setTransformOrigin = () => {
    if (!this.modal) {
      return;
    }
    const { left, top } = this.modal.getBoundingClientRect();
    const { x, y } = this.clickPosition;
    if (x != undefined && y != undefined) {
      const leftOrigin = `${left - x}px`;
      const topOrigin = `${top - y}px`;
      this.modal.style.transformOrigin = `${leftOrigin} ${topOrigin} 0px`;
    } else {  
      this.modal.style.transformOrigin = '';
    }
  }

  handleClose = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  render() {
    const { visible } = this.props;
    return createPortal(
      <CSSTransition
        appear // visible默认为true时，也触发动画
        in={visible}
        timeout={300}
        classNames="modal"
        unmountOnExit={false}        
      // onExited={this.handleClose}
      >   
        <div
          className="modal-wrapper modal-exit-done"
        >
          <div role="none" className="modal-mask" onClick={this.handleClose} />
          <div
            ref={(modal) => { this.modal = modal; }}
            className="modal"
          >
            <button type="button" onClick={this.handleClose}>关闭</button>
            {this.props.children}           
          </div>
        </div>        
      </CSSTransition>,
      document.body,
    );
  }
}

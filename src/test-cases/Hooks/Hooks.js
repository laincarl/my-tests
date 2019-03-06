import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import './Hooks.css';

const Hooks = () => {
  const [visible, setVisible] = useState(false);
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>   
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> 
      <Button onClick={() => setVisible(true)}>open</Button>   
    </div>
  );
};


export default Hooks;

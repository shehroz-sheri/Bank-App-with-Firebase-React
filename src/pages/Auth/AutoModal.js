import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const AutoModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    //   const showModal = () => {
    //     setIsModalOpen(true);
    //   };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
            <Modal title="Admin Login" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>For Admin login, use following credentials:</p>
                <p><b>Email:</b> abc@example.com</p>
                <p><b>Password:</b> 123456</p>
            </Modal>
        </>
    );
};
export default AutoModal
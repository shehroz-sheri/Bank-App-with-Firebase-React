import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../Config/Firebase'


const onFinish = (values) => {
    sendPasswordResetEmail(auth, values.email)
        .then(() => {
            // Password reset email sent!
            // ..
            message.success("Please check your Email!")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            message.error('Error')
            // ..
        });
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const ForgotPassword = () => {
    return (
        <div className='text-center my-2' style={{ height: '70vh' }}>
            <h3 className='my-4'>Forgot Password</h3>
            <div className='w-75 mx-auto my-5'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 14,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
                <p style={{ fontSize: '.9rem' }}>Back to <Link to={'/auth/login'}>Login Page</Link></p>
            </div>
        </div>
    )
}
export default ForgotPassword;
import React from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
}
    from 'mdb-react-ui-kit';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/AuthContext';
import AutoModal from './AutoModal';


const Login = () => {
    const firebase = useFirebase();
    const navigate = useNavigate()

    const onFinish = async (values) => {
        await firebase.loginUser(values.email, values.password);
    };
    const onFinishFailed = (errorInfo) => {
        console.error(errorInfo);
        message.error('Error! Something went wrong.')
    };
    return (
        <>
            <AutoModal />
            <MDBContainer fluid>

                <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                {/* <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size='lg' />
                    <MDBInput label='Your Name' id='form1' type='text' className='w-100' />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size='lg' />
                    <MDBInput label='Your Email' id='form2' type='email' />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg' />
                    <MDBInput label='Password' id='form3' type='password' />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size='lg' />
                    <MDBInput label='Repeat your password' id='form4' type='password' />
                </div>

                <div className='mb-4'>
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                </div>

                <MDBBtn className='mb-4' size='lg'>Register</MDBBtn> */}
                                <h2 className='mb-5'>Login</h2>
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 7,
                                    }}
                                    wrapperCol={{
                                        span: 18,
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
                                    <Form.Item label="Email" name='email' rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}>
                                        <Input />
                                    </Form.Item>

                                    <Form.Item className=' mb-0'
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 14 }}><Link to={'/auth/forgot-password'} className='login-form-forgot'>Forgot Password?</Link></Form.Item>

                                    <Form.Item
                                        wrapperCol={{
                                            offset: 8,
                                            span: 16,
                                        }}
                                    >
                                        <Button loading={firebase.isLoading} type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                    <p className='text-center'>Don't have an Account? <Link to={'/auth/register'}>Register Now</Link> </p>
                                </Form>

                            </MDBCol>

                            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </>
    );
}

export default Login;
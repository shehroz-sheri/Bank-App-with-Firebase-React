import React, { useEffect, useState } from 'react'
import './Footer.scss'
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useFirebase } from '../../Context/AuthContext';

const Footer = () => {
    const year = new Date().getFullYear();
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);

    const firebase = useFirebase()
    const user = firebase.isLoggedIn;
    const navigate = useNavigate()

    useEffect(() => {
        setClientReady(true);
    }, []);
    const onFinish = async (values) => {
        await firebase.loginUser(values.email, values.password);
        navigate('/')
    };

    return (
        <>
            <footer className="footer bg-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                            <h3 className='text-white'>My Bank App</h3>
                            <p className="mt-4">My Bank has a network of 982 branches in more than 327 cities and more than 1,100 ATMs across the country.</p>
                        </div>

                        <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <h4 className="text-light footer-head">Landing</h4>
                            <ul className="list-unstyled footer-list mt-4">
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Agency</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Software</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Startup</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Business</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Hosting</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Studio</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <h4 className="text-light footer-head">About</h4>
                            <ul className="list-unstyled footer-list mt-4">
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> About us</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Services</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Team</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Terms Policy</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Privacy Policy</Link></li>
                                <li><Link to={'/auth/login'} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Login</Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <h4 className="text-light footer-head">Locations</h4>
                            <ul className="list-unstyled footer-list mt-4">
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Lahore</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Islamabad</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Faisalabad</Link></li>
                                <li><Link to={''} className="text-foot text-decoration-none"><i className="mdi mdi-chevron-right mr-1"></i> Karachi</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            {!user
                ? <div className='bg-footer'>
                    <div className='mx-auto w-50 mt-2 mb-3'>
                        <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
                            <Form.Item
                                name="email"
                                className='my-1'
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                className='my-1'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item className='my-1'>
                                <Button loading={firebase.isLoading} type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                : ''
            }
            <footer className="footer bg-footer footer-bar">
                <div className="container text-center">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="text-sm-left">
                                <p className="mb-0">Copyright &copy; {year}. Design with <i className="mdi mdi-heart text-danger"></i> by <Link className='text-decoration-none text-primary' target='blank' to={'https://www.linkedin.com/in/shehroz-arshad'}>Shehroz Arshad</Link>.</p>
                            </div>
                        </div>

                        <div className="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <ul className="list-unstyled text-sm-right social-icon social mb-0">
                                <li className="list-inline-item"><Link target='blank' to={'https://facebook.com/shehroz.arshad.376'} className="rounded"><i className="mdi mdi-facebook" title="Facebook"></i></Link></li>
                                <li className="list-inline-item"><Link target='blank' to={'https://instagram.com/shehroz.sheri1'} className="rounded"><i className="mdi mdi-instagram" title="Instagram"></i></Link></li>
                                <li className="list-inline-item"><Link target='blank' to={'https://github.com/shehroz-sheri'} className="rounded"><i className="mdi mdi-github" title="Github"></i></Link></li>
                                <li className="list-inline-item"><Link target='blank' to={'https://www.linkedin.com/in/shehroz-arshad'} className="rounded"><i className="mdi mdi-linkedin" title="Linkedin"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
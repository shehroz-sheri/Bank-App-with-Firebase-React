import React, { useEffect, useState } from 'react'
import './Header.scss'
import { Link } from 'react-router-dom'
import { useFirebase } from '../../Context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../Config/Firebase'
import { message } from 'antd'
import { Button, Modal } from 'antd';
import { Tooltip } from 'antd';


const Header = () => {
    const firebase = useFirebase()
    const user = firebase.isLoggedIn

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <header className='position-sticky top-0 z-1'>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid px-lg-5 text-light">
                    <Link to={'/'} className="navbar-brand text-light">My Bank App</Link>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-light"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul> */}
                        <span className="navbar-nav ms-auto me-lg-5">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item mx-lg-2">
                                    <Tooltip className='nav-link' title="Click here to view Cloud Architecture of this Website">
                                        <button className='btn btn-sm' onClick={showModal}>
                                            Cloud Architecture
                                        </button>
                                    </Tooltip>
                                    <Modal title="Cloud Architecture" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                        <img src={require("../../assets/images/cloud-architecture.png")} className='img-fluid' alt="Cloud Architecture" />
                                    </Modal>
                                </li>
                            </ul>


                            {user
                                ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {firebase.user.email !== 'abc@example.com'
                                        ? <>
                                            <li className="nav-item mx-lg-2">
                                                <Link className="nav-link" to={'/services/money-transfer'}>Money Transfer</Link>
                                            </li>
                                            <li className="nav-item mx-lg-2">
                                                <Link className="nav-link" to={'/services/bill-payment'}>Bill Payments</Link>
                                            </li>
                                            <li className="nav-item mx-lg-2">
                                                <Link className="nav-link" to={'/services/money-deposit'}>Money Deposit</Link>
                                            </li>
                                        </>
                                        : ''
                                    }
                                    <li className="nav-item mx-lg-2">
                                        <Link className="nav-link" to={
                                            firebase.user.email === 'abc@example.com' ? '/admin/dashboard' : '/user/dashboard'
                                        }>Dashboard</Link>
                                    </li>
                                </ul>
                                : ''
                            }
                        </span>
                        <div className='ms-auto'>
                            {!user
                                ? <>
                                    <Link to={'/auth/login'} className="btn btn-outline-success btn-sm mx-1" type="submit">Login</Link>
                                    <Link to={'/auth/register'} className="btn btn-outline-info btn-sm mx-1" type="submit">Create New Account</Link>
                                </>
                                : <button onClick={
                                    () => signOut(auth).then(() => message.success('Logout Successful')).catch((error) => message.error("Error! Can't Logged Outlet."))
                                } className="btn btn-outline-danger btn-sm mx-1" type="submit">Logout</button>
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}


export default Header


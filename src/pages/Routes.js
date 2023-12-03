import React from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../pages/Home/Home';
import Register from './Auth/Register';
import Banner from '../components/Header/Banner'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Login from './Auth/Login';
import MoneyTransfer from './Services/MoneyTransfer/MoneyTransfer';
import BillPayment from './Services/BillPayment/BillPayment';
import MoneyDeposit from './Services/MoneyDeposit/MoneyDeposit';
import Page404 from './Page404';
import Dashboard from './User/Dashboard';
import AdminDashboard from './Admin/AdminDashboard';
import ForgotPassword from './Auth/ForgotPassword';
import { useFirebase } from '../Context/AuthContext';
import PrivateRoute from '../components/Routes/PrivateRoute';
import AuthRoutes from '../components/Routes/AuthRoutes';
import AdminRoute from '../components/Routes/AdminRoute';


const Index = () => {
    const { isLoggedIn } = useFirebase()
    const navigate = useNavigate()

    return (
        <>
            {/* <Banner /> */}
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route element={<AuthRoutes />}>
                        <Route path='/auth/' >
                            <Route path='register' element={<Register />} />
                            <Route path='login' element={<Login />} />
                            <Route path='forgot-password' element={<ForgotPassword />} />
                        </Route>
                    </Route>
                    <Route element={<PrivateRoute />}>
                        <Route path='/user/' >
                            <Route path='dashboard' element={<Dashboard />} />
                        </Route>
                        <Route path='/services/' >
                            <Route path='money-transfer' element={<MoneyTransfer />} />
                            <Route path='bill-payment' element={<BillPayment />} />
                            <Route path='money-deposit' element={<MoneyDeposit />} />
                        </Route>
                        <Route element={<AdminRoute />}>
                            <Route path='/admin/' >
                                <Route path='dashboard' element={<AdminDashboard />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path='/*' element={<Page404 />} />
                </Routes>
                {/* <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/auth/' >
                        <Route path='register' element={<Register />} />
                        <Route path='login' element={isLoggedIn ? <Navigate to='/' /> :<Login />} />
                        <Route path='forgot-password' element={<ForgotPassword />} />
                    </Route>
                    <Route path='/user/' >
                        <Route path='dashboard' element={!isLoggedIn ? <Navigate to='/auth/login/' /> : <Dashboard />} />
                    </Route>
                    <Route path='/admin/' >
                        <Route path='dashboard' element={<AdminDashboard />} />
                    </Route>
                    <Route path='/services/' >
                        <Route path='money-transfer' element={!isLoggedIn ? <Navigate to='/auth/login/' /> : <MoneyTransfer />} />
                        <Route path='bill-payment' element={!isLoggedIn ? <Navigate to='/auth/login/' /> : <BillPayment />} />
                        <Route path='money-deposit' element={!isLoggedIn ? <Navigate to='/auth/login/' /> : <MoneyDeposit />} />
                    </Route>
                    <Route path='/*' element={<Page404 />} />
                </Routes> */}
            </main>
            <Footer />
        </>
    )
}

export default Index
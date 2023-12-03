import React from 'react'
import { Divider } from 'antd'
import Profile from '../../components/Admin/Profile'
import UsersBankAccounts from '../../components/Admin/UsersBankAccounts'
import AllTransactions from '../../components/Admin/AllTransactions'

const AdminDashboard = () => {
    return (
        <div className='container text-center'>
            <div>
                <Profile />
            </div>
            <Divider />
            <div>
                <UsersBankAccounts />
            </div>
            <Divider />
            <div>
                <AllTransactions />
            </div>
        </div>
    )
}

export default AdminDashboard
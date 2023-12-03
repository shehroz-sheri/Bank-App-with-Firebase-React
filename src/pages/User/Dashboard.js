import React, { useEffect } from 'react'
import UserDetails from '../../components/User/UserDetails'
import UserDetail from '../../components/User/UserDetail'
import CreateBankAcc from '../../components/User/CreateBankAcc'
import { Divider } from 'antd'
import BankAcc from '../../components/User/BankAcc'
import Transaction from '../../components/User/Transaction'

const Dashboard = () => {
    return (
        <div className='container'>
            <div>
                {/* <UserDetails /> */}
                <UserDetail />
            </div>
            <Divider />
            <div>
                <BankAcc />
                <CreateBankAcc />
            </div>
            <Divider />
            <div>
                <Transaction />
            </div>
        </div>
    )
}

export default Dashboard
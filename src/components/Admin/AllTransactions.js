import React, { useEffect, useState } from 'react'
import { Table, message } from 'antd';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../Config/Firebase'
import { useFirebase } from '../../Context/AuthContext';


const AllTransactions = () => {
    const firebase = useFirebase();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false)
    const [filteredTransactions, setFilteredTransactions] = useState([])
    let transactionIds = []

    const getTransactions = async () => {
        try {
            setLoading(true)
            const querySnapshotAcc = await getDocs(collection(db, "transactions"));
            const data = querySnapshotAcc.docs.map(doc => ({
                key: doc.id,
                ...doc.data()
            }))

            const arr = [...new Map(data.map(v => [v.transactionId, v])).values()]
            arr.map((item) => {
                transactionIds.push(item.transactionId)
            })

            let removedDuplicatedTransactions = [...new Set(transactionIds)]
            setFilteredTransactions(removedDuplicatedTransactions)

            setDataSource(arr)
            setLoading(false)
        } catch (error) {
            message.error('Error! Please try Again.')
            setLoading(false)
        }
    }

    // getTransactions()
    useEffect(() => {
        getTransactions()
    }, [])

    const clearTransactionHistory = async () => {
        try {
            setLoading(true)
            filteredTransactions.map(async (item) => {
                await firebase.deleteDocument('transactions', item)
            })
            setLoading(false)
            message.success('Transaction history has been cleared successfully.')
            getTransactions()
        } catch (error) {
            message.error('Error! Please try again.')
            setLoading(false)
        }
    }

    const columns = [
        {
            title: 'Transaction ID',
            dataIndex: 'transactionId',
            key: 'transactionId',
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'Amount (Rs.)',
            dataIndex: 'amount',
            key: 'amount',
        },
    ];
    return (
        <div className='text-center'>
            <h4 className='mb-4'>Transaction History</h4>
            <div className='text-end'>
                <button className="btn btn-sm btn-outline-danger mx-1 my-2" onClick={clearTransactionHistory}>Clear Transaction History</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <Table className='table table-responsive text-nowrap' dataSource={dataSource} columns={columns} loading={loading} />
            </div>
        </div>
    )
}

export default AllTransactions
import React, { useEffect, useState } from 'react'
import { Table, message } from 'antd';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../Config/Firebase'
import { useFirebase } from '../../Context/AuthContext';


const Transaction = () => {
    const firebase = useFirebase();
    const user = firebase.user;
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false)
    let firstDocs = []
    let secondDocs = []

    let firstTransactions = []
    let secondTransactions = []

    let allTransactionsIds = []
    const [filteredTransactions, setFilteredTransactions] = useState([])

    const getTransactions = async () => {


        const qAcc = query(collection(db, "accounts"), where("createdBy.uid", "==", user.uid));

        const querySnapshotAcc = await getDocs(qAcc);
        // console.log(querySnapshotAcc.docs)
        if (querySnapshotAcc.docs.length > 0) {
            setLoading(true)
            try {
                querySnapshotAcc.forEach(async (doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id);
                    try {
                        const qTra1 = query(collection(db, "transactions"), where("from", "==", doc.id));
                        const qTra2 = query(collection(db, "transactions"), where("to", "==", doc.id));


                        const querySnapshotTra1 = await getDocs(qTra1);
                        const docs1 = querySnapshotTra1.forEach((doc) => {
                            // console.log(doc.id);
                            firstDocs.push(doc.data());
                            firstTransactions.push(doc.id)
                            // console.log('First', doc.data())
                        });

                        const querySnapshotTra2 = await getDocs(qTra2);
                        const docs2 = querySnapshotTra2.forEach((doc) => {
                            // console.log(doc.id);
                            secondTransactions.push(doc.id);
                            secondDocs.push(doc.data())
                            // console.log('Second', doc.data())
                        });

                        const mergedDocuments = [...firstDocs, ...secondDocs];
                        const arr = [...new Map(mergedDocuments.map(v => [v.transactionId, v])).values()]
                        setDataSource(arr)

                        allTransactionsIds = [...firstTransactions, ...secondTransactions]
                        let removedDuplicatedTransactions = [...new Set(allTransactionsIds)]
                        setFilteredTransactions(removedDuplicatedTransactions)

                    } catch (error) {
                        console.error(error)
                        setLoading(false)
                    }
                    setLoading(false)
                });
            } catch (error) {

            }
        }
        setLoading(false)
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
            message.success('Transaction history cleared successfully.')

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

export default Transaction
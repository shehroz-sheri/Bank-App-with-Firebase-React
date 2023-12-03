import React, { useEffect, useState } from 'react'
import { Button, Select, Table, message } from 'antd';
import { Form, Input, Modal } from 'antd';
import { Option } from 'antd/es/mentions';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/Firebase';
import { useFirebase } from '../../Context/AuthContext';
import { AiOutlineReload } from "react-icons/ai";


const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Update Bank Account"
            okText="Update"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="title"
                    label="Account Title"
                >
                    <Input readOnly='true' defaultValue='Shehroz Arshad' />
                </Form.Item>
                <Form.Item label="CNIC Number" name='cnic' rules={[
                    {
                        required: true,
                        max: 13,
                        min: 13,
                        message: 'CNIC must be of 13 digits'
                    },
                ]}>
                    <Input placeholder='Enter your CNIC number' />
                </Form.Item>
                {/* <Form.Item
                    name="accType"
                    label="Account Type"
                    rules={[
                        {
                            required: true,
                            message: 'Please select Account Type!',
                        },
                    ]}
                >
                    <Select placeholder="select account type">
                        <Option value="Current">Current</Option>
                        <Option value="Saving">Saving</Option>
                    </Select>
                </Form.Item> */}
                <Form.Item
                    label='Branch Code'
                    name="branchCode"
                    rules={[
                        {
                            required: true,
                            // type: 'number',
                            max: 4,
                            min: 4,
                            message: 'Branch code must be of 4 digits'
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    );
};

const UsersBankAccounts = () => {
    const firebase = useFirebase()
    const user = firebase.user;

    const [loading, setLoading] = useState(false)
    const [deleteBtnLoading, setDeleteBtnLoading] = useState(false)
    const [accNum, setAccNum] = useState()

    const [dataSource, setDataSource] = useState([]);

    const fetchData = async () => {
        try {
            setLoading(true)

            const querySnapshot = await getDocs(collection(db, "accounts"));
            const data = querySnapshot.docs.map(doc => ({
                key: doc.id,
                ...doc.data(),
            }));

            setDataSource(data);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);


    const deleteAcc = async (accNo) => {
        try {
            setDeleteBtnLoading(true)

            await firebase.deleteDocument('accounts', accNo)
            setDeleteBtnLoading(false)
            message.success('Account has been deleted successfully.')

            fetchData()
        } catch (error) {
            message.error('Error! Please try again.')
            setDeleteBtnLoading(false)
        }
    }

    const columns = [
        {
            title: 'Account No. ',
            dataIndex: 'accNo',
            key: 'accNo',
        },
        {
            title: 'Account Title',
            dataIndex: 'accTitle',
            key: 'accTitle',
        },
        {
            title: 'CNIC',
            dataIndex: 'cnic',
            key: 'cnic',
        },

        {
            title: 'Branch Code',
            dataIndex: 'branchCode',
            key: 'branchCode',
        },
        {
            title: 'Account Type',
            dataIndex: 'accType',
            key: 'accType',
        },
        {
            title: 'Balance (Rs)',
            dataIndex: 'balance',
            key: 'balance',
        },
        {
            title: 'Action',
            dataIndex: 'accNo',
            key: 'key',
            render: (accNo) => {
                return (
                    <div>
                        <Button className='btn btn-sm text-primary'
                            onClick={() => {
                                setOpen(true)
                                setAccNum(accNo)
                            }}
                        >
                            Edit
                        </Button>
                        <Button className='btn btn-sm text-danger' loading={deleteBtnLoading}
                            onClick={() => {
                                deleteAcc(accNo)
                            }}
                        >
                            Delete
                        </Button>
                        <CollectionCreateForm
                            open={open}
                            onCreate={onCreate}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </div>
                )
            }
        },
    ];


    const [open, setOpen] = useState(false);

    const onCreate = async (values) => {
        const updatedValues = {
            branchCode: values.branchCode,
            cnic: values.cnic
        }

        try {
            setOpen(false);
            await firebase.updateDocument('accounts', accNum, updatedValues)

            fetchData()
        } catch (error) {

        }

    };

    return (
        <div>
            <h4 className="mb-4 text-center">All Users Bank Accounts</h4>
            <div className='text-end mx-2'>
                <button className="btn btn-outline-info btn-sm my-2" onClick={() => fetchData()}>Refresh</button>
            </div>
            <div style={{ overflowX: 'auto' }} className='text-center'>
                <Table className='table table-responsive text-nowrap' dataSource={dataSource} columns={columns} loading={loading} />
            </div>
        </div>
    )
}

export default UsersBankAccounts
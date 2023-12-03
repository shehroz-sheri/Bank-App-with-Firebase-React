import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, message } from 'antd';
import { useFirebase } from '../../Context/AuthContext';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/Firebase';



const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [loading, setLoading] = useState(false);
    const firebase = useFirebase()
    const user = firebase.user;

    const [currentUserName, setCurrentUserName] = useState()

    useEffect(() => {
        setLoading(true)
        const getUser = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userDetailsDoc = docSnap.data();
                setCurrentUserName(userDetailsDoc.fullName);

                setLoading(false)
            } else {
                console.log("No such document!");
                setLoading(false)
            }
        }
        getUser()
    }, [])


    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Create a new Bank Account"
            okText="Create"
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

                <Form.Item label="Full Name">
                    {/* <span className="ant-form-text">China</span> */}
                    <input type="text" readOnly className='form-control py-1' value={!loading ? currentUserName : ''} />
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
                <Form.Item
                    label='Bank Account #'
                    name="accNo"
                    rules={[
                        {
                            required: true,
                            // type: 'number',
                            max: 8,
                            min: 6,
                            message: 'Account No. must be between 6 and 8 digits!'
                        },
                    ]}
                >
                    <Input placeholder="Input bank Account Number" />
                </Form.Item>
                <Form.Item
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
                        <Select.Option value="Current">Current</Select.Option>
                        <Select.Option value="Saving">Saving</Select.Option>
                    </Select>
                </Form.Item>
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

const CreateBankAcc = () => {
    const firebase = useFirebase()
    const [currentUserName, setCurrentUserName] = useState()

    useEffect(() => {
        const getUser = async () => {
            const docRef = doc(db, "users", firebase.user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userDetailsDoc = docSnap.data();
                setCurrentUserName(userDetailsDoc.fullName);

            } else {
                console.log("No such document!");
            }
        }
        getUser()
    }, [])

    const [open, setOpen] = useState(false);
    const onCreate = async (values) => {
        if (values.accType === 'Current') {
            const q = query(collection(db, "accounts"), where("createdBy.uid", "==", firebase.user.uid), where("accType", "==", "Current"))
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length == 0) {
                try {
                    setOpen(false);
                    await firebase.handleCreateNewBankAccount(currentUserName, values.accNo, values.accType, values.branchCode, values.cnic)
                } catch (error) {
                    console.error(error)
                }
            } else {
                message.error('Sorry! Current account has already been created before.')
            }
        }
        if (values.accType === 'Saving') {
            const q = query(collection(db, "accounts"), where("createdBy.uid", "==", firebase.user.uid), where("accType", "==", "Saving"))
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length == 0) {
                try {
                    setOpen(false);
                    await firebase.handleCreateNewBankAccount(currentUserName, values.accNo, values.accType, values.branchCode, values.cnic)
                } catch (error) {
                    console.error(error)
                }
            } else {
                message.error('Sorry! Saving account has already been created before.')
            }
        }

        // try {
        //     await firebase.handleCreateNewBankAccount(currentUserName, values.accNo, values.accType, values.branchCode, values.cnic)
        //     setOpen(false);
        // } catch (error) {
        //     console.error(error)
        // }
    }

    return (
        <div className='my-3 text-center'>
            <p>If you want to open a new Bank Account,

                <button className='btn text-primary text-decoration-underline btn-sm py-0'
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    Click Here
                </button>
                <CollectionCreateForm
                    open={open}
                    onCreate={onCreate}
                    onCancel={() => {
                        setOpen(false);
                    }}
                />
            </p>
        </div>
    );
};
export default CreateBankAcc;
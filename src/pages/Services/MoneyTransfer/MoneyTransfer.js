import React, { useEffect, useState } from 'react';
import { Button, Cascader, Form, Input, Modal, Select, message } from 'antd';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from '../../../Config/Firebase'
import { useFirebase } from '../../../Context/AuthContext';


const { Option } = Select;
const PriceInput = ({ value = {}, onChange }) => {
    const [number, setNumber] = useState(0);
    const [currency, setCurrency] = useState('pkr');
    const triggerChange = (changedValue) => {
        onChange?.({
            number,
            currency,
            ...value,
            ...changedValue,
        });
    };
    const onNumberChange = (e) => {
        const newNumber = parseInt(e.target.value || '0', 10);
        if (Number.isNaN(number)) {
            return;
        }
        if (!('number' in value)) {
            setNumber(newNumber);
        }
        triggerChange({
            number: newNumber,
        });
    };
    const onCurrencyChange = (newCurrency) => {
        if (!('currency' in value)) {
            setCurrency(newCurrency);
        }
        triggerChange({
            currency: newCurrency,
        });
    };

    return (
        <span>
            <Input
                type="text"
                value={value.number || number}
                onChange={onNumberChange}
                style={{
                    width: 100,
                }}
            />
            <Select
                value={value.currency || currency}
                style={{
                    width: 80,
                    margin: '0 8px',
                }}
                onChange={onCurrencyChange}
            >
                <Option value="pkr">Rs</Option>
                {/* <Option value="dollar">Dollar</Option> */}
            </Select>
        </span>
    );
};
const MoneyTransfer = () => {
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true);
        if (values.paidAccount[1] == values.receiverAccountNo) {
            message.error("Error! Sender and Receiver account numbers can't be same.")
        } else {
            const docRef = doc(db, "accounts", values.paidAccount[1]);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                if (docSnap.data().balance < values.amount.number || !docSnap.data().balance) {
                    message.error('Error! You do not have enough balance.')
                } else {
                    const handleOk = async () => {
                        try {
                            // Sender account deduction
                            const docRef = doc(db, "accounts", values.paidAccount[1]);
                            const senDocSnap = await getDoc(docRef);
                            const senderRef = doc(db, 'accounts', values.paidAccount[1]);
                            await setDoc(senderRef, { balance: senDocSnap.data().balance - values.amount.number }, { merge: true });

                            // Receiver Account Increment
                            const cityRef = doc(db, 'accounts', values.receiverAccountNo);
                            const docSnap = await getDoc(cityRef);

                            if (docSnap.exists()) {
                                if (docSnap.data().balance) {
                                    try {
                                        setDoc(cityRef, { balance: docSnap.data().balance + values.amount.number }, { merge: true });
                                        await firebase.handleAddTransaction(values.paidAccount[1], values.receiverAccountNo, 'Money Transfer', values.amount.number)
                                        message.success(`Rs. ${values.amount.number} has been transferred to receiver account successfully!`)
                                    } catch (error) {
                                        console.error(error)
                                    }
                                }
                                else {
                                    try {
                                        setDoc(cityRef, { balance: values.amount.number }, { merge: true });
                                        await firebase.handleAddTransaction(values.paidAccount[1], values.receiverAccountNo, 'Money Transfer', values.amount.number)
                                        message.success(`Rs. ${values.amount.number} has been transferred to receiver account successfully!`)
                                    } catch (error) {
                                        console.error(error)
                                    }
                                }
                            } else {
                                message.error("Error! Account can't be found.")
                            }
                        } catch (error) {
                            console.error(error)
                        }
                        setOpen(false);
                    };
                    const newModalConfirm = async () => {
                        const cityRef = doc(db, 'accounts', values.receiverAccountNo);
                        const docSnap = await getDoc(cityRef);
                        {
                            Modal.confirm({
                                title: 'Confirm Transaction',
                                onOk: handleOk,
                                onCancel: handleCancel,
                                content: `Are you sure you want to send Rs. ${values.amount.number} to "${docSnap.data().accTitle}" against Account number: ${values.receiverAccountNo}?`,
                                footer: (_, { OkBtn, CancelBtn }) => (
                                    <>
                                        <CancelBtn />
                                        <OkBtn />
                                    </>
                                ),
                            });
                        }
                    }
                    newModalConfirm()
                }
            } else {
                // docSnap.data() will be undefined in this case
                message.error("No such Account!");
            }
        }
        setLoading(false)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const checkPrice = (_, value) => {
        if (value.number > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Amount must be greater than zero!'));
    };
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const [currentAccNo, setCurrentAccNo] = useState()
    const [savingAccNo, setSavingAccNo] = useState()

    const firebase = useFirebase()
    const user = firebase.user

    const getAccNo = async () => {
        try {
            const q = query(collection(db, "accounts"), where("createdBy.uid", "==", user.uid), where('accType', '==', 'Current'));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setCurrentAccNo(doc.id)
            });

            const qu = query(collection(db, "accounts"), where("createdBy.uid", "==", user.uid), where('accType', '==', 'Saving'));

            const snapshot = await getDocs(qu);
            snapshot.forEach((doc) => {
                setSavingAccNo(doc.id)
            });

        } catch (error) {

        }

    }

    if (user) {
        getAccNo()
    }

    const [allAccounts, setAllAccounts] = useState([])
    const getAllAccounts = async () => {
        let array = []
        const querySnapshot = await getDocs(collection(db, "accounts"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            array.push(doc.id)
            setAllAccounts(array)
        });
    }
    useEffect(() => {
        getAllAccounts()
    }, [])


    return (
        <div className='text-center mb-5 pb-5'>
            <h2 className='mt-3 mb-5'>Money Transfer</h2>
            <div className='mx-auto w-75'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 800,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item label="Choose Account :" rules={[{ required: true, message: 'This field is required!' }]} name='paidAccount'>
                        <Cascader
                            options={[
                                {
                                    value: 'Current',
                                    label: 'Current',
                                    children: [
                                        {
                                            value: currentAccNo,
                                            label: currentAccNo,
                                        },
                                    ],
                                },
                                {
                                    value: 'Saving',
                                    label: 'Saving',
                                    children: [
                                        {
                                            value: savingAccNo,
                                            label: savingAccNo,
                                        },
                                    ],
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="receiverAccountNo"
                        label="Receiver Account #"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter receiver account number!',
                            },
                        ]}
                    >
                        <Select placeholder="Enter receiver account numbers">
                            {allAccounts.map((option, i) => (
                                <Option key={i} value={option}>
                                    {option}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Receiver Email" name='email' rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            message: 'Please input receiver E-mail!',
                        },
                    ]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="amount"
                        label="Amount"
                        // validateTrigger="onBlur"
                        rules={[
                            {
                                required: true,
                                validator: checkPrice,
                            },
                        ]}
                    >
                        <PriceInput max={3} />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 2,
                            span: 20,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div >
    );
};
export default MoneyTransfer;
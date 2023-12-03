import React, { useEffect, useState } from 'react';
import { Button, Cascader, DatePicker, Divider, Form, Input, Select, message } from 'antd';
import { useFirebase } from '../../../Context/AuthContext';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../../Config/Firebase';


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
const MoneyDeposit = () => {
    const [loading, setLoading] = useState(false);
    const firebase = useFirebase()
    const user = firebase.user;

    const onFinish = async (values) => {
        setLoading(true)
        try {
            const cityRef = doc(db, 'accounts', values.accountNo[1]);
            const docSnap = await getDoc(cityRef);

            if (docSnap.exists()) {
                if (docSnap.data().balance) {
                    try {
                        setDoc(cityRef, { balance: docSnap.data().balance + values.amount.number }, { merge: true });
                        await firebase.handleAddTransaction(values.card, values.accountNo[1], 'Money Deposit', values.amount.number)
                        message.success(`Rs. ${values.amount.number} has been added to your account successfully!`)
                    } catch (error) {
                        console.error(error)
                        message.error("Error! Money can't be added.")
                    }
                }
                else {
                    try {
                        setDoc(cityRef, { balance: values.amount.number }, { merge: true });
                        await firebase.handleAddTransaction(values.card, values.accountNo[1], 'Money Deposit', values.amount.number)
                        message.success(`Rs. ${values.amount.number} has been added to your account successfully!`)
                    } catch (error) {
                        console.error(error)
                        message.error("Error! Money can't be added.")
                    }
                }
            } else {
                message.error("Error! Account can't be found.")
            }
        } catch (error) {
            console.error(error)
            message.error('Error! Something went wrong, or may be account was not found.')
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
        return Promise.reject(new Error('Price must be greater than zero!'));
    };


    const [currentAccNo, setCurrentAccNo] = useState()
    const [savingAccNo, setSavingAccNo] = useState()

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

    // useEffect(() => getAccNo(), [user])
    if (user) {
        getAccNo()
    }

    return (
        <div className='text-center mb-5 pb-5'>
            <h2 className='mt-3 mb-5'>Money Deposit</h2>
            <div className='w-75 mx-auto'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
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
                    <Form.Item label="Account # " rules={[{ required: true, message: 'This field is required!' }]} name='accountNo'>
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
                    <Form.Item label="Email" name='email' rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            message: 'Please input your E-mail!',
                        },
                    ]}>
                        <Input readOnly={true} defaultValue={user ? user.email : ''} />
                    </Form.Item>


                    <Divider />
                    <Form.Item label="Card Number" name='card' rules={[
                        {
                            required: true,
                            max: 16,
                            min: 16,
                            message: 'Card No. must be of 16 digits'
                        },
                    ]}>
                        <Input placeholder='Enter your card number' />
                    </Form.Item>
                    <Form.Item
                        label="Card Details"
                        style={{
                            marginBottom: 0,
                        }}
                    >
                        <Form.Item
                            name="date"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                            }}
                        >
                            <DatePicker className='w-100' placeholder="Input card expiry date" />
                        </Form.Item>
                        <Form.Item
                            name="cvv"
                            rules={[
                                {
                                    required: true,
                                    // type: 'number',
                                    max: 3,
                                    min: 3,
                                    message: 'cvv must be of 3 digits'
                                },
                            ]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '0 8px',
                            }}
                        >
                            <Input placeholder="Input card cvv / cvs" />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[
                            {
                                required: true,
                                validator: checkPrice,
                            },
                        ]}
                    >
                        <PriceInput />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default MoneyDeposit;
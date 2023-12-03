import React, { useEffect, useState } from 'react';
import { Button, Cascader, Form, Input, Modal, Select, message } from 'antd';
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
const BillPayment = () => {
    const firebase = useFirebase()
    const user = firebase.user;

    // const userBalance = async () => {
    //     setLoading(true)
    //     const cityRef = doc(db, 'accounts', values.accountNo[1]);
    //     const docSnap = await getDoc(cityRef);

    //     if (docSnap.exists()) {
    //         try {
    //             setDoc(cityRef, { balance: docSnap.data().balance + values.amount.number }, { merge: true });
    //             message.success(`Rs. ${values.amount.number} has been added to your account successfully!`)
    //         } catch (error) {
    //             console.error(error)
    //             message.error("Error! Money can't be added.")
    //         }
    //     } else {
    //         message.error("Error! Account can't be found.")
    //     }
    //     setLoading(false)
    // };
    // const generateRandomNumber = () => {
    //     const min = Math.ceil(1);
    //     const max = Math.floor(maxNumber);
    //     const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    //     setRandomNumber(randomNum);
    //   };


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

    if (user) {
        getAccNo()
    }


    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true)
        try {
            const cityRef = doc(db, 'accounts', values.paidAccount[1]);
            const docSnap = await getDoc(cityRef);

            if (docSnap.exists()) {
                if (docSnap.data().balance) {
                    const min = Math.ceil(1);
                    const max = Math.floor(docSnap.data().balance);
                    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

                    const handleOk = async () => {
                        try {
                            const cityRef = doc(db, 'accounts', values.paidAccount[1]);
                            await setDoc(cityRef, { balance: docSnap.data().balance - randomNum }, { merge: true });
                            await firebase.handleAddTransaction(values.paidAccount[1], values.billCompany[1], 'Bill Payment', randomNum)
                            message.success('Bill has been paid successfully!')
                        } catch (error) {
                            console.error(error)
                            message.error("Error! Bill can't be paid!")
                        }

                        setOpen(false);
                    };

                    const newModalConfirm = () => {
                        {
                            Modal.confirm({
                                title: 'Confirm Transaction',
                                onOk: handleOk,
                                onCancel: handleCancel,
                                content: `Are you sure you want to pay Rs. ${randomNum} bill against Consumer id: ${values.billConsumerNo}`,
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



                } else {
                    message.error('Error! No balance in your account.')
                }
            }
        } catch (error) {
            message.error('Error! Account was not found.')
        }
        setLoading(false)

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };


    return (
        <div className='text-center mb-5 pb-5'>
            <h2 className='mt-3 mb-5'>Bill Payment</h2>
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
                    <Form.Item label="Bill Company" rules={[{ required: true, message: 'This field is required!' }]} name='billCompany'>
                        <Cascader
                            options={[
                                {
                                    value: 'electricity',
                                    label: 'Electricity',
                                    children: [
                                        {
                                            value: 'K-Electric',
                                            label: 'K-Electric',
                                        },
                                        {
                                            value: 'LESCO',
                                            label: 'LESCO',
                                        },
                                        {
                                            value: 'FESCO',
                                            label: 'FESCO',
                                        },
                                        {
                                            value: 'HESCO',
                                            label: 'HESCO',
                                        },
                                        {
                                            value: 'MEPCO',
                                            label: 'MEPCO',
                                        },
                                    ],
                                },
                                {
                                    value: 'gas',
                                    label: 'Gas',
                                    children: [
                                        {
                                            value: 'SNGPL',
                                            label: 'SNGPL',
                                        },
                                        {
                                            value: 'SSGPL',
                                            label: 'SSGPL',
                                        },
                                    ],
                                },
                                {
                                    value: 'telephone',
                                    label: 'Telephone',
                                    children: [
                                        {
                                            value: 'PTCL',
                                            label: 'PTCL',
                                        },
                                    ],
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label="Bill Consumer #" name='billConsumerNo' rules={[
                        {
                            required: true,
                            min: 8,
                            max: 8,
                            message: 'Consumer number must be of 8 digits!'
                        },
                    ]}>
                        <Input />
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default BillPayment;
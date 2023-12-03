import React, { useState, useEffect } from 'react'
import { DatePicker, Select, Table, Form, Input, Modal, Button, Cascader } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useFirebase } from '../../Context/AuthContext'
import { db } from '../../Config/Firebase'
import { doc, getDoc } from 'firebase/firestore';


const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Edit User Information"
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
                initialValues={{}}
            >
                <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input this field!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: 'Please select your DOB!' }]}>
                    <DatePicker className='w-100' />
                </Form.Item>
                <Form.Item label="Gender" name='gender' rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="State" name='state' rules={[{ required: true }]}>
                    <Cascader
                        options={[
                            {
                                value: 'Pakistan',
                                label: 'Pakistan',
                                children: [
                                    {
                                        value: 'Punjab',
                                        label: 'Punjab',
                                    },
                                    {
                                        value: 'Sindh',
                                        label: 'Sindh',
                                    },
                                    {
                                        value: 'KPK',
                                        label: 'KPK',
                                    },
                                    {
                                        value: 'Balochistan',
                                        label: 'Balochistan',
                                    },
                                    {
                                        value: 'AJK',
                                        label: 'AJK',
                                    },
                                    {
                                        value: 'Islamabad',
                                        label: 'Islamabad',
                                    },
                                ],
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="City" name='city' rules={[
                    {
                        type: 'string',
                    },
                ]}>
                    <Input placeholder='Enter your city' />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const Profile = () => {
    const firebase = useFirebase()
    const user = firebase.user;

    const [loading, setLoading] = useState(false);
    const [currentUserDoc, setCurrentUserDoc] = useState()
    const [dob, setDob] = useState()

    const getUser = async () => {
        setLoading(true)
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userDetailsDoc = docSnap.data();
            setDob(userDetailsDoc.dob)
            setCurrentUserDoc(userDetailsDoc)
            setLoading(false)
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const [open, setOpen] = useState(false);

    const onCreate = async (values) => {
        const updatedProfile = {
            fullName: values.name,
            dob: values.dob.toString(),
            gender: values.gender,
            address: values.state[0] + ' ' + values.state[1] + ' ' + values.city
        }

        try {
            setOpen(false)
            await firebase.updateDocument('users', user.uid, updatedProfile)
            getUser()
        } catch (error) {

        }
    };

    const [age, setAge] = useState(null);
    const calculateAge = () => {
        if (dob) {
            const birthDate = new Date(dob);
            const currentDate = new Date();

            // Calculate the difference in years
            const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();

            // Check if the birthday has occurred this year
            if (
                currentDate.getMonth() < birthDate.getMonth() ||
                (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
            ) {
                setAge(ageDifference - 1); // Subtract 1 year if the birthday hasn't occurred yet
            } else {
                setAge(ageDifference);
            }
        }
    }
    useEffect(() => calculateAge(), [currentUserDoc])

    const dataSource = [
        {
            key: '1',
            name: !currentUserDoc ? '' : currentUserDoc.fullName,
            email: !currentUserDoc ? '' : currentUserDoc.createdBy.email,
            age: age + ' years',
            gender: !currentUserDoc ? '' : currentUserDoc.gender,
            address: !currentUserDoc ? '' : currentUserDoc.address,
            action: 'edit'
        },
    ];

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: () => {
                return (
                    <div>
                        <Button className='btn btn-sm text-primary'
                            onClick={() => {
                                setOpen(true)
                            }}
                        >
                            Edit
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
    return (
        <>
            <h4 className='my-4 text-center'>Your Profile</h4>
            <div className='text-center'>
                <div style={{ overflowX: 'auto' }}>
                    <Table className='table table-responsive text-nowrap' dataSource={dataSource} columns={columns} loading={loading} />
                </div>
            </div>
        </>
    )
}

export default Profile
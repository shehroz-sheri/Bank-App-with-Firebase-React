import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Cascader, DatePicker, Form, Input, Select, Upload, message, } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/AuthContext';
import { serverTimestamp } from 'firebase/firestore';


const { Option } = Select;

const normFile = (e) => {
    console.log(e)
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const Register = () => {
    const firebase = useFirebase();
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);
    React.useEffect(() => {
        form
            .validateFields({
                validateOnly: true,
            })
            .then(
                () => {
                    setSubmittable(true);
                },
                () => {
                    setSubmittable(false);
                },
            );
    }, [values]);

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="92">+92</Option>
            </Select>
        </Form.Item>
    );

    const onFinish = async (values) => {
        console.log(values.datePicker.toString())
        try {
            const userInfo = {
                fullName: values.firstName + ' ' + values.lastName,
                gender: values.gender,
                phone: values.prefix + values.phone,
                address: values.state[0] + ' ' + values.state[1] + ' ' + values.city,
                dob: values.datePicker.toString(),
                dateCreated: serverTimestamp()
            }
            await firebase.createUser(values.email, values.password, 'users', userInfo)
            navigate('/');
        } catch (error) {
            console.error(error);
            message.error('Error! Something went wrong.')
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='text-center'>
            <h2 className='mt-3 mb-5'>Create New Account</h2>
            <div className="mx-auto w-75 my-5">
                <Form
                    form={form}
                    name="validateOnly"
                    labelCol={{
                        span: 6,
                    }}
                    initialValues={{
                        prefix: '92',
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 800,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    scrollToFirstError
                >
                    <Form.Item label="First Name" name="firstName" rules={[
                        {
                            required: true,
                            type: 'string',
                            message: 'Please input your first name!',
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Last Name" name='lastName' rules={[
                        {
                            required: true,
                            type: 'string',
                            message: 'Please input your last name!',
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true, message: 'Please select your gender!'
                            },
                        ]}
                    >
                        <Select>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('gender') === 'other' ? (
                                <Form.Item
                                    name="customizeGender"
                                    label="Customize Gender"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your gender!'
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>
                    <Form.Item label="Date of Birth" name='datePicker' rules={[{ required: true, message: 'Pleas enter your DOB!' }]}>
                        <DatePicker className='w-100' />
                    </Form.Item>
                    <Form.Item label="Email" name='email' rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
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
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input
                            addonBefore={prefixSelector}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    {/* <Form.Item label='Profile Pic' name={'profilePic'}>
                        <Upload customRequest={(info)=> setInfo(info.file)}>
                            <Button>Upload DP</Button>
                        </Upload>

                    </Form.Item> */}

                    <Form.Item label="Profile Picture" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action={"http://localhost:3000/auth/register"} listType="picture-card" accept='.png,.jpg,.jpeg,.doc'>
                            <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type='primary' htmlType='submit' className='' loading={firebase.isLoading} disabled={!submittable} >
                                Register
                            </Button>
                            <Button htmlType="reset">Reset</Button>
                        </Space>
                    </Form.Item>
                    <p className='text-center'>Already have an Account? <Link to={'/auth/login'}>Login Here</Link> </p>
                </Form>
            </div>
        </div>
    );
};
export default Register;
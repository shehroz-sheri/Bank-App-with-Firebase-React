import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
const originData = [];
for (let i = 0; i < 1; i++) {
    originData.push({
        key: i.toString(),
        name: `Edward ${i}`,
        email: 'abc@gmail.com',
        gender: 'Male',
        address: `London Park no. ${i}`,
    });
}
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const UserDetails = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            email: '',
            gender: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            width: '18%',
            editable: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '30%',
            editable: false,
            render: () => {
                return (
                    <span>abc@ymail.com</span>
                )
            }
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            width: '8%',
            editable: true,
            render: () => {
                return (
                    <span>Male</span>
                )
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            width: '40%',
            editable: true,
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>
            <h4 className='my-4'>Your Profile</h4>
            <div style={{ overflowX: 'auto' }}>
                <Form form={form} component={false}>
                    <Table className='table table-responsive text-nowrap'
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                    />
                </Form>
            </div>
        </>
    );
};
export default UserDetails;
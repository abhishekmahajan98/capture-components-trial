import React, { useState } from 'react';
import { Table, Input, Button, message } from 'antd';

const Page4 = () => {
  const [data, setData] = useState([
    { key: 1, name: 'John Brown', age: 32, address: '', phone: '' },
    { key: 2, name: 'Jim Green', age: 42, address: '', phone: '' },
    { key: 3, name: 'Joe Black', age: 32, address: '', phone: '' },
  ]);

  const handleInputChange = (key, dataIndex, value) => {
    const newData = [...data];
    const target = newData.find(item => item.key === key);
    if (target) {
      target[dataIndex] = value;
      setData(newData);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => (
        <Input
          value={text}
          onChange={e => handleInputChange(record.key, 'address', e.target.value)}
        />
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => (
        <Input
          value={text}
          onChange={e => handleInputChange(record.key, 'phone', e.target.value)}
        />
      ),
    },
  ];

  const handleSubmit = () => {
    const hasEmptyInputs = data.some(item => !item.address || !item.phone);
    if (hasEmptyInputs) {
      message.error('Please fill in all input fields');
    } else {
      message.success('Form submitted successfully');
      console.log('Submitted data:', data);
    }
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Button onClick={handleSubmit} type="primary" style={{ marginTop: 16 }}>
        Submit
      </Button>
    </div>
  );
};

export default Page4;
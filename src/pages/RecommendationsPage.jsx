import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Modal, Form, Select, Table, Input, Space } from 'antd';

const { Option } = Select;

const Page1 = () => {
  const columnDefs = [
    { field: 'col1' },
    { field: 'col2' },
    { field: 'col3' },
    { field: 'col4' },
    { field: 'col5' },
    { field: 'col6' },
    { field: 'col7' },
    { field: 'col8' },
    { field: 'col9' },
    { field: 'col10' },
    { field: 'col11' },
    { field: 'col12' },
    { field: 'col13' },
    { field: 'col14' },
    { field: 'col15' }
  ];
  
  const rowData = [];
  for (let i = 0; i < 25; i++) {
    rowData.push({
      col1: `Row ${i + 1}, Col 1`,
      col2: `Row ${i + 1}, Col 2`,
      col3: `Row ${i + 1}, Col 3`,
      col4: `Row ${i + 1}, Col 4`,
      col5: `Row ${i + 1}, Col 5`,
      col6: `Row ${i + 1}, Col 6`,
      col7: `Row ${i + 1}, Col 7`,
      col8: `Row ${i + 1}, Col 8`,
      col9: `Row ${i + 1}, Col 9`,
      col10: `Row ${i + 1}, Col 10`,
      col11: `Row ${i + 1}, Col 11`,
      col12: `Row ${i + 1}, Col 12`,
      col13: `Row ${i + 1}, Col 13`,
      col14: `Row ${i + 1}, Col 14`,
      col15: `Row ${i + 1}, Col 15`
    });
  }

  const [isAddRecModalOpen, setAddRecIsModalOpen] = useState(false);
  const [isWriteUpModalOpen, setWriteUpIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  const showAddRecModal = () => {
    setAddRecIsModalOpen(true);
  };

  const showWriteUpModal = () => {
    setWriteUpIsModalOpen(true);
  };

  const validateTableData = () => {
    if (tableData.length === 0) {
      return 'At least one row is required.';
    }
    for (let i = 0; i < tableData.length; i++) {
      const row = tableData[i];
      if (!row.input1 || !row.input2 || !row.select1 || !row.select2 || !row.select3) {
        return `All fields in row ${i + 1} are required.`;
      }
    }
    return null;
  };

  const handleAddRecOk = () => {
    const tableError = validateTableData();
    if (tableError) {
      alert(tableError);
      return;
    }

    form.validateFields().then((values) => {
      const formData = {
        ...values,
        tableData: tableData
      };
      console.log('Form data:', formData);
      console.table(formData.tableData);
      console.log('Stringified form data:', JSON.stringify(formData, null, 2));
      
      alert(JSON.stringify(formData, null, 2));
      
      setSubmittedData(formData);

      setAddRecIsModalOpen(false);
      form.resetFields();
      setTableData([]);
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleAddRecCancel = () => {
    setAddRecIsModalOpen(false);
    form.resetFields();
    setTableData([]);
  };

  const handleWriteUpOk = () => {
    setWriteUpIsModalOpen(false);
  };

  const handleWriteUpCancel = () => {
    setWriteUpIsModalOpen(false);
  };



  const handleInputChange = (key, dataIndex, value) => {
    const newData = [...tableData];
    const target = newData.find(item => item.key === key);
    if (target) {
      target[dataIndex] = value;
      setTableData(newData);
    }
  };

  const handleDelete = (key) => {
    const newData = tableData.filter(item => item.key !== key);
    setTableData(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: Date.now().toString(),
      input1: '',
      input2: '',
      select1: '',
      select2: '',
      select3: '',
    };
    setTableData([...tableData, newData]);
  };

  const columns = [
    {
      title: 'Input 1',
      dataIndex: 'input1',
      key: 'input1',
      render: (_, record) => (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={record.input1 ? '' : 'error'}
          help={record.input1 ? '' : 'Required'}
        >
          <Input 
            value={record.input1} 
            onChange={(e) => handleInputChange(record.key, 'input1', e.target.value)} 
          />
        </Form.Item>
      ),
    },
    {
      title: 'Input 2',
      dataIndex: 'input2',
      key: 'input2',
      render: (_, record) => (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={record.input2 ? '' : 'error'}
          help={record.input2 ? '' : 'Required'}
        >
          <Input 
            value={record.input2} 
            onChange={(e) => handleInputChange(record.key, 'input2', e.target.value)} 
          />
        </Form.Item>
      ),
    },
    {
      title: 'Select 1',
      dataIndex: 'select1',
      key: 'select1',
      render: (_, record) => (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={record.select1 ? '' : 'error'}
          help={record.select1 ? '' : 'Required'}
        >
          <Select 
            style={{ width: 120 }} 
            value={record.select1} 
            onChange={(value) => handleInputChange(record.key, 'select1', value)}
          >
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: 'Select 2',
      dataIndex: 'select2',
      key: 'select2',
      render: (_, record) => (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={record.select2 ? '' : 'error'}
          help={record.select2 ? '' : 'Required'}
        >
          <Select 
            style={{ width: 120 }} 
            value={record.select2} 
            onChange={(value) => handleInputChange(record.key, 'select2', value)}
          >
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: 'Select 3',
      dataIndex: 'select3',
      key: 'select3',
      render: (_, record) => (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={record.select3 ? '' : 'error'}
          help={record.select3 ? '' : 'Required'}
        >
          <Select 
            style={{ width: 120 }} 
            value={record.select3} 
            onChange={(value) => handleInputChange(record.key, 'select3', value)}
          >
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.key)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>Recommendations</h1>
      <div className='rec-page-buttons-div'>
        <div className='rec-page-button'>
          <Button type="primary" onClick={showAddRecModal}>
            New Rec +
          </Button>
          <Modal 
            title="Add Recommendations" 
            open={isAddRecModalOpen} 
            onOk={handleAddRecOk} 
            onCancel={handleAddRecCancel}
            width={1000}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="company"
                label="Select Company"
                rules={[{ required: true, message: 'Please select a company' }]}
              >
                <Select style={{ width: 200 }}>
                  <Option value="company1">Company 1</Option>
                  <Option value="company2">Company 2</Option>
                  <Option value="company3">Company 3</Option>
                </Select>
              </Form.Item>

              <Form.Item name="tableData" label="Table Data">
                <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                  Add a row
                </Button>
                <Table
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        <div className='rec-page-button'>
          <Button type="primary" onClick={showWriteUpModal}>
            Write-up +
          </Button>
          <Modal 
            title="Submit Write-up" 
            open={isWriteUpModalOpen} 
            onOk={handleWriteUpOk} 
            onCancel={handleWriteUpCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      </div>
      
      <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
        />
      </div>

      {submittedData && (
        <div>
          <h2>Submitted Data:</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Page1;
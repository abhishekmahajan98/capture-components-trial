import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Modal, Form, Select, Table, Input, Space, DatePicker } from 'antd';
import { ColDef } from 'ag-grid-community';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;

interface TableDataItem {
  key: string;
  name: string;
  association: string;
  title: string;
  comments: string;
  lastEmployed: moment.Moment | null;
  meetingDate: moment.Moment | null;
}

interface FormData {
  company: string;
  tableData: TableDataItem[];
}

const Page1: React.FC = () => {
  const columnDefs: ColDef[] = [
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
  
  const rowData: Record<string, string>[] = [];
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

  const [isAddRecModalOpen, setAddRecIsModalOpen] = useState<boolean>(false);
  const [isWriteUpModalOpen, setWriteUpIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm<FormData>();
  const [tableData, setTableData] = useState<TableDataItem[]>([]);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const showAddRecModal = (): void => {
    setAddRecIsModalOpen(true);
  };

  const showWriteUpModal = (): void => {
    setWriteUpIsModalOpen(true);
  };

  const validateTableData = (): string | null => {
    if (tableData.length === 0) {
      return 'At least one row is required.';
    }
    for (let i = 0; i < tableData.length; i++) {
      const row = tableData[i];
      if (!row.name || !row.association || !row.title || !row.comments || !row.meetingDate) {
        return `All fields except Last Employed in row ${i + 1} are required.`;
      }
    }
    return null;
  };

  const handleAddRecOk = (): void => {
    const tableError = validateTableData();
    if (tableError) {
      alert(tableError);
      return;
    }

    form.validateFields().then((values) => {
      const formData: FormData = {
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

  const handleAddRecCancel = (): void => {
    setAddRecIsModalOpen(false);
    form.resetFields();
    setTableData([]);
  };

  const handleWriteUpOk = (): void => {
    setWriteUpIsModalOpen(false);
  };

  const handleWriteUpCancel = (): void => {
    setWriteUpIsModalOpen(false);
  };

  const handleInputChange = (key: string, dataIndex: keyof TableDataItem, value: string | moment.Moment | null): void => {
    const newData = [...tableData];
    const target = newData.find(item => item.key === key);
    if (target) {
      target[dataIndex] = value as any;
      setTableData(newData);
    }
  };

  const handleDelete = (key: string): void => {
    const newData = tableData.filter(item => item.key !== key);
    setTableData(newData);
  };

  const handleAdd = (): void => {
    const newData: TableDataItem = {
      key: Date.now().toString(),
      name: '',
      association: '',
      title: '',
      comments: '',
      lastEmployed: null,
      meetingDate: null,
    };
    setTableData([...tableData, newData]);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: TableDataItem) => (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={record.name ? '' : 'error'}
          help={record.name ? '' : 'Required'}
        >
          <Input 
            value={record.name} 
            onChange={(e) => handleInputChange(record.key, 'name', e.target.value)} 
          />
        </Form.Item>
      ),
    },
    {
      title: 'Association',
      dataIndex: 'association',
      key: 'association',
      render: (_: any, record: TableDataItem) => (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={record.association ? '' : 'error'}
          help={record.association ? '' : 'Required'}
        >
          <Input 
            value={record.association} 
            onChange={(e) => handleInputChange(record.key, 'association', e.target.value)} 
          />
        </Form.Item>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_: any, record: TableDataItem) => (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={record.title ? '' : 'error'}
          help={record.title ? '' : 'Required'}
        >
          <Input 
            value={record.title} 
            onChange={(e) => handleInputChange(record.key, 'title', e.target.value)} 
          />
        </Form.Item>
      ),
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      render: (_: any, record: TableDataItem) => (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={record.comments ? '' : 'error'}
          help={record.comments ? '' : 'Required'}
        >
          <Input 
            value={record.comments} 
            onChange={(e) => handleInputChange(record.key, 'comments', e.target.value)} 
          />
        </Form.Item>
      ),
    },
    {
      title: 'Last Employed',
      dataIndex: 'lastEmployed',
      key: 'lastEmployed',
      render: (_: any, record: TableDataItem) => (
        <Form.Item style={{ margin: 0 }}>
          <DatePicker 
            value={record.lastEmployed} 
            onChange={(date) => handleInputChange(record.key, 'lastEmployed', date)} 
          />
        </Form.Item>
      ),
    },
    {
      title: 'Meeting Date',
      dataIndex: 'meetingDate',
      key: 'meetingDate',
      render: (_: any, record: TableDataItem) => (
        <Form.Item
          style={{ margin: 0 }}
          validateStatus={record.meetingDate ? '' : 'error'}
          help={record.meetingDate ? '' : 'Required'}
        >
          <DatePicker 
            value={record.meetingDate} 
            onChange={(date) => handleInputChange(record.key, 'meetingDate', date)} 
          />
        </Form.Item>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: TableDataItem) => (
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
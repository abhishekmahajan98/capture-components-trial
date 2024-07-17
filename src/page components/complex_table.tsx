import React from 'react';
import { Form, Table, Button, Input, Select, Space } from 'antd';

const { Option } = Select;
interface TableDataItem {
  key: string;
  input1: string;
  input2: string;
  select1: string;
  select2: string;
  select3: string;
}
//   const [tableData, setTableData] = useState<TableDataItem[]>([]);
interface TableDataItem {
  key: string;
  input1: string;
  input2: string;
  select1: string;
  select2: string;
  select3: string;
}

interface RecommendationTableProps {
  tableData: TableDataItem[];
  setTableData: React.Dispatch<React.SetStateAction<TableDataItem[]>>;
}

const RecommendationTable: React.FC<RecommendationTableProps> = ({ tableData, setTableData }) => {
  const handleInputChange = (key: string, dataIndex: keyof TableDataItem, value: string) => {
    const newData = [...tableData];
    const target = newData.find(item => item.key === key);
    if (target) {
      target[dataIndex] = value;
      setTableData(newData);
    }
  };

  const handleDelete = (key: string) => {
    const newData = tableData.filter(item => item.key !== key);
    setTableData(newData);
  };

  const handleAdd = () => {
    const newData: TableDataItem = {
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
      render: (_: any, record: TableDataItem) => (
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
      render: (_: any, record: TableDataItem) => (
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
      render: (_: any, record: TableDataItem) => (
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
      render: (_: any, record: TableDataItem) => (
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
      render: (_: any, record: TableDataItem) => (
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
      render: (_: any, record: TableDataItem) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record.key)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
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
  );
};

export default RecommendationTable;
import React, { useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Modal, Form, Input, InputNumber, Button, List } from 'antd';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Page3 = () => {
  const [rowData, setRowData] = useState([
    { company_id: 1, company_name: 'TechCorp', recommendation_score: 4, us_income: 1000000.50, global_income: 5000000.75 },
    { company_id: 2, company_name: 'GlobalSoft', recommendation_score: 3, us_income: 750000.25, global_income: 3000000.00 },
    { company_id: 3, company_name: 'InnovateTech', recommendation_score: 5, us_income: 2000000.00, global_income: 8000000.50 },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [queue, setQueue] = useState([]);
  const [isQueueModalVisible, setIsQueueModalVisible] = useState(false);

  const columnDefs = [
    { field: 'recommendation_score', headerName: 'Recommendation Score', filter: 'agNumberColumnFilter' },
    { field: 'us_income', headerName: 'US Income', filter: 'agNumberColumnFilter', valueFormatter: params => params.value.toFixed(2) },
    { field: 'global_income', headerName: 'Global Income', filter: 'agNumberColumnFilter', valueFormatter: params => params.value.toFixed(2) },
    { field: 'company_name', headerName: 'Company Name' },
    { field: 'company_id', headerName: 'Company ID' },
  ];

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
  }), []);

  const onRowClicked = useCallback((event) => {
    const rowData = event.data;
    setSelectedRow(rowData);
    form.setFieldsValue(rowData);  // Set form values with the selected row data
    setIsModalVisible(true);
  }, [form]);

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const updatedQueue = [...queue, { ...selectedRow, ...values }];
      setQueue(updatedQueue);
      setIsModalVisible(false);

      // Update rowData to reflect the queued state
      setRowData(rowData.map(row => 
        row.company_id === selectedRow.company_id ? { ...row, queued: true } : row
      ));
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const openQueue = () => {
    setIsQueueModalVisible(true);
  };

  const removeFromQueue = (item) => {
    const updatedQueue = queue.filter(queueItem => queueItem.company_id !== item.company_id);
    setQueue(updatedQueue);

    // Update rowData to reflect the removed queued state
    setRowData(rowData.map(row => 
      row.company_id === item.company_id ? { ...row, queued: false } : row
    ));
  };

  const submitQueue = () => {
    console.log(JSON.stringify(queue));
    // Here you would typically send this data to a server
    alert('Queue submitted!');
    setQueue([]);
    setIsQueueModalVisible(false);

    // Reset all rows' queued state
    setRowData(rowData.map(row => ({ ...row, queued: false })));
  };

  const getRowStyle = params => {
    if (params.data.queued) {
      return { backgroundColor: '#e6f7ff' };
    }
  };

  return (
    <div>
      <h1>Page 3</h1>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          getRowStyle={getRowStyle}
        />
      </div>

      <Button onClick={openQueue} style={{ marginTop: '20px' }}>Open Queue</Button>

      <Modal
        title="Edit Company"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="company_name" label="Company Name">
            <Input disabled />
          </Form.Item>
          <Form.Item name="recommendation_score" label="Recommendation Score" rules={[{ required: true, type: 'number', min: 1, max: 5 }]}>
            <InputNumber min={1} max={5} />
          </Form.Item>
          <Form.Item name="us_income" label="US Income" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber step={0.01} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
          </Form.Item>
          <Form.Item name="global_income" label="Global Income" rules={[{ required: true, type: 'number', min: 0 }]}>
            <InputNumber step={0.01} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Queue"
        visible={isQueueModalVisible}
        onOk={submitQueue}
        onCancel={() => setIsQueueModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsQueueModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={submitQueue}>
            Submit Queue
          </Button>,
        ]}
      >
        <List
          dataSource={queue}
          renderItem={item => (
            <List.Item
              actions={[
                <Button onClick={() => removeFromQueue(item)}>Remove</Button>
              ]}
            >
              {item.company_name} - Score: {item.recommendation_score}, US Income: ${item.us_income.toFixed(2)}, Global Income: ${item.global_income.toFixed(2)}
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default Page3;
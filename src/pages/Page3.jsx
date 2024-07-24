import React, { useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Modal, Form, Input, InputNumber, Button, message } from 'antd';
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
    form.setFieldsValue(rowData);
    setIsModalVisible(true);
  }, [form]);

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      // Simulating an API call
      setTimeout(() => {
        // Update rowData to reflect the submitted state
        setRowData(rowData.map(row => 
          row.company_id === selectedRow.company_id ? { ...row, ...values, submitted: true } : row
        ));
        setIsModalVisible(false);
        message.success('Submission successful!');
      }, 1000);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const getRowStyle = params => {
    if (params.data.submitted) {
      return { backgroundColor: '#d9f7be' }; // Light green color for submitted rows
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
    </div>
  );
};

export default Page3;
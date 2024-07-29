import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Modal, Button, Form, Input, DatePicker } from 'antd';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Page4 = () => {
  const [rowData] = useState([
    { companyName: 'Company A', meetingType: 'Annual', meetingDate: '2023-07-15', voteCutoff: '2023-07-10' },
    { companyName: 'Company B', meetingType: 'Special', meetingDate: '2023-08-01', voteCutoff: '2023-07-25' },
    // Add more data as needed
  ]);

  const [columnDefs] = useState([
    { field: 'companyName', headerName: 'Company Name' },
    { field: 'meetingType', headerName: 'Meeting Type' },
    { field: 'meetingDate', headerName: 'Meeting Date' },
    { field: 'voteCutoff', headerName: 'Vote Cutoff' },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <Button onClick={() => handleOpenModal(params.data)}>View/Edit</Button>
      ),
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenModal = (rowData) => {
    setSelectedRow(rowData);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedRow(null);
  };

  const handleFormSubmit = (values) => {
    console.log('Form submitted:', values);
    handleCloseModal();
  };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
        />
      </div>

      <Modal
        title="Row Details"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedRow && (
          <Form onFinish={handleFormSubmit} initialValues={selectedRow}>
            
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Page4;
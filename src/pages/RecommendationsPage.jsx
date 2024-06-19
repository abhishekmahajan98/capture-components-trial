import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Modal } from 'antd';
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

const showAddRecModal = () => {
  setAddRecIsModalOpen(true);
};

const handleAddRecOk = () => {
  setAddRecIsModalOpen(false);
};

const handleAddRecCancel = () => {
  setAddRecIsModalOpen(false);
};
  return (
    <div>
      <h1>Recommendations</h1>
      <div className='rec-page-buttons-div'>
        <div className='rec-page-button'>
          <Button type="primary" onClick={showAddRecModal}>
            New Rec +
          </Button>
          <Modal title="Add Recommendations" open={isAddRecModalOpen} onOk={handleAddRecOk} onCancel={handleAddRecCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
        <div className='rec-page-button'>
          <Button type="primary" onClick={showAddRecModal}>
            Write-up +
          </Button>
          <Modal title="Submit Write-up" open={isAddRecModalOpen} onOk={handleAddRecOk} onCancel={handleAddRecCancel}>
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
    </div>
  );
};

export default Page1;
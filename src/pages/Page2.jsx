import React, { useState } from 'react';
import { Upload, Button, message ,DatePicker} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import '../App.css';



function DateRange({ from, to }) {
  const generateDateList = (start, end) => {
    const fromDate = new Date(start);
    const toDate = new Date(end);
    const dates = [];

    let currentDate = new Date(fromDate);

    while (currentDate <= toDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const dateList = generateDateList(from, to);

  return (
    <div>
      <h2>Dates between {from} and {to}:</h2>
      <ul>
        {dateList.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </div>
  );
}


const Page2 = () => {
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files', file.originFileObj);
    });

    try {
      const response = await fetch('http://0.0.0.0:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        message.success('Upload successful');
        setFileList([]);
      } else { 
        message.error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Upload failed');
    }
  };

  return (
    <div>
      <Upload
        multiple
        beforeUpload={() => false}
        onChange={handleChange}
        fileList={fileList}
      >
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
      >
        Submit
      </Button>
      <DatePicker />
      <div>
      <DateRange from="2024-07-15" to="2024-08-20" />
    </div>
    </div>
  );
};

export default Page2;
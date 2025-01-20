import axios from 'axios';
import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Make a POST request to your API Gateway (which triggers Lambda)
      const response = await axios.post('https://your-api-gateway-url', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response from Lambda
      setResponseMessage(response.data.message);
      console.log('Lambda response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResponseMessage('Error uploading file.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
      <div>{responseMessage}</div>
    </div>
  );
};

export default FileUpload;

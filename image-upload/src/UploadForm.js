import React, { useState } from "react";
import "./UploadForm.css";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [apiResponse, setApiResponse] = useState(""); // Store API text response

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile)); // Generate and set image URL
      setError(""); // Clear any previous errors
      setApiResponse(""); // Clear previous response
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://3vd10i2cz5.execute-api.us-east-1.amazonaws.com/dev/",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "text/plain", // Ensure the API returns text
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text(); 
      const cleanedResult = result.replace(/^"(.*)"$/, '$1'); // Remove leading and trailing quotes
      setApiResponse(cleanedResult);
      console.log("Lambda Response:", result);
      setError("");

    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Display API Response */}
      {apiResponse && (
        <div className="api-response">
          <h2>Calories:</h2>
          <p>{apiResponse}</p>
        </div>
      )}

      {/* Display Image */}
      {imageUrl && (
        <div className="image-preview">
          <h2>Uploaded Image</h2>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default UploadForm;
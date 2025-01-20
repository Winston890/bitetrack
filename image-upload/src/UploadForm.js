import React, { useState } from "react";
import "./UploadForm.css";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(""); // Clear any previous errors
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
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.imageUrl) {
        setImageUrl(result.imageUrl); // Set the CloudFront URL for the uploaded image
      } else {
        setError("Failed to upload the image.");
      }
    } catch (err) {
      setError("Error occurred during upload.");
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

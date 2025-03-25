import React, { useState, useRef } from "react";
import "./UploadForm.css";
import { useAuth } from "react-oidc-context";
import SaveHistoryButton from "./SaveHistoryButton";
import NutritionDetails from "./NutritionDetails";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [uuid, setUuid] = useState("");
  const [nutritionData, setNutritionData] = useState(null); // Store parsed JSON response

  const auth = useAuth();
  const nutritionRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile)); 
      setError(""); 
      setNutritionData(null); // Clear previous response
      setUuid("");
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
            Accept: "application/json", // Ensure the API returns JSON
          },
        }
      );
  
      if (response.status === 413) {
        throw new Error("Image too large");
      }
      if (!response.ok) { // Any 200-299 OK
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json(); 
      console.log(result)
      setNutritionData(result.nutrition || {})
      setUuid(result.run_id || ""); 
      setError("");
      setTimeout(() => {
        if (nutritionRef.current) {
          nutritionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } catch (err) {
      setError(`Error: ${err.message}`);
      setNutritionData(null);
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
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {imageUrl && (
        <div className="image-preview">
          <h2>Uploaded Image</h2>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}

      {/* Display Nutrition Details instead of raw API response */}
      {nutritionData && (
        <div ref={nutritionRef}>
          <NutritionDetails nutritionData={nutritionData} />
        </div>
      )}

      {uuid && (
        auth.isAuthenticated ? (
          <SaveHistoryButton uuid={uuid} />
        ) : (
          <div className="login-prompt">
            <p><span>Login</span> to save your history.</p>
            <button onClick={() => auth.signinRedirect()}>Login Now</button>
          </div>
        )
      )}
    </div>
  );
};

export default UploadForm;

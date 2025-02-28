import { Save } from "lucide-react";
import React, { useState } from "react";

const SaveHistoryButton = ({ uuid }) => {
  const [saveStatus, setSaveStatus] = useState(""); // Track save status

  const handleSave = async () => {
    try {
      const response = await fetch(
        "https://3vd10i2cz5.execute-api.us-east-1.amazonaws.com/dev/calorie_run_details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uuid }), // Send the UUID in request body
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSaveStatus("Saved!");
    } catch (error) {
      setSaveStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="upload-result">
      <button onClick={handleSave}>Save</button>
      {saveStatus && <p>{saveStatus}</p>}
    </div>
  );
};

export default SaveHistoryButton;

import React, { useState } from "react";

const SaveHistoryButton = ({ uuid }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSaveHistory = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://your-api-endpoint.com/save-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      setMessage("History saved successfully!");
    } catch (error) {
      setMessage(`Failed to save history: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="save-history-container">
      <button onClick={handleSaveHistory} disabled={loading} className="save-history-button">
        {loading ? "Saving..." : "Save History"}
      </button>
      {message && <p className="save-history-message">{message}</p>}
    </div>
  );
};

export default SaveHistoryButton;

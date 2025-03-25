import React, { useState } from "react";
import { useAuth } from "react-oidc-context";
import "./SaveHistoryButton.css";


const SaveHistoryButton = ({ uuid }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const auth = useAuth();

  const handleSaveHistory = async () => {
    setLoading(true);
    setMessage("");
    console.log(auth.user?.profile.sub)
    console.log(auth.sub);

    try {
      console.log("WTF: ", JSON.stringify({ run_id: uuid, sub: auth.user?.profile.sub }));
      const response = await fetch("https://3vd10i2cz5.execute-api.us-east-1.amazonaws.com/dev/calorie_run_details/save-image-analysis", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify({ run_id: uuid, sub: auth.user?.profile.sub }),
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

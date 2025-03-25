import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import Toolbar from "./Toolbar";
import Landing from "./Landing";
import UploadForm from "./UploadForm";
import NutritionHistory from "./NutritionHistory";
import ProtectedRoute from "./ProtectedRoute"; // Import the new component
import "./App.css";

function App() {
  const auth = useAuth(); // Get auth state from Cognito

  return (
    <Router>
      <div className="App">
        <Toolbar
          isLoggedIn={auth.isAuthenticated} 
          username={auth.user?.profile["cognito:username"] || ""}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload_food" element={<UploadForm />} />
          <Route path="/history" element={<ProtectedRoute Component={NutritionHistory} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

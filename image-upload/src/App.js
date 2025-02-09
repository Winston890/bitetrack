import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import Toolbar from "./Toolbar";
import Landing from "./Landing";
import "./App.css";

function App() {
  const auth = useAuth(); // Get auth state from Cognito

  return (
    <Router>
      <div className="App">
        <Toolbar
          isLoggedIn={auth.isAuthenticated} // Use auth context
          username={auth.user?.profile["cognito:username"] || ""}
          onLogout={() => auth.removeUser()} // Logout function
        />
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import "./Toolbar.css"; // Ensure this file exists for styling

const Toolbar = ({ isLoggedIn, username, onLogout }) => {
  const auth = useAuth(); // Get auth state from Cognito
  
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <Link to="/" className="logo">BiteTrack</Link>
      </div>
      <div className="toolbar-right">
        {isLoggedIn ? (
          <>
            <span className="username">Welcome, {username}!</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button className="login-btn" onClick={() => auth.signinRedirect()}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;

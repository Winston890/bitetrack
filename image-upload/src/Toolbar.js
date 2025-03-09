import React from "react"; 
import { Link } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import HamburgerMenu from "./HamburgerMenu";
import "./Toolbar.css"; 

const Toolbar = ({ isLoggedIn, username, onLogout }) => {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "7s4enhaueop09611r84beu7tci";
    const logoutUri = "http://localhost:3000";
    const cognitoDomain = "https://us-east-1kbzmcvqs9.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const handleLogout = async () => {
    await auth.removeUser(); // Clear user session locally
    signOutRedirect(); // Redirect to Cognito for logout
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        {/* Hamburger Menu */}
        <HamburgerMenu isLoggedIn={isLoggedIn}/>
        
        <Link to="/" className="logo">BiteTrack</Link>
      </div>

      <div className="toolbar-right">
        {isLoggedIn ? (
          <>
            <span className="username">Welcome, {username}!</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="login-btn" onClick={() => auth.signinRedirect(auth.settings.client_id)}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;

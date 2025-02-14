import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./HamburgerMenu.css";

const HamburgerMenu = ({ isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hamburger-container">
      {/* Toggle button */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
      </button>

      {/* Dropdown menu */}
      <div className={`hamburger-menu ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/upload_food" onClick={() => setIsOpen(false)}>Upload</Link>
        {isLoggedIn ? (
          <Link to="/history" onClick={() => setIsOpen(false)}>History</Link>
        ) : (
          <span className="disabled-link">History</span>  
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;

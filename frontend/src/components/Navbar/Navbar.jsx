import React, { useRef, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo.png";
import { Button } from "reactstrap";
const Navbar = ({ username, handleLogout }) => {
  const headerRef = useRef(null);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="user-info">
        <span>
          Welcome, <b>{username}</b>
        </span>
      </div>
      <div>
        <Button className="btn primary__btn" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

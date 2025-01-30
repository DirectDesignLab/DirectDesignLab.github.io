import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/assets/ddlogo.svg" alt="Logo" className="navbar-logo" />
      </Link>
      <div className="navbar-links">
        <Link to="/about">About</Link>
        <Link to="/type-thon">Type-Thon</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/archive">Archive</Link>
      </div>
    </nav>
  );
}

export default Navbar;
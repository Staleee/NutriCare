import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import logo_withwords from '../assets/v1112_32.png'; 

export default function Navbar() {
  return (
    <nav>
      <img src={logo_withwords} alt="Logo" />
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/">Services</Link>
        <Link to="/">About us</Link>
      </div>
      <div className="nav-links-right">
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import './Navbar.css'; 
import logo_withwords from '../assets/v1112_32.png';

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <nav>
      <img src={logo_withwords} alt="Logo" />
      <div className="nav-links">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <Link to="/RecommendationForm">Services</Link>
        ) : (
          <Link to="/login">Services</Link>
        )}
        <Link to="/">About us</Link>
      </div>
      <div className="nav-links-right">
        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

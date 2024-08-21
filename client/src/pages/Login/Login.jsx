import { useState, useContext } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../AuthContext";

import logo_withwords from "../../assets/v1112_32.png";
import ellipse from "../../assets/Ellipse 2.png";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/login', {
        email, password
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem('token', data.token);  // Save the token to localStorage
        setData({});
        setIsAuthenticated(true);  // Update authentication state
        toast.success('login Successful')
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  }

  return (
    <div className='container'>
        <form onSubmit={loginUser}>
    <div className="header">
        <a href="/" className="logo-link">
            <img src={logo_withwords} alt="Logo" />
        </a>
    </div>
    <div className="inputs">
        <div className="input">
            <input type="email" placeholder='email'  value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        </div>

        <div className="input">
            <input type="password" placeholder='password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        </div>
    </div>
    <div className="submit-container">
        <button type="submit" className="submit"> Log in </button>
    </div>
    <div className="dont-have-account">Dont have an account? <a href="/register" className='Signup-link'>Sign up</a></div>
    <img src={ellipse} alt="" className="ellipse" />
</form></div>
  )
}

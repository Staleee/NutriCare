import { useState } from "react";
import axios from 'axios'

import logo_withwords from "../../assets/v1112_32.png";
import ellipse from "../../assets/Ellipse 2.png";

import "./Login.css"

export default function Login() {

    const [data, setData] =useState({
        email: '',
        password: '',
    })

    const loginUser = (e) => {
        e.preventDefault()
        axios.get('/')
    }

  return (
    <div classname='container'>
        <form pnSubmit={loginUser}>
    <div className="header">
        <a href="#" className="logo-link">
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

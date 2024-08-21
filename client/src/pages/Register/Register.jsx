import { useState } from "react"
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



import logo_withwords from "../../assets/v1112_32.png";
import ellipse from "../../assets/Ellipse 2.png";
import "./Register.css";


export default function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        email: '', 
        password: '',
    })

    const registerUser = async (e) => {
        e.preventDefault();
        const {name, email, password} = data
        try {
            const {data} = await axios.post('/register', {
                name, email, password
            })
            if(data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Registered Successfully')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='container'>
    <form onSubmit={registerUser}>
    <div className="header">
        <a href="/" className="logo-link">
            <img src={logo_withwords} alt="Logo" />
        </a>
    </div>
    <div className="inputs">
        <div className="input">
            <input type="" placeholder='name' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
        </div>

        <div className="input">
            <input type="email" placeholder='email' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        </div>

        <div className="input">
            <input type="password" placeholder='password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
        </div>
    </div>
    <div className="submit-container">
        <button type="submit" className="submit"> Register </button>
    </div>
    <div className="have-account">Already have an account? <a href="/login" className='login-link'>Log in</a></div>
    <img src={ellipse} alt="" className="ellipse" />
    </form>
    </div>
  )
}

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import { useLocation } from 'react-router-dom';
import Login from './pages/Login/Login'
// import ChatHome from './pages/chatting/chatHome'
// import Chat from './pages/chatting/chatPage';
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
// import { UserContextProvider } from '../context/userContext'


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true


function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
    {!hideNavbar && <Navbar />}  
    <Toaster position ='bottom-right' toastOptions={{duration: 2000}} />
    <Routes>
      <Route path= '/' element={<Home />} />
      <Route path= '/register' element={<Register />} />
      <Route path= '/login' element={<Login />} />

    </Routes>
    </>
  )
}

export default App

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import ChatHome from './pages/chatting/chatHome'
import Chat from './pages/chatting/chatPage';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost: 8000';
axios.defaults.withCredentials = true


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path= '/' element={<Home />} />
      <Route path= '/register' element={<Register />} />
      <Route path= '/login' element={<Login />} />
      <Route path= '/chatHome' element={<ChatHome/>}/>
      <Route path= '/chat' element={<Chat/>}/>

    </Routes>
    </>
  )
}

export default App

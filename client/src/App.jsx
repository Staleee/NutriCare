import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import RecommendationForm from './pages/Recommender/RecommendationForm';
import Recommendations from './pages/Recommender/Recommendations'; // Import the new Recommendations component
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}  
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/RecommendationForm' element={<PrivateRoute element={RecommendationForm} />} />
        <Route path='/recommendations' element={<PrivateRoute element={Recommendations} />} /> {/* Add new route */}
      </Routes>
    </AuthProvider>
  );
}

export default App;

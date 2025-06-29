import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'; 
import './App.css';
import { isLoggedIn } from './utils/auth';

function App() {
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Home />} /> {/* 👈 show home first */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { saveToken } from '../utils/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/api/auth/public/login', {
        username,
        password,
      });

      // Save the JWT token returned
      saveToken(res.data.token); // assuming response: { token: '...' }
      console.log("hey token saved")

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <br/>
      <Link to="/register">
          <p>if u are new user Please register first</p>      
          <button>Register</button>
        </Link>
    </div>
  );
}

export default Login;

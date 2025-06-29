import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post('/api/auth/public/register', {
        username,
        email,
        password
      });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed. Please check your details or try a different email.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <br/>
      <p>if already registered Please Login</p>
      <Link to="/login">
          <button style={{ marginRight: '20px' }}>Login</button>
        </Link>
    </div>
  );
}

export default Register;

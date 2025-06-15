import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './cssFiles/login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: credentials.username,
        password: credentials.password
      });
      alert(res.data.message);

      if (res.data.role === "admin") {
        navigate('/adminpanel');
      } else {
        navigate('/homepg');
      }

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <h1><abbr title="Dua Music Player">DMP</abbr></h1>
        </div>
      </header>

      <main>
        <div className="login-container">
          <h2>Login to DMP</h2>
          <form id="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button type="submit" id="login-btn">Login</button>
          </form>

          <div className="login-options">
            <p>Don't have an account? <Link to="/create-account">Create one</Link></p>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 DMP - Dua Music Player</p>
      </footer>
    </>
  );
};

export default Login;

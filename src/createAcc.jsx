import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cssFiles/createAcc.css';
import axios from 'axios';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    pass: '',
    conPass: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { fullName, username, pass, conPass } = formData;

    if (!fullName || !username || !pass || !conPass) {
      alert('All fields must be filled');
      return false;
    }

    if (pass !== conPass) {
      alert('Passwords do not match');
      return false;
    }

    return true;
  };

  const saveUserToMongoDB = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/users', {
        username: formData.username,
        password: formData.pass,
        admin: false,
      });

      if (response.data.success) {
        return true;
      } else {
        alert(response.data.message || 'Error creating account');
        return false;
      }
    } catch (err) {
      alert('Error: ' + err.response?.data?.message || err.message);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (await saveUserToMongoDB()) {
        alert('Account created successfully!');
        navigate('/');
      }
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <h1><abbr title="Dua Music Player">DMP</abbr></h1>
        </div>
      </header>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Create Your Account</h1>
        <form onSubmit={handleSubmit}>
          <p>Full Name <br />
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
          </p>
          <p>Username <br />
            <input
              type="text"
              name="username"
              placeholder="John123"
              value={formData.username}
              onChange={handleChange}
            />
          </p>
          <p>Password <br />
            <input
              type="password"
              name="pass"
              placeholder="At least 8 characters"
              value={formData.pass}
              onChange={handleChange}
            />
          </p>
          <p>Confirm Password <br />
            <input
              type="password"
              name="conPass"
              placeholder="Re-enter your password"
              value={formData.conPass}
              onChange={handleChange}
            />
          </p>
          <button type="submit" className="btnCreate">Create Account</button>
        </form>
      </div>
      <footer>
        <p>&copy; 2025 DMP - Dua Music Player</p>
      </footer>
    </>
  );
};

export default CreateAccount;

import React, { useState } from 'react';
// import './Auth.css';

const RegistrationPage = ({ setIsRegistered }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    if (formData.username && formData.password) {
      alert('Registration successful. Please log in.');
      setIsRegistered(false); // Redirect to login page
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => setIsRegistered(false)}>Back to Login</button>
    </div>
  );
};

export default RegistrationPage;

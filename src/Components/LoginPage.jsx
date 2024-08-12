import React, { useState } from 'react';
// import './Auth.css';

export const LoginPage = ({ setIsSignedIn, setIsRegistered }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your authentication logic
    if (credentials.username && credentials.password) {
      setIsSignedIn(true); // Update sign-in state
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={() => setIsRegistered(true)}>Register</button>
    </div>
  );
};

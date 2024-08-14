import { useState, useEffect } from 'react';
import './Auth.css';

// eslint-disable-next-line react/prop-types
export const LoginPage = ({ setIsSignedIn, setIsRegistered }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setIsSignedIn(true);
    }
  }, [setIsSignedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.username && credentials.password) {
      try {
        const response = await fetch('http://localhost:3004/users');
        const users = await response.json();

        // Check if there is a user with matching credentials
        const user = users.find(user =>
          user.username === credentials.username && user.password === credentials.password
        );

        if (user) {
          localStorage.setItem('user', JSON.stringify(user)); // Save user session
          setIsSignedIn(true); // Update sign-in state
        } else {
          setError('Invalid username or password. Please try again.');
        }
      } catch (error) {
        setError('An error occurred. Please try again.', error);
      }
    } else {
      setError('Please enter both username and password.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    setIsSignedIn(false); 
  };

  return (
    <div className="auth-container">
      <div className="myForm">
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
        {error && <p className="error-message">{error}</p>}
        <button onClick={() => setIsRegistered(true)}>Sign Up</button>
        {localStorage.getItem('user') && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
};

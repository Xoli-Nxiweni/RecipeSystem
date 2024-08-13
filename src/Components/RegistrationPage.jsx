import { useState } from 'react';
import './Auth.css'; // Ensure you have appropriate styles

// eslint-disable-next-line react/prop-types
const RegistrationPage = ({ setIsRegistered }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeatPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password || !formData.repeatPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3004/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert('Registration successful. Please log in.');
        setIsRegistered(false); // Switch to login page
      } else {
        const result = await response.json();
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="myForm">
        <h2>Sign Up</h2>
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
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <button onClick={() => setIsRegistered(false)}>Sign In</button>
      </div>
    </div>
  );
};

export default RegistrationPage;

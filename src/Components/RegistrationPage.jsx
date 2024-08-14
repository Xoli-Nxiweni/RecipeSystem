import { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import './Auth.css';

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
        setIsRegistered(false);
      } else {
        const result = await response.json();
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" component="h2">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Repeat Password"
          name="repeatPassword"
          type="password"
          value={formData.repeatPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">Sign Up</Button>
        {error && <Typography color="error">{error}</Typography>}
        <Button onClick={() => setIsRegistered(false)}>Sign In</Button>
      </form>
    </Box>
  );
};

export default RegistrationPage;

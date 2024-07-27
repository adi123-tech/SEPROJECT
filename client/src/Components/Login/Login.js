import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext'; // Import useUser hook
import './formStyles.css';

const Login = () => {
  const navigate = useNavigate();
  const { setUserId } = useUser(); // Access setUserId function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://seproject-edbi.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful
        const userData = await response.json(); // Assuming the response contains user data including user ID
        alert('Login successful');
        setUserId(userData.userId); // Set userId in UserProvider context
        navigate('/home'); // Redirect to home page
      } else {
        // Login failed
        alert('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle error response
      alert('An error occurred while processing your request. Please try again later.');
    }
  };

  return (
    <div className="base-container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="txt_field">
            <input type="email" value={email} onChange={handleEmailChange} required />
            <span>Email</span>
          </div>
          <div className="txt_field">
            <input type="password" value={password} onChange={handlePasswordChange} required />
            <span>Password</span>
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../styles/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Dummy user validation for testing
    if (email === 'test@example.com' && password === 'password') {
      // Simulate a JWT-like payload
      const dummyToken = JSON.stringify({
        email: 'test@example.com',
        role: 'user',
        exp: Date.now() + 60 * 60 * 1000, // 1-hour expiration for testing
      });

      // Save dummy token to localStorage
      localStorage.setItem('jwt', dummyToken);

      // Redirect to dashboard
      alert('Logged in successfully!');
      navigate('/account');
    } else {
      alert('Invalid email or password. For testing, use test@example.com / password');
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
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
      <button onClick={handleLogin}>Login</button>
      <div className="login-links">
        <a href="/forgot-password">Forgot Password?</a>
        <br />
        <a href="/signup">Create an Account</a>
      </div>
    </div>
  );
};

export default Login;
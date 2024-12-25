import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('khanapurkarpratik@gmail.com');
  const [password, setPassword] = useState('Vils_123');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://testapi.studentpro.vils.ai/santhify/api/v1/account/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        // Save access token to localStorage
        localStorage.setItem('jwt', JSON.stringify({
          token: data.data.access_token.token,
          exp: Date.now() + (data.data.access_token.exp * 1000) // Convert exp to milliseconds
        }));

        toast.success('Logged in successfully!');
        navigate('/client');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('An error occurred during login. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to right, #4b6cb7, #182848)' }}>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h2>
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4b6cb7] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <div className="flex flex-col items-center space-y-2">
            <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot Password?
            </a>
            <a href="/signup" className="text-sm text-indigo-600 hover:text-indigo-500">
              Create an Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
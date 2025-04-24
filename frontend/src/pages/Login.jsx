import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { ErrorToast, SuccessToast } from '../componants/HandleNotification';
import { LOGIN } from '../constant';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        login(token, user);
        SuccessToast(response.data.message); 
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        ErrorToast(response.data); 
      }
    } catch (error) {
      if (error.response) {
        ErrorToast(error.response.data.message); 
      } else {
        ErrorToast('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="p-8 w-full max-w-sm mx-4"
        style={{
          backgroundColor: '#e0e5ec',
          borderRadius: '30px',
          boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.1), -8px -8px 15px rgba(255, 255, 255, 0.7)',
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#333' }}>
          Login
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email" style={{ color: '#555' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password" style={{ color: '#555' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-4 text-white rounded-xl"
            style={{
              backgroundColor: '#3b82f6',
              boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.8)',
              transition: 'all 0.3s ease',
            }}
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4" style={{ color: '#555' }}>
          Don’t have an account?{' '}
          <a href="/signup" style={{ color: '#3b82f6', fontWeight: 'bold', textDecoration: 'underline' }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

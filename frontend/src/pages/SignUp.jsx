import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { ErrorToast, SuccessToast } from '../componants/HandleNotification';
import { SIGNUP, VARIFICATIONCODE } from '../constant';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [role, setRole] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    role: false,
  });

  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);

  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'name') setName(value);
    else if (id === 'email') setEmail(value);
    else if (id === 'password') setPassword(value);
    else if (id === 'role') setRole(value);
    else if (id === 'verificationCode') setVerificationCode(value);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !role || !verificationCode) {
     ErrorToast('Please fill in all the fields.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      ErrorToast('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(SIGNUP, {
        name: name,
        email: email,
        password: password,
        role: role,
        verificationCode: verificationCode,
      });

      setLoading(false);
    
      
      if(response.data.success){
      
        SuccessToast(response.data.success);
        setTimeout(() => {
          navigate('/login'); // Redirect to login page
        }, 2000);
      }else{
        ErrorToast(response.data)
      }
    } catch (error) {
      ErrorToast("Error to Sign Up, server error");
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    setVerificationLoading(true);
    const newErrors = { email: false, role: false };

    if (!email || !validateEmail(email)) newErrors.email = true;
    if (!role) newErrors.role = true;

    if (newErrors.email || newErrors.role) {
      setErrors(newErrors);
     ErrorToast('Please provide a valid email and select a role.');
      setVerificationLoading(false);
      return;
    }

    try {
      const response = await axios.post(VARIFICATIONCODE, {
        email: email,
        role: role,
      });
      if(response){
        SuccessToast('Verification code sent successfully!');
      }

      setVerificationLoading(false);
      
    } catch (error) {
      
      ErrorToast('Failed to send verification code. Please try again.');
      setVerificationLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div
        className="p-8 w-full max-w-md mx-4 mt-7 mb-4"
        style={{
          backgroundColor: '#e0e5ec',
          borderRadius: '30px',
          boxShadow: '8px 8px 15px rgba(0, 0, 0, 0.1), -8px -8px 15px rgba(255, 255, 255, 0.7)',
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#333' }}>
          Sign Up
        </h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name" style={{ color: '#555' }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none"
              autoComplete="name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email" style={{ color: '#555' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full p-4 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none`}
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password" style={{ color: '#555' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none"
              autoComplete="current-password"
            />
          </div>
          <div className="mb-6 flex items-center">
            <div className="w-2/3">
              <label className="block text-sm font-bold mb-2" htmlFor="role" style={{ color: '#555' }}>
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={handleChange}
                className={`w-full p-4 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none`}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="writer">Writer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="button"
              className="ml-4 bg-emerald-500 text-white p-4 rounded-xl font-semibold hover:bg-teal-600 transition duration-200"
              onClick={handleSendCode}
            >
              {verificationLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
              ) : (
                'Send Verification Code'
              )}
            </button>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="verificationCode" style={{ color: '#555' }}>
              Enter Verification Code
            </label>
            <input
              type="text"
              id="verificationCode"
              value={verificationCode}
              onChange={handleChange}
              placeholder="Enter the verification code"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 text-white bg-blue-500 rounded-xl font-semibold hover:bg-blue-600 transition duration-200"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;

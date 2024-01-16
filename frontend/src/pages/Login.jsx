import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your login endpoint
      const response = await axios.post('http://localhost:5555/books/login', {
        email: loginEmail,
        password: loginPassword,
      });

      // If the login is successful, navigate to /home
      console.log('Login successful:', response.data);
      window.location.href = '/home';
    } catch (error) {
      // Handle login failure (display error messages, etc.)
      console.error('Login failed:', error.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your signup endpoint
      const response = await axios.post('http://localhost:5555/books/signup', {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });

      // If the signup is successful, you can handle the response (redirect, show a success message, etc.)
      console.log('Signup successful:', response.data);
    } catch (error) {
      // Handle signup failure (display error messages, etc.)
      console.error('Signup failed:', error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="loginEmail" className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                id="loginEmail"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="loginPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                type="password"
                id="loginPassword"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Signup</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-4">
              <label htmlFor="signupName" className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                id="signupName"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="signupEmail" className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                id="signupEmail"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="signupPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Password:
              </label>
              <input
                type="password"
                id="signupPassword"
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../assets/login.css'
const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(credentials);
      const userData = {
        ...res.user,
        token: res.token,
      };

      login(userData, userData.token);
      toast.success('Login successful! 🎉');

      setTimeout(() => {
        if (userData.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 px-4 animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition duration-700 ease-in-out hover:scale-105 animate-bounce-in">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-500 tracking-wider drop-shadow-md">
          Welcome Back 👋
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded transition ${
              loading
                ? 'bg-yellow-300 cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

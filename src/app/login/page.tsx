'use client';

import { useState } from 'react';
import { Bot, Shield } from 'lucide-react';

const LoginComponent = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage(data.message);
      setForm({
        email: '',
        password: '',
      });
      
      // Redirect to dashboard or home page after successful login
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4" style={{
      fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji"',
      fontFeatureSettings: 'normal',
      fontVariationSettings: 'normal'
    }}>
      {/* Card */}
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <h3 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900">Welcome Back</h3>
          <p className="text-sm font-medium text-gray-600">
            Sign in to your AI chatbot platform
          </p>
        </div>
        
        {/* Card Content */}
        <div className="p-6 pt-0">
          {/* Success Message */}
          {message && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label 
                htmlFor="email"
                className="text-sm font-semibold leading-none text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="flex h-10 w-full border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ 
                  borderRadius: '10px', 
                  color: '#111827',
                  '--tw-ring-color': '#6566F1'
                } as React.CSSProperties}
              />
            </div>
            
            {/* Password */}
            <div className="space-y-2">
              <label 
                htmlFor="password"
                className="text-sm font-semibold leading-none text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                className="flex h-10 w-full border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ 
                  borderRadius: '10px', 
                  color: '#111827',
                  '--tw-ring-color': '#6566F1'
                } as React.CSSProperties}
              />
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full h-10 text-white font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#6566F1', borderRadius: '10px' }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#5A5BD8')}
              onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#6566F1')}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          {/* Bottom Link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <a 
              href="/signup"
              className="hover:underline font-semibold"
              style={{ color: '#6566F1' }}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

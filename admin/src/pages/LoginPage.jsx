import React, { useState } from 'react';
import { apiService } from '@/apiService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiService.login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy mb-2">eWARTA</h1>
          <p className="text-gray-600">Admin Panel</p>
          <p className="text-sm text-gray-500 mt-2">GKJ Salatiga Timur</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              placeholder="admin@gkjst.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-softRed/10 border border-softRed text-softRed px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy hover:bg-navy/90 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Hubungi administrator untuk akun login
        </p>
      </div>
    </div>
  );
}

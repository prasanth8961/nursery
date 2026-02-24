'use client';
import { useState } from 'react';
import { authApi } from '@/lib/adminApi';
import { STRINGS, COLORS } from '../constants';
import axios from 'axios';
import { MdLocalFlorist } from 'react-icons/md';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      localStorage.setItem('admin_token', res.data.access_token);
      window.location.href = '/admin';
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Invalid email or password');
      } else {
        setError(STRINGS.ERROR_GENERIC);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className={`${COLORS.CARD_BG} ${COLORS.CARD_BORDER} rounded-2xl shadow-xl w-full max-w-md p-8`}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center mb-4">
            <MdLocalFlorist size={28} className="text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{STRINGS.LOGIN_TITLE}</h1>
          <p className="text-sm text-gray-500 mt-1">{STRINGS.APP_TITLE}</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm rounded-lg px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={STRINGS.EMAIL_PLACEHOLDER}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={STRINGS.PASSWORD_PLACEHOLDER}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${COLORS.PRIMARY_BTN} py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50`}
          >
            {loading ? STRINGS.LOADING : STRINGS.LOGIN_BUTTON}
          </button>
        </form>
      </div>
    </div>
  );
}

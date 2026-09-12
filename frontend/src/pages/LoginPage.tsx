import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2, RefreshCw } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSlowLoading, setIsSlowLoading] = useState(false);

  useEffect(() => {
    let timer: any;
    if (loading) {
      timer = setTimeout(() => {
        setIsSlowLoading(true);
      }, 2500);
    } else {
      setIsSlowLoading(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 mx-auto flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-500/20">
            O
          </div>
          <h1 className="text-2xl font-black tracking-tight">Welcome back to OOADCRAFT</h1>
          <p className="text-sm text-slate-400">Sign in to your learning dashboard</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isSlowLoading && (
          <div className="p-3 bg-amber-950/40 border border-amber-800/60 text-amber-300 rounded-xl text-xs flex items-center space-x-2.5 animate-pulse">
            <RefreshCw className="w-4 h-4 shrink-0 animate-spin text-amber-400" />
            <span>Connecting to backend server... (Render free tier may take ~20-30s to wake up on cold starts)</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2 text-sm transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>{isSlowLoading ? 'Waking up backend server...' : 'Signing in...'}</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 font-semibold hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

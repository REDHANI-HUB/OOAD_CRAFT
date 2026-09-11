import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Flame, Zap, User as UserIcon, LogOut, Layout, BookOpen, Award, Code, Bot } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 font-black text-xl">
                O
              </div>
              <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500">
                OOADCRAFT
              </span>
            </Link>
          </div>

          {/* Quick Nav Links if Logged In */}
          {user && (
            <nav className="hidden md:flex items-center space-x-1 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link to="/dashboard" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1.5 transition">
                <Layout className="w-4 h-4 text-indigo-500" />
                <span>Dashboard</span>
              </Link>
              <Link to="/learn" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1.5 transition">
                <BookOpen className="w-4 h-4 text-sky-500" />
                <span>Learn</span>
              </Link>
              <Link to="/uml-lab" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1.5 transition">
                <Code className="w-4 h-4 text-emerald-500" />
                <span>UML Lab</span>
              </Link>
              <Link to="/leaderboard" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1.5 transition">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Leaderboard</span>
              </Link>
              <Link to="/ai-mentor" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1.5 transition">
                <Bot className="w-4 h-4 text-purple-500" />
                <span>AI Mentor</span>
              </Link>
            </nav>
          )}

          {/* Controls Right */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-3">
                <Link to="/profile" className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 transition">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md shadow-indigo-500/20 transition"
                >
                  Get Started
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Shield, Bell, Lock } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Account & Platform Settings</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage application preferences, appearance themes, and security configuration.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6 max-w-2xl">
            {/* Theme Preferences */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">Interface Color Theme</div>
                <div className="text-xs text-slate-400">Switch between Light mode and Dark mode</div>
              </div>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-xs flex items-center space-x-2 transition"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                <span className="capitalize">{theme} Mode Active</span>
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">Leaderboard Notifications</div>
                <div className="text-xs text-slate-400">Receive alerts when someone overtakes your rank position</div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

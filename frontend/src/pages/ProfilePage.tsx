import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { User as UserIcon, Mail, Building, BookOpen, Calendar, Flame, Zap, Award } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-3xl flex items-center justify-center shadow-xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">{user?.name}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span>Level 1 OOAD Architect</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-1">
                <div className="text-xs text-slate-400 font-bold uppercase">University</div>
                <div className="font-semibold text-sm">{user?.university || 'State University'}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-1">
                <div className="text-xs text-slate-400 font-bold uppercase">Department</div>
                <div className="font-semibold text-sm">{user?.department || 'Computer Science'}</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-1">
                <div className="text-xs text-slate-400 font-bold uppercase">Batch Year</div>
                <div className="font-semibold text-sm">{user?.batchYear || 2026}</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

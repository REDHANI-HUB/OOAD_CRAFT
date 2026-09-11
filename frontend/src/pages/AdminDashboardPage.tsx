import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { seedApi } from '../api';
import { ShieldAlert, Database, RefreshCw, CheckCircle2, Users, BookOpen } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setSeeding(true);
    setMessage('');
    try {
      const res = await seedApi.seed();
      setMessage(res.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Database seeded successfully!');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight flex items-center space-x-3 text-amber-500">
              <ShieldAlert className="w-8 h-8" />
              <span>Admin Management Dashboard</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Control platform seed data, monitor database tables, and manage user roles.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6 max-w-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                  <Database className="w-5 h-5 text-indigo-500" />
                  <span>Seed Platform Curriculum Data</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Populate MySQL tables with 6 Modules, Lessons, Quizzes, Design Challenges, Case Studies, and Patterns.
                </p>
              </div>

              <button
                onClick={handleSeed}
                disabled={seeding}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs flex items-center space-x-2 shrink-0 transition"
              >
                <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
                <span>{seeding ? 'Seeding Database...' : 'Run Seed Script'}</span>
              </button>
            </div>

            {message && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-2xl text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{message}</span>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

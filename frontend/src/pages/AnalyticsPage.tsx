import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart2, TrendingUp, Award, Zap } from 'lucide-react';

const xpData = [
  { day: 'Mon', xp: 120 },
  { day: 'Tue', xp: 250 },
  { day: 'Wed', xp: 180 },
  { day: 'Thu', xp: 340 },
  { day: 'Fri', xp: 420 },
  { day: 'Sat', xp: 510 },
  { day: 'Sun', xp: 600 },
];

const topicData = [
  { name: 'OOP Fundamentals', value: 35 },
  { name: 'UML Diagrams', value: 25 },
  { name: 'SOLID Principles', value: 25 },
  { name: 'Design Patterns', value: 15 },
];

const COLORS = ['#6366f1', '#38bdf8', '#10b981', '#f59e0b'];

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight flex items-center space-x-3">
              <BarChart2 className="w-8 h-8 text-indigo-500" />
              <span>Personal Skill Analytics</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Track XP accumulation velocity and domain mastery breakdown across OOAD subdisciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* XP Bar Chart */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                <span>Weekly XP Accumulation</span>
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={xpData}>
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }} />
                    <Bar dataKey="xp" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Topic Pie Chart */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Award className="w-5 h-5 text-sky-500" />
                <span>Topic Mastery Distribution</span>
              </h3>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={topicData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                      {topicData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
                {topicData.map((t, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                    <span>{t.name} ({t.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

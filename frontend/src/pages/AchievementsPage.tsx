import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { Award, Zap, Shield, Layout, CheckCircle2 } from 'lucide-react';

const badges = [
  { title: 'First Step', desc: 'Complete your first OOAD lesson.', icon: Zap, unlocked: true },
  { title: 'Quiz Master', desc: 'Pass 5 quizzes with 80%+ score.', icon: Award, unlocked: true },
  { title: 'UML Architect', desc: 'Create and validate 3 custom UML diagrams.', icon: Layout, unlocked: false },
  { title: 'SOLID Hero', desc: 'Reach Level 5 and master SOLID design principles.', icon: Shield, unlocked: false },
];

export const AchievementsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Achievements & Badges</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Unlock architectural milestones as you progress through lessons, quizzes, and UML lab challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className={`border rounded-3xl p-6 shadow-sm space-y-4 transition ${
                    b.unlocked
                      ? 'bg-white dark:bg-slate-800 border-indigo-500/40'
                      : 'bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${b.unlocked ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {b.unlocked && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{b.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{b.desc}</p>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
                    {b.unlocked ? 'Unlocked' : 'Locked'}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { dashboardApi } from '../api';
import { DashboardSummary } from '../types';
import { Trophy, Award, Flame, Zap, ArrowRight, Play, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardApi
      .getSummary()
      .then((res) => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex items-center space-x-3 text-indigo-400 font-bold">
          <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading your personalized OOAD dashboard...</span>
        </div>
      </div>
    );
  }

  const profile = data?.profile;
  const user = data?.user;
  const rankCards = data?.rankCards || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8">
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 lg:p-8 text-white shadow-xl">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Level {profile?.currentLevel || 1} OOAD Explorer</span>
              </div>
              <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
                Welcome back, {user?.name || 'Architect'}!
              </h1>
              <p className="text-indigo-100 text-sm max-w-xl">
                {user?.university} • {user?.department} • Batch of {user?.batchYear}
              </p>
            </div>

            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="text-center px-2">
                <div className="flex items-center justify-center space-x-1 text-amber-300 font-black text-xl">
                  <Flame className="w-5 h-5 fill-amber-300" />
                  <span>{profile?.currentStreak || 1}d</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold">Streak</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center px-2">
                <div className="flex items-center justify-center space-x-1 text-sky-300 font-black text-xl">
                  <Zap className="w-5 h-5 fill-sky-300" />
                  <span>{profile?.totalXP || 0}</span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-indigo-200 font-semibold">Total XP</div>
              </div>
            </div>
          </div>

          {/* Dynamic 4 Scope Rank Cards */}
          <div className="space-y-3">
            <h2 className="text-base font-extrabold tracking-wide uppercase text-slate-400 dark:text-slate-500 flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Personalized Leaderboard Ranks</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {rankCards.map((rc, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs text-slate-400 font-semibold uppercase">{rc.title}</div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      #{rc.rank}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                    #{rc.rank}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Recommended Lesson Card */}
          {data?.nextLesson && (
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 lg:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider">
                  Recommended Next Step
                </span>
                <h3 className="text-xl lg:text-2xl font-extrabold">{data.nextLesson.title}</h3>
                <p className="text-slate-300 text-sm">{data.nextLesson.description}</p>
                <div className="flex items-center space-x-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{data.nextLesson.estimatedMinutes} mins</span>
                  </span>
                  <span>• {data.nextLesson.moduleTitle}</span>
                </div>
              </div>

              <Link
                to={`/lessons/${data.nextLesson.id}`}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center space-x-2 text-sm shrink-0 transition"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Lesson Now</span>
              </Link>
            </div>
          )}

          {/* Activity Log Feed */}
          <div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Recent Achievements & Activity Log</span>
            </h3>

            {data?.recentActivities && data.recentActivities.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {data.recentActivities.map((act) => (
                  <div key={act.id} className="py-3 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{act.title}</span>
                    </div>
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-xs">
                      +{act.xpEarned} XP
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-400 text-sm py-4 text-center">
                No recent activity logged yet. Start completing lessons and quizzes to earn XP!
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

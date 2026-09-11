import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { LeaderboardTable } from '../components/LeaderboardTable';
import { leaderboardApi } from '../api';
import { LeaderboardEntry } from '../types';
import { useAuth } from '../context/AuthContext';
import { Trophy } from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeScope, setActiveScope] = useState('global');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = (scope: string) => {
    setLoading(true);
    let promise: Promise<LeaderboardEntry[]>;
    if (scope === 'university') promise = leaderboardApi.getUniversity();
    else if (scope === 'department') promise = leaderboardApi.getDepartment();
    else if (scope === 'batch') promise = leaderboardApi.getBatch();
    else promise = leaderboardApi.getGlobal();

    promise
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeaderboard(activeScope);
  }, [activeScope]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-amber-500" />
              <span>OOADCRAFT Leaderboards</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Dynamically calculated rankings across Global, University, Department, and Batch Year scopes.
            </p>
          </div>

          {loading ? (
            <div className="text-indigo-400 font-bold py-12 text-center">Calculating live rankings...</div>
          ) : (
            <LeaderboardTable
              entries={entries}
              currentUserId={user?.id}
              activeScope={activeScope}
              onScopeChange={(s) => setActiveScope(s)}
            />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

import React from 'react';
import { LeaderboardEntry } from '../types';
import { Trophy, Flame, User as UserIcon, Star } from 'lucide-react';

interface Props {
  entries: LeaderboardEntry[];
  currentUserId?: number;
  activeScope: string;
  onScopeChange: (scope: string) => void;
}

export const LeaderboardTable: React.FC<Props> = ({
  entries,
  currentUserId,
  activeScope,
  onScopeChange,
}) => {
  const scopes = [
    { key: 'global', label: 'Global' },
    { key: 'university', label: 'University' },
    { key: 'department', label: 'Department' },
    { key: 'batch', label: 'Batch' },
  ];

  const currentUserEntry = entries.find((e) => e.userId === currentUserId);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6 transition-colors">
      
      {/* Scope Switcher Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {scopes.map((s) => (
          <button
            key={s.key}
            onClick={() => onScopeChange(s.key)}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all touch-manipulation min-h-[44px] ${
              activeScope === s.key
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Current User Rank Gap Highlight Banner */}
      {currentUserEntry && (
        <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-base shadow-md">
              #{currentUserEntry.rank}
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Your Rank ({currentUserEntry.name})</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {currentUserEntry.totalXP} Total XP • Level {currentUserEntry.level}
              </div>
            </div>
          </div>
          {currentUserEntry.rank > 1 ? (
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-lg">
              {currentUserEntry.rank - 1} rank(s) behind #{currentUserEntry.rank - 1}!
            </div>
          ) : (
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg flex items-center space-x-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Rank #1 — Champion!</span>
            </div>
          )}
        </div>
      )}

      {/* Mobile Leaderboard Cards (Visible on < md) */}
      <div className="md:hidden space-y-3">
        {entries.map((entry) => {
          const isCurrentUser = entry.userId === currentUserId;
          return (
            <div
              key={entry.userId}
              className={`p-4 rounded-2xl border transition-all ${
                isCurrentUser
                  ? 'bg-indigo-50/90 dark:bg-indigo-950/70 border-2 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-extrabold text-slate-400">#{entry.rank}</span>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-sm mt-0.5">
                      {entry.name ? entry.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <span>{entry.name}</span>
                      {isCurrentUser && <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-extrabold">You</span>}
                    </div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                      Level {entry.level} Architect
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {entry.university} • {entry.department}
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="flex items-center justify-end space-x-1 text-amber-500 font-black text-sm">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{entry.totalXP.toLocaleString()} XP</span>
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 flex items-center justify-end space-x-1">
                    <Flame className="w-3 h-3 text-amber-500" />
                    <span>{entry.streak}d streak</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View (Visible on >= md) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[11px] tracking-wider">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">University & Dept</th>
              <th className="py-3 px-4">Level</th>
              <th className="py-3 px-4 text-right">Streak</th>
              <th className="py-3 px-4 text-right">Total XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
            {entries.map((entry) => {
              const isCurrentUser = entry.userId === currentUserId;
              return (
                <tr
                  key={entry.userId}
                  className={`transition-colors ${
                    isCurrentUser
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 font-semibold'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3.5 px-4">
                    {entry.rank === 1 ? (
                      <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center text-xs shadow-md">1</span>
                    ) : entry.rank === 2 ? (
                      <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black flex items-center justify-center text-xs shadow-md">2</span>
                    ) : entry.rank === 3 ? (
                      <span className="w-7 h-7 rounded-full bg-amber-700 text-white font-black flex items-center justify-center text-xs shadow-md">3</span>
                    ) : (
                      <span className="text-slate-500 font-bold pl-2">#{entry.rank}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                      {entry.name ? entry.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="text-slate-900 dark:text-white font-semibold">
                        {entry.name} {isCurrentUser && <span className="text-xs text-indigo-500 font-normal">(You)</span>}
                      </div>
                      <div className="text-xs text-slate-400">Batch {entry.batchYear || 2026}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 text-xs">
                    <div>{entry.university || 'State University'}</div>
                    <div className="text-slate-400">{entry.department || 'Computer Science'}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                      Lvl {entry.level}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{entry.streak}d</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-indigo-600 dark:text-indigo-400">
                    {entry.totalXP.toLocaleString()} XP
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

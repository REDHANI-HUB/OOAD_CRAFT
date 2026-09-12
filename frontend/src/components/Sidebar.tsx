import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Code,
  Sparkles,
  Trophy,
  Target,
  Layers,
  FileCode,
  Bot,
  Brain,
  BarChart2,
  Settings,
  ShieldAlert,
  Award
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Learning Modules', path: '/learn', icon: BookOpen },
  { name: 'Module Quizzes', path: '/quiz', icon: Award },
  { name: 'Interactive UML Lab', path: '/uml-lab', icon: Code },
  { name: 'Req-to-UML Parser', path: '/req-parser', icon: Sparkles },
  { name: 'Design Challenges', path: '/challenges', icon: Target },
  { name: 'Real Case Studies', path: '/case-studies', icon: Layers },
  { name: 'Design Patterns', path: '/patterns', icon: FileCode },
  { name: 'Code Lab (UML ↔ Code)', path: '/code-lab', icon: Code },
  { name: 'AI OOAD Mentor', path: '/ai-mentor', icon: Bot },
  { name: 'Viva Examiner', path: '/viva', icon: Brain },
  { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  { name: 'Achievements', path: '/achievements', icon: Award },
  { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 min-h-[calc(100vh-4rem)] p-4 flex-col justify-between transition-colors">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Core Platform
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700'
            }`
          }
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Admin Portal</span>
        </NavLink>
      </div>
    </aside>
  );
};

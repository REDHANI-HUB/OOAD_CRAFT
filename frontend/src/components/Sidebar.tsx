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
  Award,
  Github,
  Linkedin,
  UserCheck
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

      <div className="pt-3 space-y-3 border-t border-slate-200 dark:border-slate-800">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              isActive
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700'
            }`
          }
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Admin Portal</span>
        </NavLink>

        {/* Developer Self Credit Card */}
        <div className="p-3.5 bg-gradient-to-br from-indigo-50/90 via-slate-50 to-purple-50/50 dark:from-slate-800/90 dark:via-slate-900 dark:to-indigo-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Created By</span>
          </div>
          <div>
            <div className="font-extrabold text-xs text-slate-900 dark:text-white">
              Redhani Chelladurai
            </div>
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
              Department Of Information Technology
            </div>
          </div>
          <div className="flex items-center space-x-3 pt-1 border-t border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400">
            <a
              href="https://github.com/REDHANI-HUB"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center space-x-1 text-[11px] font-bold"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/redhani-chelladurai-884a87324/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center space-x-1 text-[11px] font-bold"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

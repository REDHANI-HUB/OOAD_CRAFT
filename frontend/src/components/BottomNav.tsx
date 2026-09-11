import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Code, Target, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const BottomNav: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const items = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Learn', path: '/learn', icon: BookOpen },
    { name: 'Practice', path: '/practice', icon: Target },
    { name: 'UML', path: '/uml-lab', icon: Code },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-2xl transition-colors">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1.5 px-3 rounded-xl min-w-[56px] min-h-[48px] transition-all touch-manipulation ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-semibold tracking-tight">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

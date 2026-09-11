import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 transition-colors text-center text-sm text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-800 dark:text-slate-200">OOADCRAFT</span> &copy; {new Date().getFullYear()} — Object-Oriented Analysis & Design Interactive Platform.
        </div>
        <div className="flex items-center space-x-6 text-xs font-semibold">
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
          <a href="#terms" className="hover:underline">Terms of Service</a>
          <a href="#curriculum" className="hover:underline">Curriculum Standard</a>
        </div>
      </div>
    </footer>
  );
};

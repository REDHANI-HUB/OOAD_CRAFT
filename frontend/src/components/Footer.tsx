import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 transition-colors text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <span className="font-extrabold text-slate-800 dark:text-slate-200">OOADCRAFT</span>
          <span>&copy; {new Date().getFullYear()} — Created with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline shrink-0 mx-0.5" />
          <span>by <strong className="text-slate-800 dark:text-slate-200">Redhani Chelladurai</strong> (Dept. of Information Technology)</span>
        </div>

        <div className="flex items-center space-x-5 font-semibold">
          <a
            href="https://github.com/REDHANI-HUB"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center space-x-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Profile</span>
          </a>
          <a
            href="https://www.linkedin.com/in/redhani-chelladurai-884a87324/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition inline-flex items-center space-x-1"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

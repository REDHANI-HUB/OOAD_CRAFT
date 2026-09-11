import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { Code, Sparkles, Target, Layers, FileCode, Bot } from 'lucide-react';

export const PracticePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">OOAD Practice Platform</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Specialized execution environment to practice UML modeling, SOLID refactoring, and pattern implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/uml-lab"
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 hover:border-indigo-500/50 transition group shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition">
                Interactive UML Lab
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Design class diagrams and sequence models with automated structural audit engine.
              </p>
            </Link>

            <Link
              to="/req-parser"
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 hover:border-indigo-500/50 transition group shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-600/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-500 transition">
                Requirement-to-UML Parser
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Extract Nouns, Verbs, Actors, and Use Cases from raw problem specifications.
              </p>
            </Link>

            <Link
              to="/challenges"
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 hover:border-indigo-500/50 transition group shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-600/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition">
                Design Challenges
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Solve scenario anti-patterns and refactor code violating SOLID principles.
              </p>
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

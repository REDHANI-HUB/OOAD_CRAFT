import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BookOpen, ShieldCheck, Code, Layers, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            OOAD Pedagogy Standard
          </span>
          <h1 className="text-4xl font-black">About OOADCRAFT</h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            OOADCRAFT is an interactive, gamified learning platform built specifically for computer science and engineering students mastering Object-Oriented Analysis & Design.
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-indigo-400">Core Educational Objectives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <h3 className="font-bold text-white flex items-center space-x-2">
                <Code className="w-4 h-4 text-sky-400" />
                <span>1. Requirements to UML Translation</span>
              </h3>
              <p className="text-xs text-slate-400">Extract domain entities, attributes, operations, and actors from messy real-world problem statements.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <h3 className="font-bold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>2. Structural Audit & Validation</span>
              </h3>
              <p className="text-xs text-slate-400">Audit class diagrams for Single Responsibility Principle (SRP) violations and loose associations.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

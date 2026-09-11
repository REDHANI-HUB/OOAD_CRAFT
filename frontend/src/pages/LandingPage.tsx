import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Sparkles, Trophy, BookOpen, Layers, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-20">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive OOAD Learning Platform for College Students</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Learn OOAD. Design Systems.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400">
              Master Clean Software Architecture.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal">
            From requirements parsing to UML diagrams, SOLID principles, design patterns, and full-stack implementation. All dynamically calculated and validated in real time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-extrabold rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center space-x-2 text-base transition"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 font-bold rounded-2xl border border-slate-700 flex items-center justify-center text-base transition"
            >
              Explore OOAD Curriculum
            </Link>
          </div>
        </div>

        {/* Requirements to Code Pipeline Visualization */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="text-xl font-extrabold text-center text-indigo-400 uppercase tracking-wider">
            The Complete OOAD Engineering Workflow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            {[
              { step: '01', title: 'Requirements', desc: 'Identify Nouns & Verbs' },
              { step: '02', title: 'Domain Model', desc: 'Use Cases & Class Identification' },
              { step: '03', title: 'UML Lab', desc: 'Interactive Canvas & Relationships' },
              { step: '04', title: 'Design Patterns', desc: 'Refactor for SOLID & Extensibility' },
              { step: '05', title: 'Executable Code', desc: 'Java, Python & C++ Skeleton' },
            ].map((s, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2 relative">
                <span className="text-xs font-mono text-indigo-400 font-bold">{s.step}</span>
                <h3 className="font-bold text-sm text-white">{s.title}</h3>
                <p className="text-xs text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Code,
              title: 'Interactive UML Lab',
              desc: 'Build Class, Sequence, and Use Case diagrams with instant OOAD structural audit validation.',
            },
            {
              icon: Sparkles,
              title: 'Requirement Parser',
              desc: 'Convert plain text problem statements directly into candidate classes, attributes, and relationships.',
            },
            {
              icon: Trophy,
              title: 'Dynamic Leaderboards',
              desc: 'Track XP, levels, and ranks across Global, University, Department, and Batch Year scopes.',
            },
            {
              icon: Layers,
              title: '10 Real Case Studies',
              desc: 'Architect enterprise solutions for ATMs, Food Delivery, Banking, and Library management.',
            },
            {
              icon: Zap,
              title: 'Code Lab (UML ↔ Code)',
              desc: 'Generate clean Java, Python, and C++ skeletons directly from your UML models.',
            },
            {
              icon: ShieldCheck,
              title: 'AI Viva Simulator',
              desc: 'Practice interactive viva voce examinations with an AI OOAD professor.',
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-3 hover:border-indigo-500/50 transition">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

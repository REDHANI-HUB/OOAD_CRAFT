import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { curriculumApi } from '../api';
import { Module } from '../types';
import { BookOpen, Award, ChevronRight } from 'lucide-react';

const DEFAULT_MODULES: Module[] = [
  {
    id: 1,
    title: 'Module 1: OOP Fundamentals & Encapsulation',
    description: 'Master Abstraction, Encapsulation, Inheritance, and Polymorphism with domain modeling.',
    orderIndex: 1,
    difficultyTier: 'BASICS',
    lessons: [
      {
        id: 1,
        title: 'Core Pillars of Object-Oriented Programming',
        description: 'Learn how objects model real-world domain entities with state and behavior.',
        contentText: 'Object-oriented programming rests on four fundamental pillars...',
        orderIndex: 1,
        xpReward: 100,
      },
      {
        id: 2,
        title: 'Encapsulation & Information Hiding',
        description: 'Protect internal object invariants using access modifiers and getter/setter abstractions.',
        contentText: 'Encapsulation restricts direct access to object components...',
        orderIndex: 2,
        xpReward: 120,
      },
    ],
  },
  {
    id: 2,
    title: 'Module 2: Object-Oriented Analysis & Requirements',
    description: 'Use Case Diagrams, Domain Modeling, and Identifying Candidate Classes.',
    orderIndex: 2,
    difficultyTier: 'BASICS',
    lessons: [
      {
        id: 3,
        title: 'Extracting Domain Classes from Requirements',
        description: 'Identify Nouns and Verbs in problem statements to construct initial domain models.',
        contentText: 'In OOAD, nouns in user requirements often map to classes...',
        orderIndex: 1,
        xpReward: 150,
      },
    ],
  },
  {
    id: 3,
    title: 'Module 3: Structural & Behavioral UML Diagrams',
    description: 'Class Diagrams, Sequence Diagrams, Use Cases, and Statecharts.',
    orderIndex: 3,
    difficultyTier: 'MEDIUM',
    lessons: [
      {
        id: 4,
        title: 'Class Relationships: Aggregation vs Composition',
        description: 'Distinguish strong lifecycle ownership (Composition) from loose HAS-A associations (Aggregation).',
        contentText: 'Composition represents strong lifecycle dependency...',
        orderIndex: 1,
        xpReward: 200,
      },
    ],
  },
  {
    id: 4,
    title: 'Module 4: SOLID Design Principles',
    description: 'Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.',
    orderIndex: 4,
    difficultyTier: 'MEDIUM',
    lessons: [
      {
        id: 5,
        title: 'The Single Responsibility Principle (SRP)',
        description: 'A class should have one, and only one, reason to change.',
        contentText: 'SRP states that a software module should have one reason to change...',
        orderIndex: 1,
        xpReward: 250,
      },
    ],
  },
  {
    id: 5,
    title: 'Module 5: Creational, Structural & Behavioral Patterns',
    description: 'Factory, Singleton, Observer, Strategy, Decorator, Adapter.',
    orderIndex: 5,
    difficultyTier: 'ADVANCED',
    lessons: [
      {
        id: 6,
        title: 'The Strategy Design Pattern',
        description: 'Encapsulate interchangeable algorithms into separate classes.',
        contentText: 'Strategy pattern defines a family of algorithms...',
        orderIndex: 1,
        xpReward: 300,
      },
    ],
  },
  {
    id: 6,
    title: 'Module 6: Enterprise Architecture & Case Studies',
    description: 'Architecting scalable systems from requirements to code.',
    orderIndex: 6,
    difficultyTier: 'ADVANCED',
    lessons: [
      {
        id: 7,
        title: 'Architecting a Scalable ATM System',
        description: 'End-to-end design walkthrough of an automated teller machine.',
        contentText: 'Learn how hardware interfaces and transaction logs interact...',
        orderIndex: 1,
        xpReward: 350,
      },
    ],
  },
];

export const LearningModulesPage: React.FC = () => {
  const [modules, setModules] = useState<Module[]>(DEFAULT_MODULES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    curriculumApi
      .getAllModules()
      .then((res) => {
        if (res && res.length > 0) {
          setModules(res);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight">OOAD Curriculum Modules</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              6 sequential modules taking you from core OOP principles to enterprise architectural design.
            </p>
          </div>

          <div className="space-y-6">
            {modules.map((m) => {
              const tier = (m.difficultyTier || (m as any).tierLevel || 'BASICS').toUpperCase();
              const lessonsToDisplay = (m.lessons && m.lessons.length > 0)
                ? m.lessons
                : (DEFAULT_MODULES.find(dm => dm.id === m.id || dm.orderIndex === m.orderIndex)?.lessons || []);

              return (
                <div
                  key={m.id}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 hover:border-indigo-500/40 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          Module {m.orderIndex}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                            tier === 'BASICS'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : tier === 'MEDIUM'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {tier}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{m.title}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{m.description}</p>
                    </div>

                    <Link
                      to={`/quizzes/module/${m.id}`}
                      className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-xs flex items-center space-x-1.5 shrink-0 transition"
                    >
                      <Award className="w-4 h-4" />
                      <span>Take Module Quiz</span>
                    </Link>
                  </div>

                  {/* Lessons List inside Module */}
                  <div className="space-y-2">
                    {lessonsToDisplay.length > 0 ? (
                      lessonsToDisplay.map((les) => (
                        <Link
                          key={les.id}
                          to={`/lessons/${les.id}`}
                          className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50/50 dark:hover:bg-slate-800 transition group border border-transparent hover:border-indigo-500/20"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs">
                              {les.orderIndex}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
                                {les.title}
                              </div>
                              <div className="text-xs text-slate-400">{les.description}</div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            <span>+{les.xpReward} XP</span>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-xs text-slate-400 py-2 italic">No lessons available.</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

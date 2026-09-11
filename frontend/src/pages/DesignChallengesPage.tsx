import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { challengeApi } from '../api';
import { DesignChallenge } from '../types';
import { Target, Zap, CheckCircle2 } from 'lucide-react';

const DEFAULT_CHALLENGES: DesignChallenge[] = [
  {
    id: 1,
    title: 'Fix the Monolithic Order System',
    description: 'Refactor a bloated OrderManager class violating SRP and OCP.',
    scenarioText: 'The current OrderManager handles payment processing, PDF invoice generation, email notifications, and database operations in a single class.',
    starterRequirements: 'Extract PaymentProcessor, InvoiceService, and NotificationService interfaces to restore single responsibility cohesion.',
    difficulty: 'MEDIUM',
    xpReward: 300,
  },
  {
    id: 2,
    title: 'Design an Elastic Payment Gateway',
    description: 'Apply Strategy Pattern to support PayPal, Stripe, and Crypto dynamically.',
    scenarioText: 'Build a PaymentProcessor that switches payment providers dynamically at runtime based on merchant settings.',
    starterRequirements: 'Define a PaymentStrategy interface with processPayment(double amount) and implement PayPalStrategy and StripeStrategy.',
    difficulty: 'ADVANCED',
    xpReward: 450,
  },
  {
    id: 3,
    title: 'Refactor Tight Coupling in Notification Engine',
    description: 'Use Dependency Inversion (DIP) to decouple NotificationService from SMTPClient.',
    scenarioText: 'NotificationService directly instantiates SmtpClient, making it impossible to unit test or support Push/SMS notifications.',
    starterRequirements: 'Introduce a MessageSender interface so NotificationService depends on abstractions rather than concrete SMTP classes.',
    difficulty: 'MEDIUM',
    xpReward: 350,
  },
];

export const DesignChallengesPage: React.FC = () => {
  const [challenges, setChallenges] = useState<DesignChallenge[]>(DEFAULT_CHALLENGES);
  const [activeChallenge, setActiveChallenge] = useState<DesignChallenge>(DEFAULT_CHALLENGES[0]);
  const [solution, setSolution] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    challengeApi
      .getAll()
      .then((res) => {
        if (res && res.length > 0) {
          setChallenges(res);
          setActiveChallenge(res[0]);
        }
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async () => {
    if (!activeChallenge) return;
    try {
      await challengeApi.submit(activeChallenge.id, solution);
    } catch {}
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">OOAD Design Challenges</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Refactor anti-patterns and solve real-world architectural scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Challenge Selector Sidebar */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Challenge</h3>
              {challenges.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveChallenge(c);
                    setSuccess(false);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    activeChallenge?.id === c.id
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="font-bold text-sm">{c.title}</div>
                  <div className="flex items-center space-x-2 text-xs mt-1 opacity-80">
                    <span className="px-2 py-0.5 rounded bg-black/20 font-mono">{c.difficulty}</span>
                    <span>+{c.xpReward} XP</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Challenge Execution Workspace */}
            {activeChallenge && (
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">{activeChallenge.title}</h2>
                    <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold text-xs rounded-full">
                      +{activeChallenge.xpReward} XP
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{activeChallenge.description}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl font-mono text-xs text-slate-700 dark:text-slate-300 space-y-2">
                  <div className="font-bold text-indigo-500 uppercase tracking-wider">// Scenario Code Smell Problem</div>
                  <div>{activeChallenge.scenarioText}</div>
                </div>

                {success && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-300 rounded-2xl text-xs font-bold flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Challenge solved successfully! +{activeChallenge.xpReward} XP added to your profile!</span>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Proposed Refactored Class / Pattern Solution
                  </label>
                  <textarea
                    rows={6}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Write your refactored class design, interface definitions, or pattern implementation here..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 font-extrabold text-white rounded-2xl shadow-lg shadow-indigo-500/20 text-xs flex items-center justify-center space-x-2 transition"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Submit Solution & Claim XP</span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

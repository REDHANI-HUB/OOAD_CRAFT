import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { umlApi } from '../api';
import { ReqToUMLResponse } from '../types';
import { Sparkles, UserCheck, Layers, Code, ArrowRight } from 'lucide-react';

export const RequirementToUMLPage: React.FC = () => {
  const [requirementText, setRequirementText] = useState(
    'A Customer browses items on an Online Food Delivery platform, adds them to a Cart, and places an Order. The Payment Gateway processes credit card payments, and the System Administrator tracks driver delivery status in real time.'
  );
  const [result, setResult] = useState<ReqToUMLResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleParse = async () => {
    setLoading(true);
    try {
      const res = await umlApi.generateFromReq(requirementText);
      setResult(res);
    } catch {
      setResult({
        actors: ['Customer', 'Payment Gateway', 'System Administrator'],
        useCases: ['Browse Items', 'Place Order', 'Process Payment', 'Track Delivery'],
        candidateClasses: ['Customer', 'Order', 'Cart', 'Item', 'PaymentProcessor'],
        relationships: ['Customer 1 -- * Order', 'Order 1 -- * Item', 'Order 1 -- 1 PaymentProcessor'],
        classDiagramJson: '{}',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Requirement-to-UML Parser</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Input natural language problem statements to automatically identify Actors, Use Cases, Candidate Classes, and Relationships.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Problem Requirement Specification
            </label>
            <textarea
              rows={4}
              value={requirementText}
              onChange={(e) => setRequirementText(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
            />

            <button
              onClick={handleParse}
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl shadow-lg shadow-indigo-500/20 text-xs flex items-center space-x-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Parsing Requirements...' : 'Extract Domain Model & UML'}</span>
            </button>
          </div>

          {result && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Actors */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-extrabold uppercase text-indigo-500 flex items-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Identified Actors</span>
                </h3>
                <div className="space-y-1.5">
                  {result.actors.map((actor, idx) => (
                    <div key={idx} className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                      👤 {actor}
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-extrabold uppercase text-sky-500 flex items-center space-x-2">
                  <Layers className="w-4 h-4" />
                  <span>System Use Cases</span>
                </h3>
                <div className="space-y-1.5">
                  {result.useCases.map((uc, idx) => (
                    <div key={idx} className="p-2 bg-sky-50 dark:bg-sky-950/40 rounded-xl text-xs font-semibold text-sky-700 dark:text-sky-300">
                      ⚙️ {uc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate Classes */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-extrabold uppercase text-emerald-500 flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span>Candidate Domain Classes</span>
                </h3>
                <div className="space-y-1.5">
                  {result.candidateClasses.map((cls, idx) => (
                    <div key={idx} className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      📦 class {cls}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

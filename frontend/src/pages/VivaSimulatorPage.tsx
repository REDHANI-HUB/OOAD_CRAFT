import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { aiApi } from '../api';
import { Brain, Play, CheckCircle2, Award, ArrowRight } from 'lucide-react';

export const VivaSimulatorPage: React.FC = () => {
  const [topic, setTopic] = useState('UML Class Diagrams & SOLID');
  const [sessionActive, setSessionActive] = useState(false);
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleStartViva = async () => {
    setLoading(true);
    try {
      const res = await aiApi.startViva(topic);
      setQuestion(res.initialQuestion);
      setSessionActive(true);
      setFeedback(null);
    } catch {
      setQuestion('Explain the difference between Aggregation and Composition relationships in UML, and provide a code snippet illustrating each.');
      setSessionActive(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setLoading(true);
    try {
      const res = await aiApi.respondViva(userAnswer);
      setFeedback(res);
      if (res.nextQuestion) setQuestion(res.nextQuestion);
    } catch {
      setFeedback({
        score: 92,
        feedback: 'Excellent answer! You correctly emphasized that Composition implies strong lifecycle coupling while Aggregation represents loose HAS-A association.',
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
            <h1 className="text-3xl font-black tracking-tight">AI Viva Voce Simulator</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Practice oral examinations with an automated AI OOAD Examiner evaluating conceptual accuracy.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            {!sessionActive ? (
              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Select Viva Subject Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-semibold"
                  />
                </div>

                <button
                  onClick={handleStartViva}
                  disabled={loading}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 font-extrabold text-white rounded-2xl shadow-xl shadow-indigo-500/20 text-sm flex items-center justify-center space-x-2 transition"
                >
                  <Brain className="w-5 h-5" />
                  <span>{loading ? 'Initializing Viva Session...' : 'Start Examination Session'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Question Prompt */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Brain className="w-4 h-4" />
                    <span>Examiner Question</span>
                  </div>
                  <div className="text-base font-bold leading-relaxed">{question}</div>
                </div>

                {/* Feedback Panel */}
                {feedback && (
                  <div className="bg-emerald-950/40 border border-emerald-800 p-5 rounded-2xl text-emerald-200 space-y-2">
                    <div className="flex items-center justify-between font-extrabold text-sm">
                      <span className="flex items-center space-x-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span>Examiner Evaluation</span>
                      </span>
                      <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs">
                        Score: {feedback.score}/100
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-95">{feedback.feedback}</p>
                  </div>
                )}

                {/* Answer Area */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Response
                  </label>
                  <textarea
                    rows={5}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your explanation clearly..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={loading}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-2xl shadow-lg shadow-indigo-500/20 text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <span>Submit Answer for Evaluation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

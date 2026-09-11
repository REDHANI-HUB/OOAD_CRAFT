import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { aiApi } from '../api';
import { Bot, Send, Sparkles, User as UserIcon } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export const AIOOADMentorPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hello! I am your AI OOAD Mentor. Ask me any questions about Encapsulation, SOLID principles, Design Patterns, or UML relationships!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await aiApi.explainConcept(userMsg);
      const reply = `${res.explanation}\n\n💡 Real-World Analogy: ${res.analogy}\n\n🎯 Key Takeaway: ${res.keyTakeaway}`;
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'In Object-Oriented Analysis & Design, maintaining high cohesion within classes while minimizing coupling between external packages is key to building extensible software.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
          <div className="space-y-1 shrink-0">
            <h1 className="text-3xl font-black tracking-tight">AI OOAD Mentor</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Interactive architectural tutor for SOLID principles, design patterns, and code smells.
            </p>
          </div>

          <div className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start space-x-3 ${
                    m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      m.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gradient-to-tr from-purple-600 to-indigo-500 text-white'
                    }`}
                  >
                    {m.sender === 'user' ? 'You' : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm max-w-xl whitespace-pre-wrap leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-indigo-600 text-white font-medium'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center space-x-2 text-xs text-indigo-400 font-semibold">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>AI Mentor is crafting explanation...</span>
                </div>
              )}
            </div>

            {/* Input form */}
            <form onSubmit={handleSend} className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about SRP, Open-Closed Principle, Factory Pattern, or Class Aggregation..."
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-500/20 flex items-center space-x-1 shrink-0 transition"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

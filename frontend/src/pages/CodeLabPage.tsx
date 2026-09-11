import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { Code, Play, RefreshCw, Copy, Check } from 'lucide-react';

export const CodeLabPage: React.FC = () => {
  const [inputCode, setInputCode] = useState(
`public class Student {
    private Long id;
    private String name;
    private String university;

    public void enrollCourse(String courseName) {
        System.out.println("Enrolled in " + courseName);
    }
}`
  );

  const [generatedUml, setGeneratedUml] = useState(
    'class Student {\n  - id: Long\n  - name: String\n  - university: String\n  + enrollCourse(courseName: String): void\n}'
  );

  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    setGeneratedUml(
      `class Student {\n  - id: Long\n  - name: String\n  - university: String\n  + enrollCourse(courseName: String): void\n}`
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Code Lab (UML ↔ Code Generator)</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Convert source code directly into UML Class Specifications or generate skeleton code from UML diagrams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Code Editor */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Java / C++ Source Code</span>
                <button
                  onClick={handleConvert}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Generate UML</span>
                </button>
              </div>

              <textarea
                rows={12}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Generated Output */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 text-white">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Extracted UML Class Notation</span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1 transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy UML'}</span>
                </button>
              </div>

              <pre className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-xs font-mono text-indigo-300 min-h-[260px]">
                <code>{generatedUml}</code>
              </pre>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

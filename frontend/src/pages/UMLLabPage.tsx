import React from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { InteractiveUMLEditor } from '../components/InteractiveUMLEditor';

export const UMLLabPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Interactive UML Lab</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Design class diagrams, sequence diagrams, and use cases with automated OOAD structural audit validation.
            </p>
          </div>

          <InteractiveUMLEditor />
        </main>
      </div>

      <Footer />
    </div>
  );
};

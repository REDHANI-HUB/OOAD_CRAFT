import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { curriculumApi } from '../api';
import { Lesson } from '../types';
import { CheckCircle2, ArrowLeft, Zap, Play, Award, Code, BookOpen, Layers } from 'lucide-react';

const DEFAULT_LESSONS: Record<number, Lesson> = {
  1: {
    id: 1,
    title: 'Core Pillars of Object-Oriented Programming',
    description: 'Learn how objects model real-world domain entities with state and behavior.',
    contentText: `Object-Oriented Analysis and Design (OOAD) models complex software applications as a collection of interacting objects that combine data (attributes) and behavior (methods).

### The 4 Core Pillars:
1. **Abstraction**: Modeling real-world entities by focusing on essential characteristics while suppressing unnecessary implementation details.
2. **Encapsulation**: Bundling state variables and behavior within a class and restricting direct access via private/protected modifiers.
3. **Inheritance**: Establishing a IS-A hierarchy to reuse code and define common general attributes in parent base classes.
4. **Polymorphism**: Allowing dynamic method dispatch so different derived classes respond uniquely to identical interface calls.`,
    videoUrl: 'https://www.youtube.com/embed/pTB0EiLXUC8',
    orderIndex: 1,
    xpReward: 100,
    moduleId: 1,
  },
  2: {
    id: 2,
    title: 'Encapsulation & Information Hiding',
    description: 'Protect internal object invariants using access modifiers and getter/setter abstractions.',
    contentText: `Encapsulation ensures that an object maintains full control over its internal state, preventing external code from mutating fields directly into invalid configurations.

### Implementation Rules:
- Declare all instance fields as **private** (\`-\`).
- Provide public getter and setter methods (\`+\`) that enforce validation logic.
- Prevent representation exposure by returning defensive copies of mutable references.`,
    videoUrl: 'https://www.youtube.com/embed/pTB0EiLXUC8',
    orderIndex: 2,
    xpReward: 120,
    moduleId: 1,
  },
  3: {
    id: 3,
    title: 'Extracting Domain Classes from Requirements',
    description: 'Identify Nouns and Verbs in problem statements to construct initial domain models.',
    contentText: `In Object-Oriented Analysis, requirement specifications serve as the primary source for domain discovery:

- **Nouns & Noun Phrases** $\\rightarrow$ Candidate Classes or Attributes (e.g. *Customer*, *Order*, *Invoice*).
- **Verbs & Verb Phrases** $\\rightarrow$ Candidate Operations/Methods (e.g. *placeOrder()*, *calculateTotal()*).
- **Possessive Phrases** $\\rightarrow$ Attributes or Associations (e.g. *customer's address*).`,
    videoUrl: 'https://www.youtube.com/embed/pTB0EiLXUC8',
    orderIndex: 1,
    xpReward: 150,
    moduleId: 2,
  },
  4: {
    id: 4,
    title: 'Class Relationships: Aggregation vs Composition',
    description: 'Distinguish strong lifecycle ownership (Composition) from loose HAS-A associations (Aggregation).',
    contentText: `UML Class Diagrams explicitly represent structural coupling between domain classes:

- **Composition (\`<#>--\`)**: Strong whole-part relationship where parts cannot exist without the whole container. Destroying the parent destroys all child parts (e.g. *Building* $\\rightarrow$ *Room*).
- **Aggregation (\`<>--\`)**: Weak whole-part relationship where parts have independent lifecycles (e.g. *Department* $\\rightarrow$ *Professor*).`,
    videoUrl: 'https://www.youtube.com/embed/pTB0EiLXUC8',
    orderIndex: 1,
    xpReward: 200,
    moduleId: 3,
  },
  5: {
    id: 5,
    title: 'The Single Responsibility Principle (SRP)',
    description: 'A class should have one, and only one, reason to change.',
    contentText: `Single Responsibility Principle (SRP) dictates that a software module or class should perform one cohesive responsibility.

When a class handles multiple responsibilities (such as domain calculations, database persistence, and UI rendering), modifying one responsibility creates unintended bugs in another. Always refactor multi-responsibility monolithic classes into decoupled interfaces!`,
    videoUrl: 'https://www.youtube.com/embed/pTB0EiLXUC8',
    orderIndex: 1,
    xpReward: 250,
    moduleId: 4,
  },
  6: {
    id: 6,
    title: 'The Strategy Design Pattern',
    description: 'Encapsulate interchangeable algorithms into separate classes.',
    contentText: `The Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime without modifying the context client class.

Use Strategy whenever you encounter conditional branching (\`if/else\` or \`switch\`) based on algorithm types (e.g., Payment Methods: Credit Card, PayPal, Crypto).`,
    videoUrl: 'https://www.youtube.com/embed/pTB0EiLXUC8',
    orderIndex: 1,
    xpReward: 300,
    moduleId: 5,
  },
  7: {
    id: 7,
    title: 'Architecting a Scalable ATM System',
    description: 'End-to-end design walkthrough of an automated teller machine.',
    contentText: `Designing an ATM requires integrating physical hardware interfaces (Card Reader, Cash Dispenser, Keypad) with banking transaction backends.

Focus on hardware lifecycle state machines, thread-safe balance updates, and rollback transaction handling.`,
    videoUrl: 'https://www.youtube.com/embed/pTB0EiLXUC8',
    orderIndex: 1,
    xpReward: 350,
    moduleId: 6,
  },
};

export const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lessonId = Number(id) || 1;

  const [lesson, setLesson] = useState<Lesson>(DEFAULT_LESSONS[lessonId] || DEFAULT_LESSONS[1]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fallback = DEFAULT_LESSONS[lessonId] || DEFAULT_LESSONS[1];
    curriculumApi
      .getLessonById(lessonId)
      .then((res) => {
        if (res && res.title) {
          setLesson(res);
        } else {
          setLesson(fallback);
        }
      })
      .catch(() => {
        setLesson(fallback);
      })
      .finally(() => setLoading(false));
  }, [lessonId]);

  const handleComplete = async () => {
    try {
      await curriculumApi.completeLesson(lesson.id);
    } catch {}
    setCompleted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <Link to="/learn" className="inline-flex items-center space-x-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Curriculum Modules</span>
          </Link>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Lesson {lesson.orderIndex}
                </span>
                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white">{lesson.title}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">{lesson.description}</p>
              </div>

              <button
                onClick={handleComplete}
                disabled={completed}
                className={`px-6 py-3 rounded-2xl font-extrabold text-sm flex items-center space-x-2 shrink-0 transition ${
                  completed
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{completed ? 'Completed! +XP Awarded' : `Mark Completed (+${lesson.xpReward} XP)`}</span>
              </button>
            </div>

            {/* Video Player if available */}
            {lesson.videoUrl && (
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 shadow-xl border border-slate-800">
                <iframe
                  src={lesson.videoUrl}
                  title={lesson.title}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Lesson Body Content */}
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-4 text-base leading-relaxed">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Conceptual Deep-Dive</h3>
              <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{lesson.contentText}</div>

              <div className="bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl font-mono text-sm space-y-2 mt-4">
                <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider">// Core Architectural Axiom</div>
                <div className="text-slate-800 dark:text-slate-200 font-semibold">
                  High Cohesion + Low Coupling = Maintainable & Extensible OO Architecture
                </div>
              </div>
            </div>

            {/* Interactive Triggers */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4">
              <Link
                to="/uml-lab"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center space-x-2 transition"
              >
                <Code className="w-4 h-4" />
                <span>Practice in Interactive UML Lab</span>
              </Link>
              <Link
                to={`/quizzes/module/${lesson.moduleId || 1}`}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center space-x-2 transition"
              >
                <Award className="w-4 h-4" />
                <span>Take Module Quiz</span>
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

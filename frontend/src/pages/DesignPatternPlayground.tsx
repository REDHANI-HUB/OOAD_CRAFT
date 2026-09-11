import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { patternApi } from '../api';
import { DesignPattern } from '../types';

const DEFAULT_PATTERNS: DesignPattern[] = [
  {
    id: 1,
    category: 'CREATIONAL',
    name: 'Factory Method Pattern',
    problem: 'Creating objects directly via constructors leads to tight coupling between client classes and concrete implementations.',
    solution: 'Define an interface or abstract class for creating an object, but let subclasses decide which class to instantiate.',
    javaCode: 'public interface Button { void render(); }\npublic class WindowsButton implements Button {\n    public void render() {\n        System.out.println("Render Windows Native Button");\n    }\n}\npublic abstract class Dialog {\n    public abstract Button createButton();\n}',
    pythonCode: 'from abc import ABC, abstractmethod\n\nclass Button(ABC):\n    @abstractmethod\n    def render(self):\n        pass\n\nclass WindowsButton(Button):\n    def render(self):\n        print("Render Windows Button")',
    cppCode: 'class Button {\npublic:\n    virtual void render() = 0;\n};\n\nclass WindowsButton : public Button {\npublic:\n    void render() override {\n        std::cout << "Render Windows Button";\n    }\n};',
  },
  {
    id: 2,
    category: 'CREATIONAL',
    name: 'Singleton Pattern',
    problem: 'Ensuring a class has only one global instance throughout application lifecycle (e.g. Database connection pool, Logger).',
    solution: 'Make the constructor private and provide a thread-safe static accessor method.',
    javaCode: 'public class DatabaseConnection {\n    private static DatabaseConnection instance;\n    private DatabaseConnection() {}\n    public static synchronized DatabaseConnection getInstance() {\n        if (instance == null) {\n            instance = new DatabaseConnection();\n        }\n        return instance;\n    }\n}',
    pythonCode: 'class DatabaseConnection:\n    _instance = None\n    def __new__(cls):\n        if not cls._instance:\n            cls._instance = super().__new__(cls)\n        return cls._instance',
    cppCode: 'class Singleton {\nprivate:\n    static Singleton* instance;\n    Singleton() {}\npublic:\n    static Singleton* getInstance() {\n        if (!instance) instance = new Singleton();\n        return instance;\n    }\n};',
  },
  {
    id: 3,
    category: 'BEHAVIORAL',
    name: 'Observer Pattern',
    problem: 'Multiple subscriber objects need to react dynamically whenever a publisher object changes state, without tight coupling.',
    solution: 'Define a one-to-many dependency between objects so that when one changes state, all dependents are notified automatically.',
    javaCode: 'public interface Observer {\n    void update(String event);\n}\npublic class NewsAgency {\n    private List<Observer> observers = new ArrayList<>();\n    public void addObserver(Observer o) { observers.add(o); }\n    public void notifyAll(String news) { observers.forEach(o -> o.update(news)); }\n}',
    pythonCode: 'class Subject:\n    def __init__(self):\n        self._observers = []\n    def attach(self, observer):\n        self._observers.append(observer)\n    def notify(self, data):\n        for obs in self._observers:\n            obs.update(data)',
    cppCode: 'class Observer {\npublic:\n    virtual void update(const std::string& message) = 0;\n};',
  },
  {
    id: 4,
    category: 'BEHAVIORAL',
    name: 'Strategy Pattern',
    problem: 'Encapsulate a family of algorithms so they can be selected dynamically at runtime based on context.',
    solution: 'Define a Strategy interface and concrete algorithm implementations, passing the selected strategy into the context class.',
    javaCode: 'public interface PaymentStrategy {\n    void pay(double amount);\n}\npublic class CreditCardStrategy implements PaymentStrategy {\n    public void pay(double amount) { System.out.println("Paid $" + amount + " via Credit Card"); }\n}',
    pythonCode: 'class PaymentStrategy(ABC):\n    @abstractmethod\n    def pay(self, amount):\n        pass',
    cppCode: 'class PaymentStrategy {\npublic:\n    virtual void pay(double amount) = 0;\n};',
  },
  {
    id: 5,
    category: 'STRUCTURAL',
    name: 'Adapter Pattern',
    problem: 'An existing class has useful functionality but its interface does not match the target interface required by modern client code.',
    solution: 'Wrap the existing legacy class inside an Adapter class matching the target interface.',
    javaCode: 'public class LegacyPrinterAdapter implements ModernPrinter {\n    private LegacyPrinter legacyPrinter;\n    public LegacyPrinterAdapter(LegacyPrinter legacy) { this.legacyPrinter = legacy; }\n    public void printDocument() { legacyPrinter.oldPrintFormat(); }\n}',
    pythonCode: 'class PrinterAdapter(ModernPrinter):\n    def __init__(self, legacy_printer):\n        self.legacy = legacy_printer\n    def print_doc(self):\n        self.legacy.old_print()',
    cppCode: 'class Adapter : public Target {\nprivate:\n    Adaptee* adaptee;\npublic:\n    void request() override { adaptee->specificRequest(); }\n};',
  },
];

export const DesignPatternPlayground: React.FC = () => {
  const [patterns, setPatterns] = useState<DesignPattern[]>(DEFAULT_PATTERNS);
  const [activePattern, setActivePattern] = useState<DesignPattern>(DEFAULT_PATTERNS[0]);
  const [language, setLanguage] = useState<'java' | 'python' | 'cpp'>('java');

  useEffect(() => {
    patternApi
      .getAll()
      .then((res) => {
        if (res && res.length > 0) {
          setPatterns(res);
          setActivePattern(res[0]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Design Pattern Playground</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Interactive reference and code playground for Creational, Structural, and Behavioral patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pattern List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Patterns Index</h3>
              {patterns.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePattern(p)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    activePattern?.id === p.id
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="font-bold text-sm">{p.name}</div>
                  <div className="text-xs opacity-80 mt-1 uppercase font-mono tracking-wider">{p.category}</div>
                </button>
              ))}
            </div>

            {/* Active Pattern Details & Code Viewer */}
            {activePattern && (
              <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
                <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs rounded-full uppercase">
                    {activePattern.category} Pattern
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">{activePattern.name}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{activePattern.problem}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Solution Architecture</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{activePattern.solution}</p>
                </div>

                {/* Language Switcher */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Executable Code Skeleton</h4>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl text-xs font-bold">
                      {(['java', 'python', 'cpp'] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`px-3 py-1 rounded-lg uppercase transition ${
                            language === lang ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <pre className="bg-slate-950 border border-slate-800 text-slate-200 p-5 rounded-2xl text-xs font-mono overflow-x-auto">
                    <code>
                      {language === 'java'
                        ? activePattern.javaCode
                        : language === 'python'
                        ? activePattern.pythonCode
                        : activePattern.cppCode}
                    </code>
                  </pre>
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

import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';
import { caseStudyApi } from '../api';
import { CaseStudy } from '../types';
import { Layers, CheckCircle2, ArrowRight, Code, ShieldCheck, RefreshCw, Cpu, Database, Play, Sparkles, AlertCircle } from 'lucide-react';

interface RealisticCaseStudyDetail {
  id: number;
  title: string;
  industry: string;
  xpReward: number;
  problemStatement: string;
  functionalRequirements: string[];
  candidateEntities: { name: string; type: string; attributes: string[] }[];
  recommendedPatterns: { name: string; purpose: string }[];
  referenceUmlNodes: { name: string; attrs: string[]; methods: string[] }[];
}

const REALISTIC_CASE_STUDIES: RealisticCaseStudyDetail[] = [
  {
    id: 1,
    title: 'Automated Teller Machine (ATM) System',
    industry: 'Banking',
    xpReward: 500,
    problemStatement: 'Design an automated teller machine (ATM) hardware & banking network that processes cash withdrawals, balance inquiries, pin authentication, and transfer operations securely.',
    functionalRequirements: [
      'Authenticate user cards using 4-digit PIN against Central Bank Server.',
      'Dispense cash safely ensuring physical cash hardware inventory is updated.',
      'Log atomic transactions with rollback support in case of hardware jam.',
      'Support multi-bank interbank transaction switching (VISA/MasterCard/Cirrus).',
    ],
    candidateEntities: [
      { name: 'ATM', type: 'System Controller', attributes: ['- atmId: String', '- location: String'] },
      { name: 'CardReader', type: 'Hardware Interface', attributes: ['- currentCard: Card'] },
      { name: 'CashDispenser', type: 'Hardware Interface', attributes: ['- cashInventory: Map<Bill, Integer>'] },
      { name: 'Account', type: 'Domain Entity', attributes: ['- accountNumber: String', '- balance: Double'] },
      { name: 'BankServer', type: 'External System', attributes: ['- bankCode: String'] },
    ],
    recommendedPatterns: [
      { name: 'State Pattern', purpose: 'Manage ATM hardware states (Idle, CardInserted, PinEntered, DispensingCash, OutOfCash).' },
      { name: 'Command Pattern', purpose: 'Encapsulate financial operations (DepositCommand, WithdrawCommand) for audit logging & rollback.' },
    ],
    referenceUmlNodes: [
      { name: 'ATM', attrs: ['- atmId: String', '- currentBalance: Double'], methods: ['+ authenticatePin(pin: String): Boolean', '+ withdrawCash(amount: Double): Boolean'] },
      { name: 'CardReader', attrs: ['- isCardInserted: Boolean'], methods: ['+ readCard(): Card', '+ ejectCard(): Void'] },
      { name: 'CashDispenser', attrs: ['- totalCashRemaining: Double'], methods: ['+ dispense(amount: Double): Boolean'] },
      { name: 'Account', attrs: ['- accountNumber: String', '- balance: Double'], methods: ['+ debit(amt: Double): Boolean', '+ credit(amt: Double): Void'] },
    ],
  },
  {
    id: 2,
    title: 'Online Food Delivery Platform (UberEats Style)',
    industry: 'E-Commerce',
    xpReward: 600,
    problemStatement: 'Architect a scalable multi-sided marketplace connecting Customers, Restaurant Kitchens, Delivery Drivers, and Payment Gateways with real-time order tracking.',
    functionalRequirements: [
      'Allow Customers to browse menus, customize meal options, and place orders.',
      'Match nearest available Delivery Driver based on GPS proximity algorithm.',
      'Track order status transitions (Placed -> Accepted -> Preparing -> OutForDelivery -> Delivered).',
      'Process dynamic surge pricing and delivery fee calculation.',
    ],
    candidateEntities: [
      { name: 'Customer', type: 'User Actor', attributes: ['- customerId: Long', '- deliveryAddress: String'] },
      { name: 'Restaurant', type: 'Merchant Partner', attributes: ['- restaurantId: Long', '- menu: List<MenuItem>'] },
      { name: 'Order', type: 'Domain Entity', attributes: ['- orderId: String', '- status: OrderStatus', '- total: Double'] },
      { name: 'DeliveryDriver', type: 'Fleet Actor', attributes: ['- driverId: Long', '- currentGeoLocation: GeoPoint'] },
      { name: 'PaymentGateway', type: 'External Service', attributes: ['- providerName: String'] },
    ],
    recommendedPatterns: [
      { name: 'Observer Pattern', purpose: 'Notify Customer, Restaurant, and Driver instantly when order status changes.' },
      { name: 'Strategy Pattern', purpose: 'Calculate dynamic delivery fee based on Distance vs Surge Multiplier.' },
    ],
    referenceUmlNodes: [
      { name: 'Order', attrs: ['- id: Long', '- status: OrderStatus', '- totalAmount: Double'], methods: ['+ assignDriver(driver: Driver): Void', '+ updateStatus(status: Status): Void'] },
      { name: 'Restaurant', attrs: ['- id: Long', '- name: String'], methods: ['+ acceptOrder(orderId: Long): Boolean', '+ markReady(): Void'] },
      { name: 'DeliveryDriver', attrs: ['- id: Long', '- isAvailable: Boolean'], methods: ['+ acceptDelivery(order: Order): Boolean', '+ updateLocation(lat: Double, lng: Double): Void'] },
    ],
  },
  {
    id: 3,
    title: 'Digital Library Management System',
    industry: 'Education',
    xpReward: 450,
    problemStatement: 'Model book cataloging, borrowing limits, fine calculation strategies, and reservation queue state machines.',
    functionalRequirements: [
      'Catalog books by ISBN, Author, Category, and Rack Location.',
      'Enforce member borrowing quotas (e.g. Max 5 books for 14 days).',
      'Calculate overdue fines dynamically ($1/day for standard, $5/day for reference books).',
      'Maintain reservation queue for high-demand titles.',
    ],
    candidateEntities: [
      { name: 'BookItem', type: 'Inventory Asset', attributes: ['- barcode: String', '- status: BookStatus'] },
      { name: 'Member', type: 'User Entity', attributes: ['- memberId: String', '- activeBorrows: List<BookItem>'] },
      { name: 'FineCalculator', type: 'Business Logic', attributes: ['- dailyRate: Double'] },
    ],
    recommendedPatterns: [
      { name: 'Strategy Pattern', purpose: 'Encapsulate different fine rules for Students vs Faculty members.' },
    ],
    referenceUmlNodes: [
      { name: 'BookItem', attrs: ['- barcode: String', '- isReserved: Boolean'], methods: ['+ checkout(member: Member): Boolean', '+ returnBook(): Void'] },
      { name: 'Member', attrs: ['- memberId: String', '- totalFines: Double'], methods: ['+ issueBook(book: BookItem): Boolean', '+ payFine(amount: Double): Void'] },
    ],
  },
  {
    id: 4,
    title: 'Railway Ticket Reservation System (IRCTC Style)',
    industry: 'Transportation',
    xpReward: 550,
    problemStatement: 'Design train schedule lookup, coach layouts (AC1, AC2, Sleeper), seat quota allocation (General, Tatkal, Senior Citizen), and ticket cancellation refund workflows.',
    functionalRequirements: [
      'Maintain train schedules across stations with intermediate departure times.',
      'Allocate seats across multiple coach classes and quotas.',
      'Enforce atomic seat reservation locks during payment processing.',
      'Calculate cancellation refund percentages based on time before train departure.',
    ],
    candidateEntities: [
      { name: 'Train', type: 'Core Asset', attributes: ['- trainNumber: String', '- route: List<Station>'] },
      { name: 'Ticket', type: 'Transaction Entity', attributes: ['- pnrNumber: String', '- fare: Double'] },
      { name: 'QuotaManager', type: 'Allocation Service', attributes: ['- quotaType: Quota'] },
    ],
    recommendedPatterns: [
      { name: 'Factory Method', purpose: 'Instantiate appropriate Coach objects (ACCoach, SleeperCoach) based on train configuration.' },
    ],
    referenceUmlNodes: [
      { name: 'Ticket', attrs: ['- pnr: String', '- status: TicketStatus'], methods: ['+ cancelTicket(): Double', '+ generateBoardingPass(): String'] },
      { name: 'Train', attrs: ['- trainNo: String', '- totalCoaches: Int'], methods: ['+ checkSeatAvailability(date: Date): Int', '+ bookSeats(passengerList: List): Ticket'] },
    ],
  },
  {
    id: 5,
    title: 'Hospital Electronic Health Record (EHR) System',
    industry: 'Healthcare',
    xpReward: 550,
    problemStatement: 'Architect doctor scheduling, patient medical histories, prescription workflows, lab test orders, and insurance billing.',
    functionalRequirements: [
      'Store HIPAA-compliant patient medical history records.',
      'Manage doctor appointment slot availability and room scheduling.',
      'Integrate lab test order pipelines and automated pharmacy prescription routing.',
      'Generate itemized insurance claims and patient co-pay invoices.',
    ],
    candidateEntities: [
      { name: 'Patient', type: 'User Entity', attributes: ['- patientId: String', '- medicalHistory: History'] },
      { name: 'Doctor', type: 'Medical Actor', attributes: ['- licenseNo: String', '- specialty: Specialty'] },
      { name: 'Prescription', type: 'Clinical Record', attributes: ['- rxId: Long', '- medications: List<Med>'] },
    ],
    recommendedPatterns: [
      { name: 'Facade Pattern', purpose: 'Provide a unified HospitalSystemFacade for appointment booking, billing, and lab orders.' },
    ],
    referenceUmlNodes: [
      { name: 'Patient', attrs: ['- id: String', '- bloodGroup: String'], methods: ['+ getMedicalRecord(): Record', '+ bookAppointment(doc: Doctor): Appointment'] },
      { name: 'Doctor', attrs: ['- licenseNo: String', '- consultationFee: Double'], methods: ['+ issuePrescription(p: Patient, med: List): Prescription'] },
    ],
  },
];

export const CaseStudiesPage: React.FC = () => {
  const [activeStudy, setActiveStudy] = useState<RealisticCaseStudyDetail>(REALISTIC_CASE_STUDIES[0]);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Interactive workout state
  const [selectedEntities, setSelectedEntities] = useState<string[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<string>('');
  const [userNotes, setUserNotes] = useState('');
  const [auditResult, setAuditResult] = useState<{ score: number; passed: boolean; feedback: string[] } | null>(null);

  const toggleEntity = (entityName: string) => {
    if (selectedEntities.includes(entityName)) {
      setSelectedEntities(selectedEntities.filter((e) => e !== entityName));
    } else {
      setSelectedEntities([...selectedEntities, entityName]);
    }
  };

  const handleRunAudit = () => {
    const totalEntities = activeStudy.candidateEntities.length;
    const selectedCount = selectedEntities.length;
    let score = 50;

    const feedback: string[] = [];

    if (selectedCount >= Math.ceil(totalEntities * 0.7)) {
      score += 30;
      feedback.push('✓ Excellent entity identification! You captured key domain entities.');
    } else {
      feedback.push('⚠️ Missing core domain entities. Ensure you identify all nouns in requirements.');
    }

    if (selectedPattern) {
      score += 20;
      feedback.push(`✓ Design pattern '${selectedPattern}' correctly applied to decouple architecture.`);
    } else {
      feedback.push('⚠️ Select a recommended design pattern for optimal architectural score.');
    }

    setAuditResult({
      score: Math.min(100, score),
      passed: score >= 70,
      feedback,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive System Design Workout Studio</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Real-World Case Studies Workout Studio</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Work out enterprise system designs step-by-step from raw requirements to UML class models and design patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Case Studies Selector */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Enterprise System</h3>
              {REALISTIC_CASE_STUDIES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveStudy(s);
                    setCurrentStep(1);
                    setSelectedEntities([]);
                    setSelectedPattern('');
                    setAuditResult(null);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    activeStudy.id === s.id
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-500/40'
                  }`}
                >
                  <div className="font-bold text-sm">{s.title}</div>
                  <div className="flex items-center space-x-2 text-xs mt-1 opacity-80">
                    <span className="px-2 py-0.5 rounded bg-black/20 font-mono">{s.industry}</span>
                    <span>+{s.xpReward} XP</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Interactive Workout Canvas */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Header Card */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">{activeStudy.industry} System Architecture</span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">{activeStudy.title}</h2>
                  </div>
                  <span className="px-3.5 py-1.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold text-xs rounded-full">
                    +{activeStudy.xpReward} XP Reward
                  </span>
                </div>

                <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {activeStudy.problemStatement}
                </div>

                {/* System Functional Requirements List */}
                <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Functional System Specifications</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {activeStudy.functionalRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Workout Stepper Tabs */}
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex items-center border-b border-slate-100 dark:border-slate-800 pb-4 gap-2">
                  {[
                    { step: 1, label: '1. Extract Domain Entities' },
                    { step: 2, label: '2. Select Design Patterns' },
                    { step: 3, label: '3. Reference UML Class Model' },
                  ].map((st) => (
                    <button
                      key={st.step}
                      onClick={() => setCurrentStep(st.step)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        currentStep === st.step
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                {/* Step 1 Workout: Entity Selection */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Workout Phase 1: Identify Nouns & Candidate Domain Classes
                    </h3>
                    <p className="text-xs text-slate-400">
                      Click to select candidate classes that belong in the core domain model for {activeStudy.title}:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeStudy.candidateEntities.map((ent, idx) => {
                        const isSelected = selectedEntities.includes(ent.name);
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleEntity(ent.name)}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-sm'
                                : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm font-mono">class {ent.name}</span>
                              <span className="text-[10px] uppercase font-semibold text-slate-400">{ent.type}</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-2 font-mono space-y-0.5">
                              {ent.attributes.map((attr, aIdx) => (
                                <div key={aIdx}>{attr}</div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2 Workout: Pattern Selection */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Workout Phase 2: Apply Design Patterns for High Cohesion & Low Coupling
                    </h3>
                    <p className="text-xs text-slate-400">
                      Select which design pattern optimizes extensibility for this system:
                    </p>

                    <div className="space-y-3">
                      {activeStudy.recommendedPatterns.map((pat, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedPattern(pat.name)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            selectedPattern === pat.name
                              ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold'
                              : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                          }`}
                        >
                          <div className="font-extrabold text-sm">{pat.name}</div>
                          <div className="text-xs text-slate-400 font-normal mt-1">{pat.purpose}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3 Workout: Reference UML Canvas */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Workout Phase 3: Reference UML Class Architecture
                    </h3>

                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeStudy.referenceUmlNodes.map((node, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden text-xs">
                          <div className="bg-indigo-900/60 p-2 text-center font-bold text-indigo-200 font-mono">
                            {node.name}
                          </div>
                          <div className="p-3 border-b border-slate-800 font-mono text-slate-300 space-y-0.5">
                            {node.attrs.map((a, i) => (
                              <div key={i}>{a}</div>
                            ))}
                          </div>
                          <div className="p-3 font-mono text-indigo-300 space-y-0.5">
                            {node.methods.map((m, i) => (
                              <div key={i}>{m}</div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workout Submission Audit Trigger */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <button
                    onClick={handleRunAudit}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 font-black text-white rounded-2xl shadow-xl shadow-indigo-500/20 text-xs flex items-center justify-center space-x-2 transition"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Run OOAD Structural Audit & Claim +{activeStudy.xpReward} XP</span>
                  </button>

                  {/* Audit Feedback */}
                  {auditResult && (
                    <div className={`p-5 rounded-2xl border ${auditResult.passed ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200' : 'bg-amber-950/40 border-amber-800 text-amber-200'} space-y-2`}>
                      <div className="flex items-center justify-between font-extrabold text-sm">
                        <span>Architectural Audit Score: {auditResult.score}/100</span>
                        <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs">
                          +{activeStudy.xpReward} XP Claimed!
                        </span>
                      </div>
                      {auditResult.feedback.map((fb, idx) => (
                        <div key={idx} className="text-xs">{fb}</div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

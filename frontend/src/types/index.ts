export interface User {
  id: number;
  email: string;
  name: string;
  university: string;
  department: string;
  batchYear: number;
  role: string;
}

export interface Profile {
  id: number;
  avatar?: string;
  bio?: string;
  totalXP: number;
  currentLevel: number;
  currentStreak: number;
  lastActiveDate?: string;
}

export interface RankCard {
  title: string;
  rank: number;
  change: number;
}

export interface Activity {
  id: number;
  title: string;
  activityType: string;
  xpEarned: number;
  timestamp: string;
}

export interface NextLesson {
  id: number;
  title: string;
  moduleTitle: string;
  description: string;
  estimatedMinutes: number;
}

export interface DashboardSummary {
  user: User;
  profile: Profile;
  rankCards: RankCard[];
  recentActivities: Activity[];
  nextLesson?: NextLesson;
  unlockedAchievementsCount: number;
  totalAchievementsCount: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  orderIndex: number;
  difficultyTier: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  contentText: string;
  videoUrl?: string;
  orderIndex: number;
  xpReward: number;
  moduleId?: number;
  module?: Module;
}

export interface Question {
  id: number;
  questionText: string;
  questionType: string;
  optionsJson: string;
  correctOptionIndex: number;
  explanation: string;
}

export interface Quiz {
  id: number;
  title: string;
  description: string;
  passPercentage: number;
  xpReward: number;
  questions?: Question[];
}

export interface QuizSubmitRequest {
  answers: Record<number, number>;
  timeTakenSeconds: number;
}

export interface QuizSubmitResponse {
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  explanations: Record<number, string>;
}

export interface UMLDiagram {
  id: number;
  title: string;
  diagramType: string;
  nodesJson: string;
  edgesJson: string;
  isValid: boolean;
  score: number;
  updatedAt: string;
}

export interface UMLValidationResponse {
  score: number;
  valid: boolean;
  warnings: string[];
}

export interface ReqToUMLResponse {
  actors: string[];
  useCases: string[];
  candidateClasses: string[];
  relationships: string[];
  classDiagramJson: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: number;
  name: string;
  university: string;
  department: string;
  batchYear: number;
  totalXP: number;
  level: number;
  avatar?: string;
  streak: number;
}

export interface DesignChallenge {
  id: number;
  title: string;
  description: string;
  scenarioText: string;
  starterRequirements: string;
  difficulty: string;
  xpReward: number;
}

export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  industry: string;
  stepsJson: string;
  xpReward: number;
}

export interface DesignPattern {
  id: number;
  category: string;
  name: string;
  problem: string;
  solution: string;
  javaCode: string;
  pythonCode: string;
  cppCode: string;
}

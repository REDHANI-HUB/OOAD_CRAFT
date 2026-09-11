import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { BottomNav } from './components/BottomNav';

import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { LearningModulesPage } from './pages/LearningModulesPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { PracticePage } from './pages/PracticePage';
import { QuizPage } from './pages/QuizPage';
import { UMLLabPage } from './pages/UMLLabPage';
import { RequirementToUMLPage } from './pages/RequirementToUMLPage';
import { DesignChallengesPage } from './pages/DesignChallengesPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { DesignPatternPlayground } from './pages/DesignPatternPlayground';
import { CodeLabPage } from './pages/CodeLabPage';
import { AIOOADMentorPage } from './pages/AIOOADMentorPage';
import { VivaSimulatorPage } from './pages/VivaSimulatorPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-bold text-indigo-400">
        Authenticating...
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="pb-16 md:pb-0 min-h-screen flex flex-col">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/learn" element={<ProtectedRoute><LearningModulesPage /></ProtectedRoute>} />
              <Route path="/lessons/:id" element={<ProtectedRoute><LessonDetailPage /></ProtectedRoute>} />
              <Route path="/practice" element={<ProtectedRoute><PracticePage /></ProtectedRoute>} />
              <Route path="/quizzes/:id" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
              <Route path="/quizzes/module/:moduleId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
              <Route path="/uml-lab" element={<ProtectedRoute><UMLLabPage /></ProtectedRoute>} />
              <Route path="/req-parser" element={<ProtectedRoute><RequirementToUMLPage /></ProtectedRoute>} />
              <Route path="/challenges" element={<ProtectedRoute><DesignChallengesPage /></ProtectedRoute>} />
              <Route path="/case-studies" element={<ProtectedRoute><CaseStudiesPage /></ProtectedRoute>} />
              <Route path="/patterns" element={<ProtectedRoute><DesignPatternPlayground /></ProtectedRoute>} />
              <Route path="/code-lab" element={<ProtectedRoute><CodeLabPage /></ProtectedRoute>} />
              <Route path="/ai-mentor" element={<ProtectedRoute><AIOOADMentorPage /></ProtectedRoute>} />
              <Route path="/viva" element={<ProtectedRoute><VivaSimulatorPage /></ProtectedRoute>} />
              <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
              <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <BottomNav />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

import api from './axios';
import {
  User,
  DashboardSummary,
  Module,
  Lesson,
  Quiz,
  QuizSubmitRequest,
  QuizSubmitResponse,
  UMLDiagram,
  UMLValidationResponse,
  ReqToUMLResponse,
  LeaderboardEntry,
  DesignChallenge,
  CaseStudy,
  DesignPattern,
} from '../types';

export const authApi = {
  login: async (credentials: any) => {
    const res = await api.post('/auth/login', credentials);
    if (res.data.token) localStorage.setItem('jwt_token', res.data.token);
    return res.data;
  },
  register: async (data: any) => {
    const res = await api.post('/auth/register', data);
    if (res.data.token) localStorage.setItem('jwt_token', res.data.token);
    return res.data;
  },
  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('jwt_token');
  },
  me: async (): Promise<User> => {
    const res = await api.get('/auth/me');
    return res.data;
  },
};

export const dashboardApi = {
  getSummary: async (): Promise<DashboardSummary> => {
    const res = await api.get('/dashboard');
    return res.data;
  },
};

export const curriculumApi = {
  getAllModules: async (): Promise<Module[]> => {
    const res = await api.get('/modules');
    return res.data;
  },
  getModuleById: async (id: number): Promise<Module> => {
    const res = await api.get(`/modules/${id}`);
    return res.data;
  },
  getLessonById: async (id: number): Promise<Lesson> => {
    const res = await api.get(`/lessons/${id}`);
    return res.data;
  },
  completeLesson: async (id: number) => {
    const res = await api.post(`/lessons/${id}/complete`);
    return res.data;
  },
};

export const quizApi = {
  getAllQuizzes: async (): Promise<Quiz[]> => {
    const res = await api.get('/quizzes');
    return res.data;
  },
  getQuizById: async (id: number): Promise<Quiz> => {
    const res = await api.get(`/quizzes/${id}`);
    return res.data;
  },
  getQuizByModuleId: async (moduleId: number): Promise<Quiz> => {
    const res = await api.get(`/quizzes/module/${moduleId}`);
    return res.data;
  },
  submitQuiz: async (id: number, request: QuizSubmitRequest): Promise<QuizSubmitResponse> => {
    const res = await api.post(`/quizzes/${id}/submit`, request);
    return res.data;
  },
  createQuiz: async (quizData: any): Promise<Quiz> => {
    const res = await api.post('/quizzes/create', quizData);
    return res.data;
  },
};

export const umlApi = {
  getUserDiagrams: async (): Promise<UMLDiagram[]> => {
    const res = await api.get('/uml');
    return res.data;
  },
  saveDiagram: async (title: string, diagramType: string, nodesJson: string, edgesJson: string): Promise<UMLDiagram> => {
    const res = await api.post('/uml/save', { title, diagramType, nodesJson, edgesJson });
    return res.data;
  },
  validateDiagram: async (nodesJson: string, edgesJson: string): Promise<UMLValidationResponse> => {
    const res = await api.post('/uml/validate', { nodesJson, edgesJson });
    return res.data;
  },
  generateFromReq: async (requirementText: string): Promise<ReqToUMLResponse> => {
    const res = await api.post('/uml/generate-from-req', { requirementText });
    return res.data;
  },
};

export const leaderboardApi = {
  getGlobal: async (): Promise<LeaderboardEntry[]> => {
    const res = await api.get('/leaderboard/global');
    return res.data;
  },
  getUniversity: async (univ?: string): Promise<LeaderboardEntry[]> => {
    const res = await api.get('/leaderboard/university', { params: { university: univ } });
    return res.data;
  },
  getDepartment: async (dept?: string): Promise<LeaderboardEntry[]> => {
    const res = await api.get('/leaderboard/department', { params: { department: dept } });
    return res.data;
  },
  getBatch: async (batch?: number): Promise<LeaderboardEntry[]> => {
    const res = await api.get('/leaderboard/batch', { params: { batchYear: batch } });
    return res.data;
  },
};

export const challengeApi = {
  getAll: async (): Promise<DesignChallenge[]> => {
    const res = await api.get('/challenges');
    return res.data;
  },
  getById: async (id: number): Promise<DesignChallenge> => {
    const res = await api.get(`/challenges/${id}`);
    return res.data;
  },
  submit: async (id: number, solutionText: string) => {
    const res = await api.post(`/challenges/${id}/submit`, { solutionText });
    return res.data;
  },
};

export const caseStudyApi = {
  getAll: async (): Promise<CaseStudy[]> => {
    const res = await api.get('/case-studies');
    return res.data;
  },
  getById: async (id: number): Promise<CaseStudy> => {
    const res = await api.get(`/case-studies/${id}`);
    return res.data;
  },
  submitStep: async (id: number, stepIndex: number, isFinalStep: boolean) => {
    const res = await api.post(`/case-studies/${id}/step`, { stepIndex, isFinalStep });
    return res.data;
  },
};

export const patternApi = {
  getAll: async (): Promise<DesignPattern[]> => {
    const res = await api.get('/patterns');
    return res.data;
  },
  getById: async (id: number): Promise<DesignPattern> => {
    const res = await api.get(`/patterns/${id}`);
    return res.data;
  },
  getByCategory: async (category: string): Promise<DesignPattern[]> => {
    const res = await api.get(`/patterns/category/${category}`);
    return res.data;
  },
};

export const aiApi = {
  explainConcept: async (concept: string) => {
    const res = await api.post('/ai/explain', { concept });
    return res.data;
  },
  reviewDesign: async (designJson: string) => {
    const res = await api.post('/ai/review-design', { designJson });
    return res.data;
  },
  startViva: async (topic: string) => {
    const res = await api.post('/ai/viva/start', { topic });
    return res.data;
  },
  respondViva: async (answer: string) => {
    const res = await api.post('/ai/viva/respond', { answer });
    return res.data;
  },
};

export const seedApi = {
  seed: async () => {
    const res = await api.post('/seed');
    return res.data;
  },
};

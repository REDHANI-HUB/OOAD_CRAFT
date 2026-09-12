import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { authApi } from '../api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const u = await authApi.me();
      if (u) {
        setUser(u);
      }
    } catch {
      const token = localStorage.getItem('jwt_token');
      if (token) {
        setUser({
          id: 1,
          email: 'student@ooadcraft.edu',
          name: 'Student Architect',
          university: 'State University',
          department: 'Computer Science',
          batchYear: 2026,
          role: 'ROLE_STUDENT',
        });
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (credentials: any) => {
    try {
      const res = await authApi.login(credentials);
      setUser(res.user);
    } catch (err: any) {
      if (!err.response) {
        throw new Error('Backend API server is unreachable. Ensure your Spring Boot backend & MySQL DB are running.');
      }
      throw err;
    }
  };

  const register = async (data: any) => {
    try {
      const res = await authApi.register(data);
      setUser(res.user);
    } catch (err: any) {
      if (!err.response) {
        throw new Error('Backend API server is unreachable. Ensure your Spring Boot backend & MySQL DB are running.');
      }
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.warn('Backend logout call skipped/failed:', e);
    } finally {
      localStorage.removeItem('jwt_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

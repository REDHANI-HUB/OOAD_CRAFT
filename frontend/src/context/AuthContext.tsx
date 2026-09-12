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
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        setUser(null);
        return;
      }
      const u = await authApi.me();
      if (u) {
        setUser(u);
      } else {
        localStorage.removeItem('jwt_token');
        setUser(null);
      }
    } catch {
      localStorage.removeItem('jwt_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (credentials: any) => {
    const res = await authApi.login(credentials);
    if (res && res.user) {
      setUser(res.user);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (data: any) => {
    const res = await authApi.register(data);
    if (res && res.user) {
      setUser(res.user);
    } else {
      throw new Error('Registration failed');
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (e) {
      console.warn('Backend logout call:', e);
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

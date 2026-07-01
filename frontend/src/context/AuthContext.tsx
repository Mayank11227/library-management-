"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAPI, logoutAPI } from '@/services/api';

type Role = 'admin' | 'student' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (role: 'admin' | 'student', email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Try to load user from localStorage on mount (basic implementation)
  useEffect(() => {
    const storedUser = localStorage.getItem('lms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (role: 'admin' | 'student', email: string, password?: string) => {
    setIsLoading(true);
    try {
      const data = await loginAPI({ email, password, role });
      
      if (data.status === 'success' && data.token) {
        localStorage.setItem('lms_token', data.token);
        
        const newUser: User = {
          id: data.user.id.toString(),
          name: data.user.name,
          email: data.user.email,
          role
        };
        setUser(newUser);
        localStorage.setItem('lms_user', JSON.stringify(newUser));

        if (role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/student/dashboard');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      alert("Failed to connect to the backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch (e) {
      console.error("Logout API failed", e);
    }
    setUser(null);
    localStorage.removeItem('lms_token');
    localStorage.removeItem('lms_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

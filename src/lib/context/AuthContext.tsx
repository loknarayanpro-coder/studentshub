'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserRole } from '@/types';
import { MOCK_STUDENT_PROFILE, MOCK_ADMIN_PROFILE } from '@/lib/mock-data';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  signInAsStudent: () => void;
  signInAsAdmin: () => void;
  signInWithCredentials: (email: string, role?: UserRole) => Promise<boolean>;
  signUpStudent: (profile: Partial<UserProfile>) => Promise<boolean>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'au_student_hub_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to student demo user for great initial exploration experience!
        setUser(MOCK_STUDENT_PROFILE);
      }
    } catch {
      setUser(MOCK_STUDENT_PROFILE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (typeof window !== 'undefined') {
      if (newUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  };

  const signInAsStudent = () => {
    saveUserSession(MOCK_STUDENT_PROFILE);
  };

  const signInAsAdmin = () => {
    saveUserSession(MOCK_ADMIN_PROFILE);
  };

  const signInWithCredentials = async (email: string, intendedRole: UserRole = 'student'): Promise<boolean> => {
    setIsLoading(true);
    // Simulate auth network response
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (intendedRole === 'admin' || intendedRole === 'super_admin' || email.includes('admin')) {
      saveUserSession({
        ...MOCK_ADMIN_PROFILE,
        email,
      });
    } else {
      saveUserSession({
        ...MOCK_STUDENT_PROFILE,
        email,
      });
    }
    setIsLoading(false);
    return true;
  };

  const signUpStudent = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newStudent: UserProfile = {
      id: `usr-${Date.now()}`,
      email: profileData.email || 'student@annauniv.edu',
      fullName: profileData.fullName || 'Student User',
      role: 'student',
      department: profileData.department || 'cse',
      semester: profileData.semester || 1,
      regulation: profileData.regulation || '2021',
      graduationYear: profileData.graduationYear || 2028,
      college: profileData.college || 'Anna University Affiliated College',
      interests: profileData.interests || ['Notes', 'Question Papers', 'Internships'],
      skills: profileData.skills || ['C Programming', 'Problem Solving'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveUserSession(newStudent);
    setIsLoading(false);
    return true;
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates, updatedAt: new Date().toISOString() };
    saveUserSession(updated);
  };

  const signOut = () => {
    saveUserSession(null);
  };

  const role = user?.role || null;
  const isAuthenticated = !!user;
  const isAdmin = role === 'admin' || role === 'super_admin' || role === 'moderator';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isAdmin,
        isLoading,
        signInAsStudent,
        signInAsAdmin,
        signInWithCredentials,
        signUpStudent,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

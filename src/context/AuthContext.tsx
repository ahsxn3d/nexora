'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  userApiKey: string;
  setUserApiKey: (key: string) => void;
  clearUserApiKey: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signInPersonal: (name?: string, email?: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userApiKey, setUserApiKeyState] = useState<string>('');

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('nexora_auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedKey = localStorage.getItem('nexora_user_gemini_api_key');
      if (savedKey) {
        setUserApiKeyState(savedKey);
      }
    } catch (e) {
      console.error('Error loading stored auth session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setUserApiKey = (key: string) => {
    const trimmed = key.trim();
    setUserApiKeyState(trimmed);
    try {
      if (trimmed) {
        localStorage.setItem('nexora_user_gemini_api_key', trimmed);
      } else {
        localStorage.removeItem('nexora_user_gemini_api_key');
      }
    } catch (e) {
      console.error('Failed to save user Gemini API key', e);
    }
  };

  const clearUserApiKey = () => {
    setUserApiKeyState('');
    try {
      localStorage.removeItem('nexora_user_gemini_api_key');
    } catch (e) {
      console.error('Failed to clear user Gemini API key', e);
    }
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const signInPersonal = (name = 'Scholar Candidate', email = 'scholar@nexora.app') => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim() || 'Scholar Candidate',
      email: email.trim().toLowerCase() || 'scholar@nexora.app',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      isPersonalUser: true,
    };
    setUser(newUser);
    try {
      localStorage.setItem('nexora_auth_user', JSON.stringify(newUser));
    } catch (e) {
      console.error('Failed to persist user session', e);
    }
    setIsAuthModalOpen(false);
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('nexora_auth_user');
    } catch (e) {
      console.error('Failed to remove user session', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthModalOpen,
        userApiKey,
        setUserApiKey,
        clearUserApiKey,
        openAuthModal,
        closeAuthModal,
        signInPersonal,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

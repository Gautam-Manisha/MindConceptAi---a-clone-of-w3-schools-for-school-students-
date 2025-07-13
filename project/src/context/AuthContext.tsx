import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { mockUser } from '../utils/mockData';

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(mockUser); // Set default user
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set default authenticated state

  const login = async (email: string, password: string) => {
    // Demo implementation - always succeeds
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signup = async (name: string, email: string, password: string) => {
    // Demo implementation - always succeeds
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    // Create a new user based on the mock user but with the provided name and email
    const newUser: User = {
      ...mockUser,
      name,
      email
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(mockUser); // Reset to default user instead of null
    setIsAuthenticated(true); // Stay authenticated
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
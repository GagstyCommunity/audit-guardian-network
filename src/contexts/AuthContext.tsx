
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, UserRole } from '../types/auth.types';

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthorized: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS: Record<string, User> = {
  'admin@example.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '/assets/avatars/admin.png',
    riskScore: 0,
    status: 'active',
    region: 'All',
    lastLogin: new Date(),
    createdAt: new Date('2023-01-01'),
  },
  'cspagent@example.com': {
    id: '2',
    name: 'CSP Agent',
    email: 'cspagent@example.com',
    role: 'csp_agent',
    avatar: '/assets/avatars/csp.png',
    riskScore: 15,
    status: 'active',
    region: 'North',
    lastLogin: new Date(),
    createdAt: new Date('2023-02-15'),
  },
  'fiagent@example.com': {
    id: '3',
    name: 'FI Agent',
    email: 'fiagent@example.com',
    role: 'fi_agent',
    avatar: '/assets/avatars/fi.png',
    riskScore: 8,
    status: 'active',
    region: 'East',
    lastLogin: new Date(),
    createdAt: new Date('2023-03-10'),
  },
  'auditor@example.com': {
    id: '4',
    name: 'Auditor User',
    email: 'auditor@example.com',
    role: 'auditor',
    avatar: '/assets/avatars/auditor.png',
    riskScore: 5,
    status: 'active',
    region: 'West',
    lastLogin: new Date(),
    createdAt: new Date('2023-04-05'),
  },
  'bankofficer@example.com': {
    id: '5',
    name: 'Bank Officer',
    email: 'bankofficer@example.com',
    role: 'bank_officer',
    avatar: '/assets/avatars/bank.png',
    riskScore: 2,
    status: 'active',
    region: 'South',
    lastLogin: new Date(),
    createdAt: new Date('2023-05-20'),
  },
  'customer@example.com': {
    id: '6',
    name: 'Customer User',
    email: 'customer@example.com',
    role: 'customer',
    status: 'active',
    createdAt: new Date('2023-06-15'),
  },
  'armywelfare@example.com': {
    id: '7',
    name: 'Army Welfare Officer',
    email: 'armywelfare@example.com',
    role: 'army_welfare_officer',
    avatar: '/assets/avatars/army.png',
    status: 'active',
    region: 'Central',
    lastLogin: new Date(),
    createdAt: new Date('2023-07-01'),
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('cspUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('cspUser');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // This would be replaced with an actual API call in a real app
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const lowercaseEmail = email.toLowerCase();
        const user = MOCK_USERS[lowercaseEmail];
        
        if (user && password === 'password') {
          // Update with current login time
          const updatedUser = {
            ...user,
            lastLogin: new Date(),
          };
          
          setAuthState({
            user: updatedUser,
            isAuthenticated: true,
            isLoading: false,
          });
          
          localStorage.setItem('cspUser', JSON.stringify(updatedUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem('cspUser');
  };

  const isAuthorized = (roles: UserRole[]): boolean => {
    if (!authState.isAuthenticated || !authState.user) return false;
    return roles.includes(authState.user.role);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

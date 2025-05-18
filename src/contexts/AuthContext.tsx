
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User, UserRole } from '../types/auth.types';
import { toast } from '@/components/ui/use-toast';

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
    rewardsPoints: 2850,
    complianceScore: 98,
    rankWeekly: 1,
    rankMonthly: 1
  },
  'csp@example.com': {
    id: '2',
    name: 'CSP Agent',
    email: 'csp@example.com',
    role: 'csp_agent',
    avatar: '/assets/avatars/csp.png',
    riskScore: 15,
    status: 'active',
    region: 'North',
    lastLogin: new Date(),
    createdAt: new Date('2023-02-15'),
    rewardsPoints: 1780,
    complianceScore: 92,
    rankWeekly: 4,
    rankMonthly: 12
  },
  'fiagent@example.com': {
    id: '3',
    name: 'FI Agent',
    email: 'fiagent@example.com',
    role: 'fi_agent',
    avatar: '/assets/avatars/fiagent.png',
    riskScore: 10,
    status: 'active',
    region: 'South',
    lastLogin: new Date(),
    createdAt: new Date('2023-03-10'),
    rewardsPoints: 1450,
    complianceScore: 89,
    rankWeekly: 8,
    rankMonthly: 15
  },
  'field@example.com': {
    id: '4',
    name: 'Field Auditor',
    email: 'field@example.com',
    role: 'field_auditor',
    avatar: '/assets/avatars/field.png',
    riskScore: 5,
    status: 'active',
    region: 'West',
    lastLogin: new Date(),
    createdAt: new Date('2023-04-05'),
    rewardsPoints: 2100,
    complianceScore: 96,
    rankWeekly: 3,
    rankMonthly: 4
  },
  'auditor@example.com': {
    id: '5',
    name: 'Auditor User',
    email: 'auditor@example.com',
    role: 'auditor',
    avatar: '/assets/avatars/auditor.png',
    riskScore: 5,
    status: 'active',
    region: 'West',
    lastLogin: new Date(),
    createdAt: new Date('2023-04-05'),
    rewardsPoints: 2250,
    complianceScore: 96,
    rankWeekly: 2,
    rankMonthly: 3
  },
  'cluster@example.com': {
    id: '6',
    name: 'Cluster Manager',
    email: 'cluster@example.com',
    role: 'cluster_manager',
    avatar: '/assets/avatars/manager.png',
    status: 'active',
    region: 'Central',
    lastLogin: new Date(),
    createdAt: new Date('2023-01-15'),
    rewardsPoints: 2100,
    complianceScore: 94,
    rankWeekly: 3,
    rankMonthly: 5
  },
  'ops@example.com': {
    id: '7',
    name: 'Operations & Training',
    email: 'ops@example.com',
    role: 'ops_training',
    avatar: '/assets/avatars/training.png',
    status: 'active',
    region: 'All',
    lastLogin: new Date(),
    createdAt: new Date('2023-02-10'),
    rewardsPoints: 1800,
    complianceScore: 90,
    rankWeekly: 5,
    rankMonthly: 8
  },
  'compliance@example.com': {
    id: '8',
    name: 'Compliance Officer',
    email: 'compliance@example.com',
    role: 'compliance',
    avatar: '/assets/avatars/compliance.png',
    status: 'active',
    region: 'All',
    lastLogin: new Date(),
    createdAt: new Date('2023-03-05'),
    rewardsPoints: 1950,
    complianceScore: 97,
    rankWeekly: 4,
    rankMonthly: 2
  },
  'it@example.com': {
    id: '9',
    name: 'IT Support',
    email: 'it@example.com',
    role: 'it_infra',
    avatar: '/assets/avatars/it.png',
    status: 'active',
    region: 'HQ',
    lastLogin: new Date(),
    createdAt: new Date('2023-01-20'),
    rewardsPoints: 1600,
    complianceScore: 92,
    rankWeekly: 7,
    rankMonthly: 9
  },
  'hr@example.com': {
    id: '10',
    name: 'HR Personnel',
    email: 'hr@example.com',
    role: 'hr',
    avatar: '/assets/avatars/hr.png',
    status: 'active',
    region: 'HQ',
    lastLogin: new Date(),
    createdAt: new Date('2023-02-01'),
    rewardsPoints: 1750,
    complianceScore: 91,
    rankWeekly: 6,
    rankMonthly: 7
  },
  'support@example.com': {
    id: '11',
    name: 'Customer Support',
    email: 'support@example.com',
    role: 'customer_support',
    avatar: '/assets/avatars/support.png',
    status: 'active',
    region: 'All',
    lastLogin: new Date(),
    createdAt: new Date('2023-03-15'),
    rewardsPoints: 1700,
    complianceScore: 89,
    rankWeekly: 8,
    rankMonthly: 10
  },
  'bank@example.com': {
    id: '12',
    name: 'Bank Officer',
    email: 'bank@example.com',
    role: 'bank_officer',
    avatar: '/assets/avatars/bank.png',
    riskScore: 2,
    status: 'active',
    region: 'South',
    lastLogin: new Date(),
    createdAt: new Date('2023-05-20'),
    rewardsPoints: 1850,
    complianceScore: 95,
    rankWeekly: 5,
    rankMonthly: 6
  },
  'customer@example.com': {
    id: '13',
    name: 'Customer',
    email: 'customer@example.com',
    role: 'customer',
    avatar: '/assets/avatars/customer.png',
    status: 'active',
    region: 'North',
    lastLogin: new Date(),
    createdAt: new Date('2023-06-15'),
    rewardsPoints: 0,
    complianceScore: 0,
    rankWeekly: 0,
    rankMonthly: 0
  },
  'armywelfare@example.com': {
    id: '14',
    name: 'Army Welfare Officer',
    email: 'armywelfare@example.com',
    role: 'army_welfare_officer',
    avatar: '/assets/avatars/army.png',
    status: 'active',
    region: 'Army Cantonments',
    lastLogin: new Date(),
    createdAt: new Date('2023-07-01'),
    rewardsPoints: 2050,
    complianceScore: 93,
    rankWeekly: 4,
    rankMonthly: 6
  }
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
        console.log("Restored authentication state from localStorage:", user);
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
          
          const newAuthState = {
            user: updatedUser,
            isAuthenticated: true,
            isLoading: false,
          };
          
          setAuthState(newAuthState);
          
          // Store user in localStorage
          localStorage.setItem('cspUser', JSON.stringify(updatedUser));
          console.log("User authenticated and saved to localStorage:", updatedUser);
          
          toast({
            title: "Login successful",
            description: `Welcome back, ${updatedUser.name}!`,
          });
          
          resolve();
        } else {
          console.error("Authentication failed for email:", lowercaseEmail);
          
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive"
          });
          
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    console.log("Logging out user");
    localStorage.removeItem('cspUser');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
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

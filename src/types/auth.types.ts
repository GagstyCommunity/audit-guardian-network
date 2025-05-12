
export type UserRole = 
  | 'admin'
  | 'csp_agent'
  | 'fi_agent'
  | 'auditor'
  | 'bank_officer'
  | 'customer'
  | 'army_welfare_officer'
  | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  riskScore?: number;
  status?: 'active' | 'suspended' | 'pending' | 'inactive';
  region?: string;
  lastLogin?: Date;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

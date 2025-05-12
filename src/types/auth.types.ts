
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

// Color palette for the Bank Correspondent Portal
export const colorPalette = {
  primaryPurple: '#5D2E8C',
  accentGreen: '#2D9B4F',
  baseWhite: '#FFFFFF',
  neutralGrayLight: '#F4F4F4',
  neutralGrayDark: '#D1D1D1',
  alertRed: '#FF4B4B'
};

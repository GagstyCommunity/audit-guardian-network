
export type UserRole = 
  | 'admin'
  | 'csp_agent'
  | 'field_auditor'
  | 'cluster_manager'
  | 'ops_training'
  | 'compliance'
  | 'it_infra'
  | 'hr'
  | 'customer_support'
  | 'bank_officer'
  | 'fi_agent'
  | 'auditor'
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
  rewardsPoints?: number;
  complianceScore?: number;
  rankWeekly?: number;
  rankMonthly?: number;
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

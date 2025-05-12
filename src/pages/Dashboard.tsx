
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Users,
} from 'lucide-react';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import CSPAgentDashboard from '../components/dashboards/CSPAgentDashboard';
import AuditorDashboard from '../components/dashboards/AuditorDashboard';
import BankOfficerDashboard from '../components/dashboards/BankOfficerDashboard';
import CustomerDashboard from '../components/dashboards/CustomerDashboard';
import ArmyWelfareDashboard from '../components/dashboards/ArmyWelfareDashboard';
import { UserRole } from '@/types/auth.types';

const DashboardSelector: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'csp_agent':
    case 'fi_agent':
      return <CSPAgentDashboard />;
    case 'auditor':
      return <AuditorDashboard />;
    case 'bank_officer':
      return <BankOfficerDashboard />;
    case 'customer':
      return <CustomerDashboard />;
    case 'army_welfare_officer':
      return <ArmyWelfareDashboard />;
    default:
      return <div>No dashboard available for your role.</div>;
  }
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-csp-navy">Dashboard</h1>
      <DashboardSelector />
    </div>
  );
};

export default Dashboard;

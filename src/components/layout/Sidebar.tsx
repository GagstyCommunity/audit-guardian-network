import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth.types';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  Shield,
  AlertTriangle,
  FileText,
  Camera,
  Smartphone,
  MessageSquare,
  BarChart,
  Wifi,
  ClipboardCheck,
  Award,
  BookOpen,
  Building,
  Landmark,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  roles: UserRole[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { authState } = useAuth();
  const { user } = authState;
  const location = useLocation();

  // Navigation items with role-based access control
  const navItems: NavItem[] = [
    // Admin items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/admin', roles: ['admin'] },
    { label: 'CSP Management', icon: <Users className="h-5 w-5" />, path: '/admin/csp-management', roles: ['admin'] },
    { label: 'Fraud Engine', icon: <Shield className="h-5 w-5" />, path: '/admin/fraud-engine', roles: ['admin'] },
    { label: 'Audit Logs', icon: <FileText className="h-5 w-5" />, path: '/admin/audit-logs', roles: ['admin'] },
    { label: 'Audit Assignment', icon: <ClipboardCheck className="h-5 w-5" />, path: '/admin/audit-assignment', roles: ['admin'] },
    { label: 'Notifications', icon: <Bell className="h-5 w-5" />, path: '/admin/notification-hub', roles: ['admin'] },
    { label: 'System Settings', icon: <Settings className="h-5 w-5" />, path: '/admin/settings', roles: ['admin'] },
    { label: 'War Mode Control', icon: <AlertTriangle className="h-5 w-5" />, path: '/admin/war-mode', roles: ['admin'] },

    // CSP Agent items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/csp', roles: ['csp_agent'] },
    { label: 'Transactions', icon: <CreditCard className="h-5 w-5" />, path: '/csp/transactions', roles: ['csp_agent'] },
    { label: 'Check In', icon: <Camera className="h-5 w-5" />, path: '/csp/check-in', roles: ['csp_agent'] },
    { label: 'Device Status', icon: <Smartphone className="h-5 w-5" />, path: '/csp/device-status', roles: ['csp_agent'] },
    { label: 'Dispute Center', icon: <MessageSquare className="h-5 w-5" />, path: '/csp/dispute', roles: ['csp_agent'] },
    { label: 'Reports', icon: <BarChart className="h-5 w-5" />, path: '/csp/reports', roles: ['csp_agent'] },
    { label: 'War Mode Tools', icon: <AlertTriangle className="h-5 w-5" />, path: '/csp/war-mode', roles: ['csp_agent'] },
    { label: 'Monthly Audit', icon: <ClipboardCheck className="h-5 w-5" />, path: '/csp/self-audit', roles: ['csp_agent'] },
    { label: 'Fraud Alerts', icon: <Bell className="h-5 w-5" />, path: '/csp/fraud-alerts', roles: ['csp_agent'] },
    { label: 'Rewards', icon: <Award className="h-5 w-5" />, path: '/csp/rewards', roles: ['csp_agent'] },
    { label: 'Gadget Center', icon: <Smartphone className="h-5 w-5" />, path: '/csp/gadget-center', roles: ['csp_agent'] },

    // Field Auditor items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/auditor', roles: ['field_auditor', 'auditor'] },
    { label: 'Audit Tasks', icon: <ClipboardCheck className="h-5 w-5" />, path: '/auditor/tasks', roles: ['field_auditor', 'auditor'] },
    { label: 'Audit Form', icon: <FileText className="h-5 w-5" />, path: '/auditor/audit-form', roles: ['field_auditor', 'auditor'] },
    { label: 'Visit Logs', icon: <BarChart className="h-5 w-5" />, path: '/auditor/visit-logs', roles: ['field_auditor', 'auditor'] },
    { label: 'Red Zone Protocol', icon: <AlertTriangle className="h-5 w-5" />, path: '/auditor/red-zone', roles: ['field_auditor', 'auditor'] },
    { label: 'Live Visit Checklist', icon: <ClipboardCheck className="h-5 w-5" />, path: '/auditor/live-visit', roles: ['field_auditor', 'auditor'] },
    { label: 'Questionnaires', icon: <BookOpen className="h-5 w-5" />, path: '/auditor/questionnaire', roles: ['field_auditor', 'auditor'] },

    // FI Agent items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/fi', roles: ['fi_agent'] },
    { label: 'Customer Accounts', icon: <Users className="h-5 w-5" />, path: '/fi/customer-accounts', roles: ['fi_agent'] },

    // Cluster Manager items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/cluster-manager', roles: ['cluster_manager'] },
    { label: 'Checklist Editor', icon: <ClipboardCheck className="h-5 w-5" />, path: '/cluster-manager/checklist-editor', roles: ['cluster_manager'] },
    { label: 'CSP Management', icon: <Users className="h-5 w-5" />, path: '/cluster-manager/csp-management', roles: ['cluster_manager'] },

    // Ops Training items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/ops', roles: ['ops_training'] },

    // Compliance items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/compliance', roles: ['compliance'] },
    { label: 'Audit Questions', icon: <ClipboardCheck className="h-5 w-5" />, path: '/compliance/audit-questions', roles: ['compliance'] },

    // IT Infra items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/it', roles: ['it_infra'] },
    { label: 'Device Inventory', icon: <Smartphone className="h-5 w-5" />, path: '/it/device-inventory', roles: ['it_infra'] },

    // HR items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/hr', roles: ['hr'] },
    { label: 'Staff Directory', icon: <Users className="h-5 w-5" />, path: '/hr/staff-directory', roles: ['hr'] },

    // Customer Support items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/support', roles: ['customer_support'] },

    // Bank Officer items
    { label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/bank', roles: ['bank_officer'] },
    { label: 'CSP Registry', icon: <Users className="h-5 w-5" />, path: '/bank/csp-registry', roles: ['bank_officer'] },
    { label: 'Fraud Dashboard', icon: <Shield className="h-5 w-5" />, path: '/bank/fraud-dashboard', roles: ['bank_officer'] },
    { label: 'Document Access', icon: <FileText className="h-5 w-5" />, path: '/bank/document-access', roles: ['bank_officer'] },
    { label: 'Decision Panel', icon: <ClipboardCheck className="h-5 w-5" />, path: '/bank/decisions', roles: ['bank_officer'] },
    { label: 'Reports', icon: <BarChart className="h-5 w-5" />, path: '/bank/reports', roles: ['bank_officer'] },
    { label: 'Military Coordination', icon: <Building className="h-5 w-5" />, path: '/bank/military', roles: ['bank_officer'] },
    { label: 'Customer Complaints', icon: <MessageSquare className="h-5 w-5" />, path: '/bank/complaints', roles: ['bank_officer'] },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-white shadow-sm transition-all duration-300 overflow-y-auto",
        isOpen ? "w-[250px]" : "w-0 md:w-16",
        !isOpen && "translate-x-0 md:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <Landmark className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">BCP Portal</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(!isOpen && "md:ml-auto md:mr-auto")}
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform",
              !isOpen && "rotate-180"
            )}
          />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {filteredNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100",
                  !isOpen && "justify-center px-2"
                )
              }
            >
              {item.icon}
              {isOpen && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {isOpen && user && (
        <div className="border-t p-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
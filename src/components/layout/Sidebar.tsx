
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth.types';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  BarChart3, 
  Users, 
  CheckSquare, 
  AlertTriangle, 
  FileText, 
  Bell, 
  Settings, 
  AlertCircle,
  ShieldCheck,
  UserCog,
  MapPin,
  FileSearch,
  Download,
  MessageSquare,
  ReceiptText,
  ChevronDown,
  ChevronRight,
  Home,
  HelpCircle,
  UserPlus,
  HeartHandshake,
  Phone,
  KeySquare,
  Clock,
  Shield,
  Cog,
  FileCheck,
  Eye,
  Menu,
  X,
  Award,
  Package,
  Wrench,
  User,
  Laptop,
  BookOpen,
  Building,
  Headset
} from 'lucide-react';
import { colorPalette } from '../../types/auth.types';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
}

interface MenuSection {
  title: string;
  items: {
    to: string;
    icon: React.ReactNode;
    label: string;
    roles: UserRole[];
    end?: boolean;
  }[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          isActive
            ? "text-white" // Active state
            : "text-gray-700 hover:bg-opacity-10 hover:bg-gray-100"
        )
      }
      style={({ isActive }) => ({
        backgroundColor: isActive ? colorPalette.primaryPurple : 'transparent',
      })}
    >
      <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { authState, isAuthorized } = useAuth();
  const { user } = authState;
  const [expandedSections, setExpandedSections] = useState<string[]>(['public', 'dashboard']);
  const isMobile = useIsMobile();
  
  // Close sidebar on mobile when navigating to a new page
  useEffect(() => {
    if (isMobile) {
      // Use the onToggle prop to close sidebar if it's open
      if (isOpen) {
        onToggle();
      }
    }
  }, [isMobile, isOpen, onToggle]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
  // Define menu sections based on user role
  const menuSections: MenuSection[] = [
    {
      title: 'Public Website',
      items: [
        {
          to: '/',
          icon: <Home size={18} />,
          label: 'Home',
          roles: ['admin', 'csp_agent', 'field_auditor', 'cluster_manager', 'ops_training', 'compliance', 'it_infra', 'hr', 'customer_support', 'bank_officer', 'guest'],
          end: true
        },
        {
          to: '/how-it-works',
          icon: <HelpCircle size={18} />,
          label: 'How It Works',
          roles: ['admin', 'csp_agent', 'field_auditor', 'cluster_manager', 'ops_training', 'compliance', 'it_infra', 'hr', 'customer_support', 'bank_officer', 'guest'],
        },
        {
          to: '/become-csp',
          icon: <UserPlus size={18} />,
          label: 'Become a CSP',
          roles: ['admin', 'csp_agent', 'field_auditor', 'cluster_manager', 'ops_training', 'compliance', 'it_infra', 'hr', 'customer_support', 'bank_officer', 'guest'],
        },
        {
          to: '/customer-corner',
          icon: <MessageSquare size={18} />,
          label: 'Customer Corner',
          roles: ['admin', 'csp_agent', 'field_auditor', 'cluster_manager', 'ops_training', 'compliance', 'it_infra', 'hr', 'customer_support', 'bank_officer', 'guest'],
        },
        {
          to: '/csr-impact',
          icon: <HeartHandshake size={18} />,
          label: 'CSR Impact',
          roles: ['admin', 'csp_agent', 'field_auditor', 'cluster_manager', 'ops_training', 'compliance', 'it_infra', 'hr', 'customer_support', 'bank_officer', 'guest'],
        },
        {
          to: '/contact',
          icon: <Phone size={18} />,
          label: 'Contact/Helpline',
          roles: ['admin', 'csp_agent', 'field_auditor', 'cluster_manager', 'ops_training', 'compliance', 'it_infra', 'hr', 'customer_support', 'bank_officer', 'guest'],
        },
        {
          to: '/verify-csp',
          icon: <Shield size={18} />,
          label: 'Verify CSP',
          roles: ['admin', 'csp_agent', 'field_auditor', 'cluster_manager', 'ops_training', 'compliance', 'it_infra', 'hr', 'customer_support', 'bank_officer', 'guest'],
        },
        {
          to: '/submit-complaint',
          icon: <AlertCircle size={18} />,
          label: 'Submit Complaint',
          roles: ['admin', 'csp_agent', 'field_auditor', 'cluster_manager', 'ops_training', 'compliance', 'it_infra', 'hr', 'customer_support', 'bank_officer', 'guest'],
        },
        {
          to: '/track-complaint',
          icon: <FileSearch size={18} />,
          label: 'Track Complaint',
          roles: ['admin', 'csp_agent', 'field_auditor', 'cluster_manager', 'ops_training', 'compliance', 'it_infra', 'hr', 'customer_support', 'bank_officer', 'guest'],
        },
        {
          to: '/login',
          icon: <KeySquare size={18} />,
          label: 'Login',
          roles: ['guest'],
        }
      ]
    },
    {
      title: 'Dashboard',
      items: [
        {
          to: '/dashboard',
          icon: <BarChart3 size={18} />,
          label: 'Dashboard',
          roles: ['admin', 'csp_agent', 'field_auditor', 'cluster_manager', 'ops_training', 'compliance', 'it_infra', 'hr', 'customer_support', 'bank_officer'],
        }
      ]
    },
    {
      title: 'Admin',
      items: [
        {
          to: '/admin/csp-management',
          icon: <Users size={18} />,
          label: 'CSP Management',
          roles: ['admin'],
        },
        {
          to: '/admin/audit-assignment',
          icon: <CheckSquare size={18} />,
          label: 'Audit Assignment',
          roles: ['admin'],
        },
        {
          to: '/admin/fraud-engine',
          icon: <AlertTriangle size={18} />,
          label: 'Fraud Engine',
          roles: ['admin'],
        },
        {
          to: '/admin/audit-logs',
          icon: <FileText size={18} />,
          label: 'Audit Trail Logs',
          roles: ['admin'],
        },
        {
          to: '/admin/notification-hub',
          icon: <Bell size={18} />,
          label: 'Notification Hub',
          roles: ['admin'],
        },
        {
          to: '/admin/settings',
          icon: <Settings size={18} />,
          label: 'System Settings',
          roles: ['admin'],
        },
        {
          to: '/admin/war-mode',
          icon: <AlertCircle size={18} />,
          label: 'War Mode Control',
          roles: ['admin'],
        },
        {
          to: '/admin/role-management',
          icon: <User size={18} />,
          label: 'Role Management',
          roles: ['admin'],
        },
        {
          to: '/admin/leaderboard-management',
          icon: <Award size={18} />,
          label: 'Leaderboard Management',
          roles: ['admin'],
        },
      ]
    },
    {
      title: 'CSP Agent',
      items: [
        {
          to: '/csp/transactions',
          icon: <ShieldCheck size={18} />,
          label: 'Live Transactions',
          roles: ['csp_agent'],
        },
        {
          to: '/csp/check-in',
          icon: <UserCog size={18} />,
          label: 'Facial Check-In',
          roles: ['csp_agent'],
        },
        {
          to: '/csp/self-audit',
          icon: <Clock size={18} />,
          label: 'Monthly Self-Check',
          roles: ['csp_agent'],
        },
        {
          to: '/csp/fraud-alerts',
          icon: <AlertTriangle size={18} />,
          label: 'Fraud Alerts',
          roles: ['csp_agent'],
        },
        {
          to: '/csp/device-status',
          icon: <Cog size={18} />,
          label: 'Device Status',
          roles: ['csp_agent'],
        },
        {
          to: '/csp/rewards',
          icon: <Award size={18} />,
          label: 'Rewards & Leaderboard',
          roles: ['csp_agent'],
        },
        {
          to: '/csp/gadget-center',
          icon: <Package size={18} />,
          label: 'Gadget Center',
          roles: ['csp_agent'],
        },
        {
          to: '/csp/dispute',
          icon: <MessageSquare size={18} />,
          label: 'Dispute Center',
          roles: ['csp_agent'],
        },
        {
          to: '/csp/reports',
          icon: <FileText size={18} />,
          label: 'Reports',
          roles: ['csp_agent'],
        },
        {
          to: '/csp/war-mode',
          icon: <AlertCircle size={18} />,
          label: 'War Mode Tools',
          roles: ['csp_agent'],
        },
      ]
    },
    {
      title: 'Field Auditor',
      items: [
        {
          to: '/auditor/tasks',
          icon: <CheckSquare size={18} />,
          label: 'Assigned Tasks',
          roles: ['field_auditor'],
        },
        {
          to: '/auditor/live-visit',
          icon: <Eye size={18} />,
          label: 'Live Visit Checklist',
          roles: ['field_auditor'],
        },
        {
          to: '/auditor/audit-form',
          icon: <FileCheck size={18} />,
          label: 'Audit Checklist Form',
          roles: ['field_auditor'],
        },
        {
          to: '/auditor/visit-logs',
          icon: <MapPin size={18} />,
          label: 'Visit Logs',
          roles: ['field_auditor'],
        },
        {
          to: '/auditor/rewards',
          icon: <Award size={18} />,
          label: 'Rewards & Leaderboard',
          roles: ['field_auditor'],
        },
        {
          to: '/auditor/red-zone',
          icon: <AlertCircle size={18} />,
          label: 'Red Zone Protocol',
          roles: ['field_auditor'],
        },
      ]
    },
    {
      title: 'Cluster Manager',
      items: [
        {
          to: '/cluster-manager/csp-monitoring',
          icon: <Users size={18} />,
          label: 'CSP Monitoring',
          roles: ['cluster_manager'],
        },
        {
          to: '/cluster-manager/auditor-monitoring',
          icon: <CheckSquare size={18} />,
          label: 'Auditor Monitoring',
          roles: ['cluster_manager'],
        },
        {
          to: '/cluster-manager/checklist-editor',
          icon: <Wrench size={18} />,
          label: 'Checklist Editor',
          roles: ['cluster_manager'],
        },
        {
          to: '/cluster-manager/onboarding',
          icon: <UserPlus size={18} />,
          label: 'CSP Onboarding',
          roles: ['cluster_manager'],
        },
        {
          to: '/cluster-manager/leaderboard',
          icon: <Award size={18} />,
          label: 'Leaderboard Moderation',
          roles: ['cluster_manager'],
        },
        {
          to: '/cluster-manager/compliance',
          icon: <Shield size={18} />,
          label: 'Compliance Overview',
          roles: ['cluster_manager'],
        },
      ]
    },
    {
      title: 'Ops/Training',
      items: [
        {
          to: '/ops/kyc-verification',
          icon: <FileCheck size={18} />,
          label: 'KYC Verification',
          roles: ['ops_training'],
        },
        {
          to: '/ops/gadget-management',
          icon: <Package size={18} />,
          label: 'Gadget Management',
          roles: ['ops_training'],
        },
        {
          to: '/ops/training-tasks',
          icon: <BookOpen size={18} />,
          label: 'Training Tasks',
          roles: ['ops_training'],
        },
        {
          to: '/ops/e-learning',
          icon: <Laptop size={18} />,
          label: 'E-Learning Management',
          roles: ['ops_training'],
        },
      ]
    },
    {
      title: 'Compliance',
      items: [
        {
          to: '/compliance/audit-results',
          icon: <FileSearch size={18} />,
          label: 'Audit Results',
          roles: ['compliance'],
        },
        {
          to: '/compliance/csp-lockdown',
          icon: <Shield size={18} />,
          label: 'CSP Lockdown',
          roles: ['compliance'],
        },
        {
          to: '/compliance/fraud-resolution',
          icon: <AlertTriangle size={18} />,
          label: 'Fraud Resolution',
          roles: ['compliance'],
        },
        {
          to: '/compliance/csp-scoring',
          icon: <BarChart3 size={18} />,
          label: 'CSP Scoring',
          roles: ['compliance'],
        },
        {
          to: '/compliance/sla-tracker',
          icon: <Clock size={18} />,
          label: 'SLA Tracker',
          roles: ['compliance'],
        },
      ]
    },
    {
      title: 'IT/Infra',
      items: [
        {
          to: '/it/device-status',
          icon: <Laptop size={18} />,
          label: 'Device Status',
          roles: ['it_infra'],
        },
        {
          to: '/it/gadget-requests',
          icon: <Package size={18} />,
          label: 'Gadget Requests',
          roles: ['it_infra'],
        },
        {
          to: '/it/app-versions',
          icon: <Settings size={18} />,
          label: 'App Versions',
          roles: ['it_infra'],
        },
        {
          to: '/it/device-health',
          icon: <Cog size={18} />,
          label: 'Device Health',
          roles: ['it_infra'],
        },
      ]
    },
    {
      title: 'HR Panel',
      items: [
        {
          to: '/hr/profiles',
          icon: <Users size={18} />,
          label: 'Profile Management',
          roles: ['hr'],
        },
        {
          to: '/hr/leaderboard-history',
          icon: <Award size={18} />,
          label: 'Leaderboard History',
          roles: ['hr'],
        },
        {
          to: '/hr/payroll',
          icon: <ReceiptText size={18} />,
          label: 'Payroll Sync',
          roles: ['hr'],
        },
        {
          to: '/hr/documents',
          icon: <FileText size={18} />,
          label: 'Document Upload',
          roles: ['hr'],
        },
      ]
    },
    {
      title: 'Customer Support',
      items: [
        {
          to: '/support/complaints',
          icon: <MessageSquare size={18} />,
          label: 'Complaints',
          roles: ['customer_support'],
        },
        {
          to: '/support/resolution',
          icon: <CheckSquare size={18} />,
          label: 'Resolution Center',
          roles: ['customer_support'],
        },
        {
          to: '/support/army-fastlane',
          icon: <HeartHandshake size={18} />,
          label: 'Army Fast-Lane',
          roles: ['customer_support'],
        },
      ]
    },
    {
      title: 'Bank Officer',
      items: [
        {
          to: '/bank/csp-registry',
          icon: <Users size={18} />,
          label: 'CSP Registry',
          roles: ['bank_officer'],
        },
        {
          to: '/bank/fraud-dashboard',
          icon: <AlertTriangle size={18} />,
          label: 'Fraud Dashboard',
          roles: ['bank_officer'],
        },
        {
          to: '/bank/complaints',
          icon: <MessageSquare size={18} />,
          label: 'Customer Complaints',
          roles: ['bank_officer'],
        },
        {
          to: '/bank/document-access',
          icon: <FileSearch size={18} />,
          label: 'Document Access',
          roles: ['bank_officer'],
        },
        {
          to: '/bank/decisions',
          icon: <CheckSquare size={18} />,
          label: 'Decision Panel',
          roles: ['bank_officer'],
        },
        {
          to: '/bank/reports',
          icon: <Download size={18} />,
          label: 'Download Reports',
          roles: ['bank_officer'],
        },
      ]
    },
  ];

  // Mobile sidebar toggle button (fixed position)
  const MobileToggle = () => (
    <button
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-csp-blue text-white shadow-lg md:hidden"
      onClick={onToggle}
      aria-label="Toggle sidebar"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  // If mobile and sidebar is closed, only show the toggle button
  if (isMobile && !isOpen) {
    return <MobileToggle />;
  }

  return (
    <>
      {isMobile && <MobileToggle />}
      <div 
        className={cn(
          "flex h-full w-64 flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white p-4 transition-all duration-300",
          isMobile && "fixed left-0 top-0 z-40 shadow-lg",
          isMobile && !isOpen && "transform -translate-x-full"
        )}
      >
        {/* Mobile close button inside sidebar */}
        {isMobile && (
          <div className="flex justify-end">
            <button 
              onClick={onToggle}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        {/* Sidebar content */}
        {menuSections.map((section) => {
          const filteredItems = section.items.filter(item => 
            user && isAuthorized(item.roles)
          );
          
          if (filteredItems.length === 0) return null;
          
          const isExpanded = expandedSections.includes(section.title.toLowerCase());
          
          return (
            <div key={section.title} className="flex flex-col gap-1">
              <button
                className="flex items-center justify-between rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wider"
                onClick={() => toggleSection(section.title.toLowerCase())}
                style={{ color: colorPalette.primaryPurple }}
              >
                <span>{section.title}</span>
                {isExpanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
              
              {isExpanded && (
                <div className="ml-2 flex flex-col space-y-1 pl-2">
                  {filteredItems.map((item) => (
                    <SidebarItem
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                      end={item.end}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Mobile overlay backdrop */}
        {isMobile && isOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black bg-opacity-50"
            onClick={onToggle}
          />
        )}
      </div>
    </>
  );
};

export default Sidebar;

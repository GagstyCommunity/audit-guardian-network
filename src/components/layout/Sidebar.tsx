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
  X
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
          roles: ['admin', 'csp_agent', 'fi_agent', 'auditor', 'bank_officer', 'customer', 'army_welfare_officer', 'guest'],
          end: true
        },
        {
          to: '/how-it-works',
          icon: <HelpCircle size={18} />,
          label: 'How It Works',
          roles: ['admin', 'csp_agent', 'fi_agent', 'auditor', 'bank_officer', 'customer', 'army_welfare_officer', 'guest'],
        },
        {
          to: '/become-csp',
          icon: <UserPlus size={18} />,
          label: 'Become a CSP',
          roles: ['admin', 'csp_agent', 'fi_agent', 'auditor', 'bank_officer', 'customer', 'army_welfare_officer', 'guest'],
        },
        {
          to: '/customer-corner',
          icon: <MessageSquare size={18} />,
          label: 'Customer Corner',
          roles: ['admin', 'csp_agent', 'fi_agent', 'auditor', 'bank_officer', 'customer', 'army_welfare_officer', 'guest'],
        },
        {
          to: '/csr-impact',
          icon: <HeartHandshake size={18} />,
          label: 'CSR Impact',
          roles: ['admin', 'csp_agent', 'fi_agent', 'auditor', 'bank_officer', 'customer', 'army_welfare_officer', 'guest'],
        },
        {
          to: '/contact',
          icon: <Phone size={18} />,
          label: 'Contact/Helpline',
          roles: ['admin', 'csp_agent', 'fi_agent', 'auditor', 'bank_officer', 'customer', 'army_welfare_officer', 'guest'],
        },
        {
          to: '/verify-csp',
          icon: <Shield size={18} />,
          label: 'Verify CSP',
          roles: ['admin', 'csp_agent', 'fi_agent', 'auditor', 'bank_officer', 'customer', 'army_welfare_officer', 'guest'],
        },
        {
          to: '/submit-complaint',
          icon: <AlertCircle size={18} />,
          label: 'Submit Complaint',
          roles: ['admin', 'csp_agent', 'fi_agent', 'auditor', 'bank_officer', 'customer', 'army_welfare_officer', 'guest'],
        },
        {
          to: '/track-complaint',
          icon: <FileSearch size={18} />,
          label: 'Track Complaint',
          roles: ['admin', 'csp_agent', 'fi_agent', 'auditor', 'bank_officer', 'customer', 'army_welfare_officer', 'guest'],
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
          roles: ['admin', 'csp_agent', 'fi_agent', 'auditor', 'bank_officer', 'army_welfare_officer'],
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
      ]
    },
    {
      title: 'CSP/FI Agent',
      items: [
        {
          to: '/agent/transactions',
          icon: <ShieldCheck size={18} />,
          label: 'Live Transactions',
          roles: ['csp_agent', 'fi_agent'],
        },
        {
          to: '/agent/check-in',
          icon: <UserCog size={18} />,
          label: 'Facial Check-In',
          roles: ['csp_agent', 'fi_agent'],
        },
        {
          to: '/agent/self-check',
          icon: <Clock size={18} />,
          label: 'Monthly Self-Check',
          roles: ['csp_agent', 'fi_agent'],
        },
        {
          to: '/agent/fraud-alerts',
          icon: <AlertTriangle size={18} />,
          label: 'Fraud Alerts',
          roles: ['csp_agent', 'fi_agent'],
        },
        {
          to: '/agent/device-status',
          icon: <Cog size={18} />,
          label: 'Device Status',
          roles: ['csp_agent', 'fi_agent'],
        },
        {
          to: '/agent/dispute',
          icon: <MessageSquare size={18} />,
          label: 'Dispute Center',
          roles: ['csp_agent', 'fi_agent'],
        },
        {
          to: '/agent/reports',
          icon: <FileText size={18} />,
          label: 'Reports',
          roles: ['csp_agent', 'fi_agent'],
        },
        {
          to: '/agent/war-mode',
          icon: <AlertCircle size={18} />,
          label: 'War Mode Tools',
          roles: ['csp_agent', 'fi_agent'],
        },
        {
          to: '/agent/army-family',
          icon: <Users size={18} />,
          label: 'Army Family Panel',
          roles: ['csp_agent', 'fi_agent'],
        },
      ]
    },
    {
      title: 'Auditor',
      items: [
        {
          to: '/auditor/tasks',
          icon: <CheckSquare size={18} />,
          label: 'Assigned Tasks',
          roles: ['auditor'],
        },
        {
          to: '/auditor/live-visit',
          icon: <Eye size={18} />,
          label: 'Live Visit Checklist',
          roles: ['auditor'],
        },
        {
          to: '/auditor/audit-form',
          icon: <FileCheck size={18} />,
          label: 'Audit Form',
          roles: ['auditor'],
        },
        {
          to: '/auditor/visit-logs',
          icon: <MapPin size={18} />,
          label: 'Visit Logs',
          roles: ['auditor'],
        },
        {
          to: '/auditor/red-zone',
          icon: <AlertCircle size={18} />,
          label: 'Red Zone Protocol',
          roles: ['auditor'],
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
        {
          to: '/bank/military',
          icon: <Users size={18} />,
          label: 'Military Coordination',
          roles: ['bank_officer'],
        },
      ]
    },
    {
      title: 'Customer',
      items: [
        {
          to: '/customer/verify',
          icon: <ReceiptText size={18} />,
          label: 'Verify Fee',
          roles: ['customer'],
        },
        {
          to: '/customer/verify-csp',
          icon: <Shield size={18} />,
          label: 'Verify CSP',
          roles: ['customer'],
        },
        {
          to: '/customer/complaint',
          icon: <MessageSquare size={18} />,
          label: 'Submit Complaint',
          roles: ['customer'],
        },
        {
          to: '/customer/track',
          icon: <FileSearch size={18} />,
          label: 'Track Complaint',
          roles: ['customer'],
        },
        {
          to: '/customer/feedback',
          icon: <FileText size={18} />,
          label: 'Feedback Log',
          roles: ['customer'],
        },
      ]
    },
    {
      title: 'Army Welfare',
      items: [
        {
          to: '/army/families',
          icon: <Users size={18} />,
          label: 'Army Families',
          roles: ['army_welfare_officer'],
        },
        {
          to: '/army/payouts',
          icon: <Download size={18} />,
          label: 'Special Payouts',
          roles: ['army_welfare_officer'],
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


import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import { 
  Home, 
  CheckSquare, 
  FileText, 
  Map, 
  AlertTriangle, 
  Calendar, 
  Clock,
  Settings
} from 'lucide-react';

const AuditorLayout: React.FC = () => {
  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      href: '/auditor/dashboard'
    },
    {
      title: 'Audit Tasks',
      icon: <CheckSquare className="h-4 w-4" />,
      href: '/auditor/tasks'
    },
    {
      title: 'Visit Logs',
      icon: <Calendar className="h-4 w-4" />,
      href: '/auditor/visit-logs'
    },
    {
      title: 'Red Zone Protocols',
      icon: <AlertTriangle className="h-4 w-4" />,
      href: '/auditor/red-zone'
    },
    {
      title: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      href: '/auditor/settings'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        items={sidebarItems}
        activePath="/auditor"
        userRole="Auditor"
        userName="Vikram Mehta"
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar pageTitle="Auditor Portal" />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuditorLayout;

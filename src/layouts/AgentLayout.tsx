
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Home, BarChart3, Bell, Settings } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';

const AgentLayout: React.FC = () => {
  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      href: '/agent'
    },
    {
      title: 'Transactions',
      icon: <BarChart3 className="h-4 w-4" />,
      href: '/agent/transactions'
    },
    {
      title: 'Notifications',
      icon: <Bell className="h-4 w-4" />,
      href: '/agent/notifications'
    },
    {
      title: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      href: '/agent/settings'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        items={sidebarItems}
        activePath="/agent"
        userRole="Agent"
        userName="Agent User"
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar pageTitle="Agent Dashboard" />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AgentLayout;

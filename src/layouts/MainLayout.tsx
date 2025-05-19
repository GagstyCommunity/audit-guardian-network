
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Home, BarChart3, Users, Settings } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';

const MainLayout: React.FC = () => {
  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      href: '/'
    },
    {
      title: 'Analytics',
      icon: <BarChart3 className="h-4 w-4" />,
      href: '/analytics'
    },
    {
      title: 'Users',
      icon: <Users className="h-4 w-4" />,
      href: '/users'
    },
    {
      title: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      href: '/settings'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        items={sidebarItems}
        activePath="/"
        userRole="Administrator"
        userName="Admin User"
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar pageTitle="Dashboard" />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

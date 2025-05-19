
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Home, Users, Settings } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';

const AdminLayout: React.FC = () => {
  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      href: '/admin'
    },
    {
      title: 'User Management',
      icon: <Users className="h-4 w-4" />,
      href: '/admin/users'
    },
    {
      title: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      href: '/admin/settings'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        items={sidebarItems}
        activePath="/admin"
        userRole="Administrator"
        userName="Admin User"
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar pageTitle="Admin Dashboard" />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

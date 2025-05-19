
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Home, Wallet, FileText, MessageSquare } from 'lucide-react';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';

const CustomerLayout: React.FC = () => {
  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      href: '/customer'
    },
    {
      title: 'Accounts',
      icon: <Wallet className="h-4 w-4" />,
      href: '/customer/accounts'
    },
    {
      title: 'Statements',
      icon: <FileText className="h-4 w-4" />,
      href: '/customer/statements'
    },
    {
      title: 'Support',
      icon: <MessageSquare className="h-4 w-4" />,
      href: '/customer/support'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        items={sidebarItems}
        activePath="/customer"
        userRole="Customer"
        userName="Customer User"
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar pageTitle="Customer Dashboard" />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;

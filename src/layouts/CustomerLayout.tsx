
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Wallet, FileText, MessageSquare, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const CustomerLayout: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

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
      title: 'Transactions',
      icon: <FileText className="h-4 w-4" />,
      href: '/customer/transactions'
    },
    {
      title: 'Support',
      icon: <MessageSquare className="h-4 w-4" />,
      href: '/customer/support'
    },
    {
      title: 'Verify CSP',
      icon: <ShieldCheck className="h-4 w-4" />,
      href: '/customer/verify-csp'
    }
  ];

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-primary">Customer Portal</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Welcome, {user?.name || 'Customer'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64 border-r bg-white p-4 overflow-y-auto">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              >
                <div className="mr-3 text-gray-500">{item.icon}</div>
                {item.title}
              </a>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;

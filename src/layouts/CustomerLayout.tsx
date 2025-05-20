
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Wallet, FileText, MessageSquare, ShieldCheck, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CustomerLayout: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-sm text-gray-600">Welcome, {user?.name || 'Customer'}</span>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:block",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
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

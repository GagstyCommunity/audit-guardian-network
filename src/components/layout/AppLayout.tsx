
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth.types';

import Header from './Header';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/toaster';

interface AppLayoutProps {
  requiredRoles?: UserRole[];
}

const AppLayout: React.FC<AppLayoutProps> = ({ requiredRoles = [] }) => {
  const { authState, isAuthorized } = useAuth();
  const { isLoading, isAuthenticated, user } = authState;

  // Check if user is loading
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-csp-light">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-csp-blue border-t-transparent"></div>
          <p className="text-lg font-medium text-csp-blue">Loading...</p>
        </div>
      </div>
    );
  }

  // For development/testing purposes, allow access even if not authenticated
  // REMOVE THIS IN PRODUCTION
  if (!isAuthenticated && process.env.NODE_ENV === 'development') {
    console.log("Development mode: Bypassing authentication check");
    return (
      <div className="flex h-screen flex-col bg-gray-50">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    );
  }

  // Check if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required roles (if any are specified)
  if (requiredRoles.length > 0 && !isAuthorized(requiredRoles)) {
    console.log("Access denied: User does not have required roles", { 
      userRole: user?.role, 
      requiredRoles 
    });
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default AppLayout;

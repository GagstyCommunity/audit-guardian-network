
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth.types';

import Header from './Header';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  requiredRoles?: UserRole[];
}

const AppLayout: React.FC<AppLayoutProps> = ({ requiredRoles = [] }) => {
  const { authState, isAuthorized } = useAuth();
  const { isLoading, isAuthenticated, user } = authState;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  // Close sidebar on route change when on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [location.pathname, isMobile]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

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

  // Check if user is not authenticated
  if (!isAuthenticated) {
    console.log("User is not authenticated, redirecting to login");
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

  // For debugging - log current user and path
  console.log(`Authenticated as ${user?.name} (${user?.role}) at path: ${location.pathname}`);

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default AppLayout;

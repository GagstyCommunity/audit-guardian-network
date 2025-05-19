
import React from 'react';
import { useRoutes } from 'react-router-dom';
import LoginPage from '@/pages/auth/Login';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import adminRoutes from './adminRoutes';
import agentRoutes from './agentRoutes';
import customerRoutes from './customerRoutes';
import auditorRoutes from './auditorRoutes';
import NotFound from '@/pages/NotFound';

const AppRoutes: React.FC = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Dashboard /> },
      ]
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    ...adminRoutes,
    ...agentRoutes,
    ...customerRoutes,
    ...auditorRoutes,
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default AppRoutes;

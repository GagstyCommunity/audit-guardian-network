
import React from 'react';
import { RouteObject } from 'react-router-dom';
import CustomerLayout from '@/layouts/CustomerLayout';

const customerRoutes: RouteObject[] = [
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      // Add customer routes here as needed
    ],
  },
];

export default customerRoutes;

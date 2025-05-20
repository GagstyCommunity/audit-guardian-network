
import React from 'react';
import { RouteObject } from 'react-router-dom';
import CustomerLayout from '@/layouts/CustomerLayout';
import CustomerDashboard from '@/pages/customer/CustomerDashboard';
import AccountDetails from '@/pages/customer/AccountDetails';
import Transactions from '@/pages/customer/Transactions';
import VerifyFee from '@/pages/customer/VerifyFee';
import SubmitComplaint from '@/pages/customer/SubmitComplaint';
import FeedbackLog from '@/pages/customer/FeedbackLog';
import VerifyCSP from '@/pages/customer/VerifyCSP';
import TrackComplaint from '@/pages/customer/TrackComplaint';

const customerRoutes: RouteObject[] = [
  {
    path: '/customer',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <CustomerDashboard /> },
      { index: true, element: <CustomerDashboard /> },
      { path: 'accounts', element: <AccountDetails /> },
      { path: 'transactions', element: <Transactions /> },
      { path: 'verify-fee', element: <VerifyFee /> },
      { path: 'submit-complaint', element: <SubmitComplaint /> },
      { path: 'track-complaint', element: <TrackComplaint /> },
      { path: 'feedback', element: <FeedbackLog /> },
      { path: 'verify-csp', element: <VerifyCSP /> },
      { path: 'support', element: <SubmitComplaint /> },
    ],
  },
];

export default customerRoutes;

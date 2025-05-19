
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AgentLayout from '@/layouts/AgentLayout';

const agentRoutes: RouteObject[] = [
  {
    path: '/agent',
    element: <AgentLayout />,
    children: [
      // Add agent routes here as needed
    ],
  },
];

export default agentRoutes;

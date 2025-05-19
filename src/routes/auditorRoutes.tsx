
import React from 'react';
import { RouteObject } from 'react-router-dom';
import AuditorLayout from '@/layouts/AuditorLayout';
import AuditorDashboard from '@/components/dashboards/AuditorDashboard';
import AuditorTasks from '@/pages/auditor/AuditorTasks';
import AuditForm from '@/pages/auditor/AuditForm';
import AuditQuestionnaire from '@/pages/auditor/AuditQuestionnaire';
import VisitLogs from '@/pages/auditor/VisitLogs';
import RedZoneProtocol from '@/pages/auditor/RedZoneProtocol';
import LiveVisitChecklist from '@/pages/auditor/LiveVisitChecklist';

const auditorRoutes: RouteObject[] = [
  {
    path: '/auditor',
    element: <AuditorLayout />,
    children: [
      { index: true, element: <AuditorDashboard /> },
      { path: 'dashboard', element: <AuditorDashboard /> },
      { path: 'tasks', element: <AuditorTasks /> },
      { path: 'audit-form', element: <AuditForm /> },
      { path: 'questionnaire/:id', element: <AuditQuestionnaire /> },
      { path: 'visit-logs', element: <VisitLogs /> },
      { path: 'red-zone', element: <RedZoneProtocol /> },
      { path: 'live-visit-checklist', element: <LiveVisitChecklist /> },
    ],
  },
];

export default auditorRoutes;

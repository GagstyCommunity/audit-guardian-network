
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import AppLayout from "./components/layout/AppLayout";
import PublicLayout from "./components/layout/PublicLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import { UserRole } from "./types/auth.types";

// Public pages
import HowItWorksPage from "./pages/public/HowItWorksPage";
import BecomeCspPage from "./pages/public/BecomeCspPage";
import CustomerCornerPage from "./pages/public/CustomerCornerPage";
import CSRImpactPage from "./pages/public/CSRImpactPage";
import ContactPage from "./pages/public/ContactPage";

const queryClient = new QueryClient();

// Helper function to create routes for each role
const createRoleRoutes = (role: UserRole, basePath: string) => {
  switch (role) {
    case 'admin':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="admin-csp-management" path={`${basePath}/csp-management`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">CSP Management</h1><p>Admin tool to manage CSP agents.</p></div>} />,
        <Route key="admin-audit-assignment" path={`${basePath}/audit-assignment`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Audit Assignment</h1><p>Admin tool to assign audits to auditors.</p></div>} />,
        <Route key="admin-fraud-engine" path={`${basePath}/fraud-engine`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Fraud Engine</h1><p>Admin tool to monitor and manage fraud detection.</p></div>} />,
        <Route key="admin-audit-logs" path={`${basePath}/audit-logs`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Audit Trail Logs</h1><p>Admin tool to view audit logs.</p></div>} />,
        <Route key="admin-notification-hub" path={`${basePath}/notification-hub`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Notification Hub</h1><p>Admin tool to manage notifications.</p></div>} />,
        <Route key="admin-settings" path={`${basePath}/settings`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">System Settings</h1><p>Admin tool to configure system settings.</p></div>} />,
        <Route key="admin-war-mode" path={`${basePath}/war-mode`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">War Mode Control</h1><p>Admin tool to manage war mode settings.</p></div>} />,
      ];
    case 'csp_agent':
    case 'fi_agent':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="agent-transactions" path={`${basePath}/transactions`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Live Transactions</h1><p>Agent tool to process transactions.</p></div>} />,
        <Route key="agent-check-in" path={`${basePath}/check-in`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Facial Check-In</h1><p>Agent tool to complete facial verification.</p></div>} />,
        <Route key="agent-device-status" path={`${basePath}/device-status`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Device Status</h1><p>Agent tool to check device status.</p></div>} />,
        <Route key="agent-dispute" path={`${basePath}/dispute`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Dispute Center</h1><p>Agent tool to manage disputes.</p></div>} />,
        <Route key="agent-reports" path={`${basePath}/reports`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Reports</h1><p>Agent tool to view reports.</p></div>} />,
        <Route key="agent-war-mode" path={`${basePath}/war-mode`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">War Mode Tools</h1><p>Agent tools for emergency situations.</p></div>} />,
        <Route key="agent-army-family" path={`${basePath}/army-family`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Army Family Panel</h1><p>Agent tools for army family services.</p></div>} />,
      ];
    case 'auditor':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="auditor-tasks" path={`${basePath}/tasks`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Assigned Tasks</h1><p>Auditor tool to view assigned audit tasks.</p></div>} />,
        <Route key="auditor-audit-form" path={`${basePath}/audit-form`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Audit Form</h1><p>Auditor tool to complete audit forms.</p></div>} />,
        <Route key="auditor-visit-logs" path={`${basePath}/visit-logs`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Visit Logs</h1><p>Auditor tool to track visit logs.</p></div>} />,
        <Route key="auditor-red-zone" path={`${basePath}/red-zone`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Red Zone Protocol</h1><p>Auditor tool for high-risk areas.</p></div>} />,
      ];
    case 'bank_officer':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="bank-csp-registry" path={`${basePath}/csp-registry`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">CSP Registry</h1><p>Bank officer tool to view CSP registry.</p></div>} />,
        <Route key="bank-fraud-dashboard" path={`${basePath}/fraud-dashboard`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Fraud Dashboard</h1><p>Bank officer tool to monitor fraud.</p></div>} />,
        <Route key="bank-document-access" path={`${basePath}/document-access`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Document Access</h1><p>Bank officer tool to access documents.</p></div>} />,
        <Route key="bank-decisions" path={`${basePath}/decisions`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Decision Panel</h1><p>Bank officer tool to make decisions.</p></div>} />,
        <Route key="bank-reports" path={`${basePath}/reports`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Download Reports</h1><p>Bank officer tool to access reports.</p></div>} />,
        <Route key="bank-military" path={`${basePath}/military`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Military Coordination</h1><p>Bank officer tool for military coordination.</p></div>} />,
      ];
    case 'customer':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="customer-verify" path={`${basePath}/verify`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Verify Fee</h1><p>Customer tool to verify transaction fees.</p></div>} />,
        <Route key="customer-complaint" path={`${basePath}/complaint`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Submit Complaint</h1><p>Customer tool to submit complaints.</p></div>} />,
        <Route key="customer-feedback" path={`${basePath}/feedback`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Feedback Log</h1><p>Customer tool to view feedback status.</p></div>} />,
      ];
    case 'army_welfare_officer':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="army-families" path={`${basePath}/families`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Army Families</h1><p>Army welfare officer tool to manage army families.</p></div>} />,
        <Route key="army-payouts" path={`${basePath}/payouts`} element={<div className="p-6"><h1 className="text-2xl font-bold mb-4">Special Payouts</h1><p>Army welfare officer tool to manage special payouts.</p></div>} />,
      ];
    default:
      return [];
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes with PublicLayout */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="how-it-works" element={<HowItWorksPage />} />
              <Route path="become-csp" element={<BecomeCspPage />} />
              <Route path="customer-corner" element={<CustomerCornerPage />} />
              <Route path="csr-impact" element={<CSRImpactPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
            
            {/* Login Route - outside of other layouts */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes with AppLayout */}
            <Route path="/dashboard" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AppLayout requiredRoles={['admin']} />}>
              {createRoleRoutes('admin', '/admin')}
            </Route>

            {/* Agent Routes */}
            <Route path="/agent" element={<AppLayout requiredRoles={['csp_agent', 'fi_agent']} />}>
              {createRoleRoutes('csp_agent', '/agent')}
            </Route>

            {/* Auditor Routes */}
            <Route path="/auditor" element={<AppLayout requiredRoles={['auditor']} />}>
              {createRoleRoutes('auditor', '/auditor')}
            </Route>

            {/* Bank Officer Routes */}
            <Route path="/bank" element={<AppLayout requiredRoles={['bank_officer']} />}>
              {createRoleRoutes('bank_officer', '/bank')}
            </Route>

            {/* Customer Routes */}
            <Route path="/customer" element={<AppLayout requiredRoles={['customer']} />}>
              {createRoleRoutes('customer', '/customer')}
            </Route>

            {/* Army Welfare Routes */}
            <Route path="/army" element={<AppLayout requiredRoles={['army_welfare_officer']} />}>
              {createRoleRoutes('army_welfare_officer', '/army')}
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

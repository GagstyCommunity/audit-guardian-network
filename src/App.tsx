
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

// Admin pages
import CSPManagement from "./pages/admin/CSPManagement";
import FraudEngine from "./pages/admin/FraudEngine";
import AuditTrailLogs from "./pages/admin/AuditTrailLogs";
import AuditAssignment from "./pages/admin/AuditAssignment";
import NotificationHub from "./pages/admin/NotificationHub";
import SystemSettings from "./pages/admin/SystemSettings";
import WarModeControl from "./pages/admin/WarModeControl";

// Agent pages
import Transactions from "./pages/agent/Transactions";
import FacialCheckIn from "./pages/agent/FacialCheckIn";
import DeviceStatus from "./pages/agent/DeviceStatus";
import DisputeCenter from "./pages/agent/DisputeCenter";
import AgentReports from "./pages/agent/AgentReports";
import WarModeTools from "./pages/agent/WarModeTools";
import ArmyFamilyPanel from "./pages/agent/ArmyFamilyPanel";
import MonthlySelfCheck from "./pages/agent/MonthlySelfCheck";
import FraudAlerts from "./pages/agent/FraudAlerts";

// Auditor pages
import AuditorTasks from "./pages/auditor/AuditorTasks";
import AuditForm from "./pages/auditor/AuditForm";
import VisitLogs from "./pages/auditor/VisitLogs";
import RedZoneProtocol from "./pages/auditor/RedZoneProtocol";
import LiveVisitChecklist from "./pages/auditor/LiveVisitChecklist";

// Bank Officer pages
import CSPRegistry from "./pages/bank/CSPRegistry";
import FraudDashboard from "./pages/bank/FraudDashboard";
import DocumentAccess from "./pages/bank/DocumentAccess";
import DecisionPanel from "./pages/bank/DecisionPanel";
import DownloadReports from "./pages/bank/DownloadReports";
import MilitaryCoordination from "./pages/bank/MilitaryCoordination";
import CustomerComplaintsReview from "./pages/bank/CustomerComplaintsReview";

// Customer pages
import VerifyFee from "./pages/customer/VerifyFee";
import SubmitComplaint from "./pages/customer/SubmitComplaint";
import FeedbackLog from "./pages/customer/FeedbackLog";
import VerifyCSP from "./pages/customer/VerifyCSP";
import TrackComplaint from "./pages/customer/TrackComplaint";

// Army Welfare pages
import ArmyFamilies from "./pages/army/ArmyFamilies";
import SpecialPayouts from "./pages/army/SpecialPayouts";

const queryClient = new QueryClient();

// Helper function to create routes for each role
const createRoleRoutes = (role: UserRole, basePath: string) => {
  switch (role) {
    case 'admin':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="admin-csp-management" path={`${basePath}/csp-management`} element={<CSPManagement />} />,
        <Route key="admin-audit-assignment" path={`${basePath}/audit-assignment`} element={<AuditAssignment />} />,
        <Route key="admin-fraud-engine" path={`${basePath}/fraud-engine`} element={<FraudEngine />} />,
        <Route key="admin-audit-logs" path={`${basePath}/audit-logs`} element={<AuditTrailLogs />} />,
        <Route key="admin-notification-hub" path={`${basePath}/notification-hub`} element={<NotificationHub />} />,
        <Route key="admin-settings" path={`${basePath}/settings`} element={<SystemSettings />} />,
        <Route key="admin-war-mode" path={`${basePath}/war-mode`} element={<WarModeControl />} />,
      ];
    case 'csp_agent':
    case 'fi_agent':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="agent-transactions" path={`${basePath}/transactions`} element={<Transactions />} />,
        <Route key="agent-check-in" path={`${basePath}/check-in`} element={<FacialCheckIn />} />,
        <Route key="agent-device-status" path={`${basePath}/device-status`} element={<DeviceStatus />} />,
        <Route key="agent-dispute" path={`${basePath}/dispute`} element={<DisputeCenter />} />,
        <Route key="agent-reports" path={`${basePath}/reports`} element={<AgentReports />} />,
        <Route key="agent-war-mode" path={`${basePath}/war-mode`} element={<WarModeTools />} />,
        <Route key="agent-army-family" path={`${basePath}/army-family`} element={<ArmyFamilyPanel />} />,
        <Route key="agent-self-check" path={`${basePath}/self-check`} element={<MonthlySelfCheck />} />,
        <Route key="agent-fraud-alerts" path={`${basePath}/fraud-alerts`} element={<FraudAlerts />} />,
      ];
    case 'auditor':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="auditor-tasks" path={`${basePath}/tasks`} element={<AuditorTasks />} />,
        <Route key="auditor-audit-form" path={`${basePath}/audit-form`} element={<AuditForm />} />,
        <Route key="auditor-visit-logs" path={`${basePath}/visit-logs`} element={<VisitLogs />} />,
        <Route key="auditor-red-zone" path={`${basePath}/red-zone`} element={<RedZoneProtocol />} />,
        <Route key="auditor-checklist" path={`${basePath}/live-visit`} element={<LiveVisitChecklist />} />,
      ];
    case 'bank_officer':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="bank-csp-registry" path={`${basePath}/csp-registry`} element={<CSPRegistry />} />,
        <Route key="bank-fraud-dashboard" path={`${basePath}/fraud-dashboard`} element={<FraudDashboard />} />,
        <Route key="bank-document-access" path={`${basePath}/document-access`} element={<DocumentAccess />} />,
        <Route key="bank-decisions" path={`${basePath}/decisions`} element={<DecisionPanel />} />,
        <Route key="bank-reports" path={`${basePath}/reports`} element={<DownloadReports />} />,
        <Route key="bank-military" path={`${basePath}/military`} element={<MilitaryCoordination />} />,
        <Route key="bank-complaints" path={`${basePath}/complaints`} element={<CustomerComplaintsReview />} />,
      ];
    case 'customer':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="customer-verify" path={`${basePath}/verify`} element={<VerifyFee />} />,
        <Route key="customer-complaint" path={`${basePath}/complaint`} element={<SubmitComplaint />} />,
        <Route key="customer-feedback" path={`${basePath}/feedback`} element={<FeedbackLog />} />,
        <Route key="customer-verify-csp" path={`${basePath}/verify-csp`} element={<VerifyCSP />} />,
        <Route key="customer-track" path={`${basePath}/track`} element={<TrackComplaint />} />,
      ];
    case 'army_welfare_officer':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="army-families" path={`${basePath}/families`} element={<ArmyFamilies />} />,
        <Route key="army-payouts" path={`${basePath}/payouts`} element={<SpecialPayouts />} />,
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
              
              {/* Public Customer Routes */}
              <Route path="verify-csp" element={<VerifyCSP />} />
              <Route path="submit-complaint" element={<SubmitComplaint />} />
              <Route path="track-complaint" element={<TrackComplaint />} />
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

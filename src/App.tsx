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

// CSP Agent pages
import Transactions from "./pages/agent/Transactions";
import FacialCheckIn from "./pages/agent/FacialCheckIn";
import DeviceStatus from "./pages/agent/DeviceStatus";
import DisputeCenter from "./pages/agent/DisputeCenter";
import AgentReports from "./pages/agent/AgentReports";
import WarModeTools from "./pages/agent/WarModeTools";
import MonthlySelfCheck from "./pages/agent/MonthlySelfCheck";
import FraudAlerts from "./pages/agent/FraudAlerts";

// Field Auditor pages
import AuditorTasks from "./pages/auditor/AuditorTasks";
import AuditForm from "./pages/auditor/AuditForm";
import VisitLogs from "./pages/auditor/VisitLogs";
import RedZoneProtocol from "./pages/auditor/RedZoneProtocol";
import LiveVisitChecklist from "./pages/auditor/LiveVisitChecklist";
import AuditQuestionnaire from "./pages/auditor/AuditQuestionnaire";

// Bank Officer pages
import CSPRegistry from "./pages/bank/CSPRegistry";
import FraudDashboard from "./pages/bank/FraudDashboard";
import DocumentAccess from "./pages/bank/DocumentAccess";
import DecisionPanel from "./pages/bank/DecisionPanel";
import DownloadReports from "./pages/bank/DownloadReports";
import MilitaryCoordination from "./pages/bank/MilitaryCoordination";
import CustomerComplaintsReview from "./pages/bank/CustomerComplaintsReview";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import AccountDetails from "./pages/customer/AccountDetails";

// Customer pages
import VerifyFee from "./pages/customer/VerifyFee";
import SubmitComplaint from "./pages/customer/SubmitComplaint";
import FeedbackLog from "./pages/customer/FeedbackLog";
import VerifyCSP from "./pages/customer/VerifyCSP";
import TrackComplaint from "./pages/customer/TrackComplaint";

// New pages for CSP 
import RewardsDashboard from "./pages/csp/RewardsDashboard";
import GadgetCenter from "./pages/csp/GadgetCenter";

// New page for Auditor
import AuditChecklist from "./components/auditor/AuditChecklist";

// Cluster Manager pages
import ChecklistEditor from "./pages/cluster-manager/ChecklistEditor";
import CSPManagementCluster from "./pages/cluster-manager/CSPManagement";

// Compliance pages
import AuditQuestions from "./pages/compliance/AuditQuestions";

// HR pages
import StaffDirectory from "./pages/hr/StaffDirectory";

// IT pages
import DeviceInventory from "./pages/it/DeviceInventory";

// FI Agent pages
import FiDashboard from "./pages/fi/FiDashboard";
import CustomerAccounts from "./pages/fi/CustomerAccounts";

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
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="csp-transactions" path={`${basePath}/transactions`} element={<Transactions />} />,
        <Route key="csp-check-in" path={`${basePath}/check-in`} element={<FacialCheckIn />} />,
        <Route key="csp-device-status" path={`${basePath}/device-status`} element={<DeviceStatus />} />,
        <Route key="csp-dispute" path={`${basePath}/dispute`} element={<DisputeCenter />} />,
        <Route key="csp-reports" path={`${basePath}/reports`} element={<AgentReports />} />,
        <Route key="csp-war-mode" path={`${basePath}/war-mode`} element={<WarModeTools />} />,
        <Route key="csp-self-check" path={`${basePath}/self-audit`} element={<MonthlySelfCheck />} />,
        <Route key="csp-fraud-alerts" path={`${basePath}/fraud-alerts`} element={<FraudAlerts />} />,
        <Route key="csp-rewards" path={`${basePath}/rewards`} element={<RewardsDashboard />} />,
        <Route key="csp-gadget-center" path={`${basePath}/gadget-center`} element={<GadgetCenter />} />,
      ];
    case 'field_auditor':
    case 'auditor': // Added this case to handle both auditor roles
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="auditor-tasks" path={`${basePath}/tasks`} element={<AuditorTasks />} />,
        <Route key="auditor-audit-form" path={`${basePath}/audit-form`} element={<AuditForm />} />,
        <Route key="auditor-visit-logs" path={`${basePath}/visit-logs`} element={<VisitLogs />} />,
        <Route key="auditor-red-zone" path={`${basePath}/red-zone`} element={<RedZoneProtocol />} />,
        <Route key="auditor-checklist" path={`${basePath}/live-visit`} element={<LiveVisitChecklist />} />,
        <Route key="auditor-rewards" path={`${basePath}/rewards`} element={<RewardsDashboard />} />,
        <Route key="auditor-questionnaire" path={`${basePath}/questionnaire/:id`} element={<AuditQuestionnaire />} />,
        <Route key="auditor-questionnaire-new" path={`${basePath}/questionnaire`} element={<AuditQuestionnaire />} />,
      ];
    case 'cluster_manager':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="cluster-checklist-editor" path={`${basePath}/checklist-editor`} element={<ChecklistEditor />} />,
        <Route key="cluster-csp-management" path={`${basePath}/csp-management`} element={<CSPManagementCluster />} />,
      ];
    case 'ops_training':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
      ];
    case 'compliance':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="compliance-audit-questions" path={`${basePath}/audit-questions`} element={<AuditQuestions />} />,
      ];
    case 'it_infra':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="it-device-inventory" path={`${basePath}/device-inventory`} element={<DeviceInventory />} />,
      ];
    case 'hr':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        <Route key="hr-staff-directory" path={`${basePath}/staff-directory`} element={<StaffDirectory />} />,
      ];
    case 'customer_support':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
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
    case 'fi_agent':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<FiDashboard />} />,
        <Route key="fi-customer-accounts" path={`${basePath}/customer-accounts`} element={<CustomerAccounts />} />,
      ];
    case 'customer':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<CustomerDashboard />} />,
        <Route key="customer-accounts" path={`${basePath}/accounts`} element={<AccountDetails />} />,
        <Route key="customer-transactions" path={`${basePath}/transactions`} element={<Transactions />} />,
        <Route key="customer-verify-fee" path={`${basePath}/verify-fee`} element={<VerifyFee />} />,
        <Route key="customer-submit-complaint" path={`${basePath}/submit-complaint`} element={<SubmitComplaint />} />,
        <Route key="customer-feedback" path={`${basePath}/feedback`} element={<FeedbackLog />} />,
        <Route key="customer-verify-csp" path={`${basePath}/verify-csp`} element={<VerifyCSP />} />,
        <Route key="customer-track-complaint" path={`${basePath}/track-complaint`} element={<TrackComplaint />} />,
        <Route key="customer-support" path={`${basePath}/support`} element={<SubmitComplaint />} />,
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

            {/* CSP Agent Routes */}
            <Route path="/csp" element={<AppLayout requiredRoles={['csp_agent']} />}>
              {createRoleRoutes('csp_agent', '/csp')}
            </Route>

            {/* Field Auditor Routes - update to include both auditor roles */}
            <Route path="/auditor" element={<AppLayout requiredRoles={['field_auditor', 'auditor']} />}>
              {createRoleRoutes('field_auditor', '/auditor')}
            </Route>

            {/* Cluster Manager Routes */}
            <Route path="/cluster-manager" element={<AppLayout requiredRoles={['cluster_manager']} />}>
              {createRoleRoutes('cluster_manager', '/cluster-manager')}
            </Route>

            {/* Ops/Training Routes */}
            <Route path="/ops" element={<AppLayout requiredRoles={['ops_training']} />}>
              {createRoleRoutes('ops_training', '/ops')}
            </Route>

            {/* Compliance Routes */}
            <Route path="/compliance" element={<AppLayout requiredRoles={['compliance']} />}>
              {createRoleRoutes('compliance', '/compliance')}
            </Route>

            {/* IT/Infra Routes */}
            <Route path="/it" element={<AppLayout requiredRoles={['it_infra']} />}>
              {createRoleRoutes('it_infra', '/it')}
            </Route>

            {/* HR Routes */}
            <Route path="/hr" element={<AppLayout requiredRoles={['hr']} />}>
              {createRoleRoutes('hr', '/hr')}
            </Route>

            {/* Customer Support Routes */}
            <Route path="/support" element={<AppLayout requiredRoles={['customer_support']} />}>
              {createRoleRoutes('customer_support', '/support')}
            </Route>

            {/* Bank Officer Routes */}
            <Route path="/bank" element={<AppLayout requiredRoles={['bank_officer']} />}>
              {createRoleRoutes('bank_officer', '/bank')}
            </Route>

            {/* FI Agent Routes */}
            <Route path="/fi" element={<AppLayout requiredRoles={['fi_agent']} />}>
              {createRoleRoutes('fi_agent', '/fi')}
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

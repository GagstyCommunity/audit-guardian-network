
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import { UserRole } from "./types/auth.types";

const queryClient = new QueryClient();

// Helper function to create routes for each role
const createRoleRoutes = (role: UserRole, basePath: string) => {
  switch (role) {
    case 'admin':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        // Add other admin routes here
      ];
    case 'csp_agent':
    case 'fi_agent':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        // Add other agent routes here
      ];
    case 'auditor':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        // Add other auditor routes here
      ];
    case 'bank_officer':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        // Add other bank officer routes here
      ];
    case 'customer':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        // Add other customer routes here
      ];
    case 'army_welfare_officer':
      return [
        <Route key={`${role}-dash`} path={`${basePath}`} element={<Dashboard />} />,
        // Add other army welfare officer routes here
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
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected Routes */}
            {/* Dashboard - accessible by all authenticated users */}
            <Route
              path="/dashboard"
              element={
                <AppLayout />
              }
            >
              <Route index element={<Dashboard />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AppLayout requiredRoles={['admin']} />
              }
            >
              {createRoleRoutes('admin', '/admin')}
            </Route>

            {/* Agent Routes */}
            <Route
              path="/agent"
              element={
                <AppLayout requiredRoles={['csp_agent', 'fi_agent']} />
              }
            >
              {createRoleRoutes('csp_agent', '/agent')}
            </Route>

            {/* Auditor Routes */}
            <Route
              path="/auditor"
              element={
                <AppLayout requiredRoles={['auditor']} />
              }
            >
              {createRoleRoutes('auditor', '/auditor')}
            </Route>

            {/* Bank Officer Routes */}
            <Route
              path="/bank"
              element={
                <AppLayout requiredRoles={['bank_officer']} />
              }
            >
              {createRoleRoutes('bank_officer', '/bank')}
            </Route>

            {/* Customer Routes */}
            <Route
              path="/customer"
              element={
                <AppLayout requiredRoles={['customer']} />
              }
            >
              {createRoleRoutes('customer', '/customer')}
            </Route>

            {/* Army Welfare Routes */}
            <Route
              path="/army"
              element={
                <AppLayout requiredRoles={['army_welfare_officer']} />
              }
            >
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


import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import PublicNavigation from './PublicNavigation';
import { colorPalette } from '../../types/auth.types';

const PublicLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-csp-navy py-8 text-white" style={{ backgroundColor: colorPalette.primaryPurple }}>
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-lg font-bold">CSP Management</span>
              </div>
              <p className="text-sm text-gray-300">
                Secure banking services for everyone, everywhere.
              </p>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="/become-csp" className="hover:text-white">Become a CSP</a></li>
                <li><a href="/customer-corner" className="hover:text-white">Customer Corner</a></li>
                <li><a href="/csr-impact" className="hover:text-white">CSR Impact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/contact" className="hover:text-white">Help Center</a></li>
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
                <li><a href="/contact" className="hover:text-white">FAQ</a></li>
                <li><a href="/contact" className="hover:text-white">Report Fraud</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Email: support@cspmanagement.com</li>
                <li>Phone: +91 1234567890</li>
                <li>WhatsApp Helpline: +91 9876543210</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            <p>© 2025 CSP Management Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default PublicLayout;

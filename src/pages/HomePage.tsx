
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  CheckCircle, 
  MapPin, 
  FileText, 
  Users, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { isAuthenticated, user } = authState;

  // Redirect authenticated users to their dashboard
  const handleGetStarted = () => {
    if (isAuthenticated && user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-csp-navy to-csp-blue py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">Secure Banking Services at Your Doorstep</h1>
              <p className="mb-8 text-lg">
                The CSP Management Platform provides secure, auditable banking operations in the most remote areas with tamper-proof auditing and compliance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={handleGetStarted}
                  size="lg" 
                  className="bg-white font-semibold text-csp-blue hover:bg-gray-100"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-csp-blue"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="h-64 w-64 rounded-full bg-white/10 p-4">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white/20">
                    <Shield className="h-32 w-32 text-white" />
                  </div>
                </div>
                <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-csp-accent text-white">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="absolute -bottom-4 -left-4 flex h-16 w-16 items-center justify-center rounded-full bg-csp-success text-white">
                  <Users className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-csp-navy">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-csp-blue text-white">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-csp-navy">Secure Transactions</h3>
              <p className="text-gray-600">
                End-to-end encrypted transactions with multi-factor authentication and blockchain audit logs.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-csp-blue text-white">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-csp-navy">Remote Banking</h3>
              <p className="text-gray-600">
                Bring banking services to remote areas with GPS-verified agents and offline transaction capability.
              </p>
            </div>
            
            <div className="rounded-lg bg-gray-50 p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-csp-blue text-white">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-csp-navy">Tamper-Proof Auditing</h3>
              <p className="text-gray-600">
                Facial verification and GPS-tagged audits with immutable records for complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <h3 className="mb-2 text-3xl font-bold text-csp-blue">5,000+</h3>
              <p className="text-gray-600">Active CSP Agents</p>
            </div>
            
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <h3 className="mb-2 text-3xl font-bold text-csp-blue">₹2.5M+</h3>
              <p className="text-gray-600">Daily Transactions</p>
            </div>
            
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <h3 className="mb-2 text-3xl font-bold text-csp-blue">99.8%</h3>
              <p className="text-gray-600">Compliance Rate</p>
            </div>
            
            <div className="rounded-lg bg-white p-6 text-center shadow-md">
              <h3 className="mb-2 text-3xl font-bold text-csp-blue">12,000+</h3>
              <p className="text-gray-600">Remote Villages Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-csp-blue py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Join our network of trusted CSP agents or explore our services for your banking needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white font-semibold text-csp-blue hover:bg-gray-100"
              onClick={() => navigate('/login')}
            >
              Become a CSP
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white font-semibold text-white hover:bg-white hover:text-csp-blue"
              onClick={() => navigate('/login')}
            >
              Customer Corner
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-csp-navy py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <span className="text-lg font-bold">CSP Management</span>
              </div>
              <p className="text-sm text-gray-300">
                Secure banking services for everyone, everywhere.
              </p>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">How It Works</a></li>
                <li><a href="#" className="hover:text-white">Become a CSP</a></li>
                <li><a href="#" className="hover:text-white">Customer Corner</a></li>
                <li><a href="#" className="hover:text-white">CSR Impact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Report Fraud</a></li>
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
    </div>
  );
};

export default HomePage;

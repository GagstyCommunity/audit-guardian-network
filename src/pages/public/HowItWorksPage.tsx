
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, UserCheck, ArrowRight, Shield, Banknote, FileCheck } from 'lucide-react';
import { colorPalette } from '../../types/auth.types';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: colorPalette.primaryPurple }}>How the CSP System Works</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our Bank Correspondent Service Point (CSP) system brings banking services to remote areas through a secure, audited network of trusted agents.
        </p>
      </div>

      {/* Section 1: AEPS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>Aadhaar Enabled Payment System (AEPS)</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full p-2" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                      <CheckCircle className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Biometric Authentication</h3>
                      <p className="text-gray-600">
                        Secure transactions using fingerprint authentication linked to your Aadhaar number.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full p-2" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                      <UserCheck className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Instant Verification</h3>
                      <p className="text-gray-600">
                        Immediate identity verification through the UIDAI server for secure transactions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full p-2" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                      <ArrowRight className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Services Available</h3>
                      <p className="text-gray-600">
                        Cash withdrawal, balance inquiry, money transfer, and mini statement generation.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-gray-100 rounded-lg flex items-center justify-center p-8">
            <img src="https://via.placeholder.com/400x300/e2e8f0/5D2E8C?text=AEPS+Process+Diagram" alt="AEPS Process" className="rounded-lg shadow-md" />
          </div>
        </div>
      </section>

      {/* Section 2: Micro ATM */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>Micro ATM Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg flex items-center justify-center p-8 order-1 md:order-none">
            <img src="https://via.placeholder.com/400x300/e2e8f0/5D2E8C?text=Micro+ATM+Device" alt="Micro ATM Device" className="rounded-lg shadow-md" />
          </div>
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full p-2" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                      <Shield className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Card-Based Transactions</h3>
                      <p className="text-gray-600">
                        Secure debit card transactions using portable Micro ATM devices.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full p-2" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                      <Banknote className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Cash Services</h3>
                      <p className="text-gray-600">
                        Withdrawal, deposit, and fund transfers using any bank's debit card.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full p-2" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                      <FileCheck className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Transaction Receipts</h3>
                      <p className="text-gray-600">
                        Printed receipt for every transaction for record-keeping and verification.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3: KYC Services */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>KYC and Account Opening</h2>
        <div className="bg-gray-50 p-8 rounded-lg">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full p-3" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                    <UserCheck className="h-8 w-8" style={{ color: colorPalette.primaryPurple }} />
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">Document Collection</h3>
                <p className="text-gray-600">
                  CSP agents collect and verify identity and address proof documents at your doorstep.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full p-3" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                    <Shield className="h-8 w-8" style={{ color: colorPalette.primaryPurple }} />
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">Biometric Capture</h3>
                <p className="text-gray-600">
                  Secure fingerprint and photo capture for eKYC verification through official channels.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full p-3" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                    <FileCheck className="h-8 w-8" style={{ color: colorPalette.primaryPurple }} />
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">Account Activation</h3>
                <p className="text-gray-600">
                  Quick processing and activation of new accounts with doorstep delivery of welcome kits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-2">What is a CSP Agent?</h3>
              <p className="text-gray-600">
                A Customer Service Point (CSP) Agent is an authorized representative who provides banking services in areas where traditional bank branches are not available. They are equipped with secure devices and trained to handle various banking transactions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-2">Is my money safe with CSP Agents?</h3>
              <p className="text-gray-600">
                Yes. All CSP Agents undergo rigorous verification, training, and continuous monitoring. Every transaction is secured with multi-factor authentication and real-time verification with the bank. Agents also undergo regular audits to ensure compliance.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium text-lg mb-2">What services can I access through a CSP?</h3>
              <p className="text-gray-600">
                CSP Agents provide a wide range of services including cash deposits and withdrawals, money transfers, balance inquiries, mini statements, account opening, loan applications, bill payments, and government subsidy disbursements.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;

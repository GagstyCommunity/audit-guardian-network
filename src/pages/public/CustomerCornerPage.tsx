
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Search, FileText, MessageSquare, QrCode, AlertCircle } from 'lucide-react';
import { colorPalette } from '../../types/auth.types';

const CustomerCornerPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: colorPalette.primaryPurple }}>Customer Corner</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Access services, verify fees, submit complaints, and track status of your inquiries.
        </p>
      </div>
      
      <Tabs defaultValue="verify" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verify">Verify Fee</TabsTrigger>
          <TabsTrigger value="complaint">Submit Complaint</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Status</TabsTrigger>
        </TabsList>
        
        {/* Verify Fee Tab */}
        <TabsContent value="verify">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: colorPalette.primaryPurple }}>Verify Transaction Fee</CardTitle>
              <CardDescription>
                Check if the fee charged by a CSP agent for a transaction is correct by entering your receipt ID or scanning the QR code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="receipt">Receipt ID / Transaction ID</Label>
                      <div className="flex gap-2">
                        <Input id="receipt" placeholder="Enter Receipt ID (e.g., FI23456789)" />
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-shrink-0"
                          style={{ borderColor: colorPalette.primaryPurple, color: colorPalette.primaryPurple }}
                        >
                          <Search className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="mx-4 text-sm text-gray-500">OR</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    
                    <div className="text-center">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        style={{ borderColor: colorPalette.primaryPurple, color: colorPalette.primaryPurple }}
                      >
                        <QrCode className="h-4 w-4" />
                        Scan QR Code on Receipt
                      </Button>
                      
                      <p className="mt-2 text-sm text-gray-500">
                        Scan the QR code printed on your transaction receipt
                      </p>
                    </div>
                    
                    <div className="mt-4 p-4 rounded-lg bg-yellow-50 border border-yellow-200 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800">Important Notice</p>
                        <p className="text-sm text-amber-700">
                          Always ask for a receipt after completing a transaction with a CSP agent. 
                          The receipt contains important information to verify the transaction and fee.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center border rounded-lg p-6 bg-gray-50">
                  <FileText className="h-16 w-16 mb-4" style={{ color: colorPalette.primaryPurple }} />
                  <h3 className="text-lg font-medium mb-2">Official Fee Structure</h3>
                  <p className="text-center text-gray-600 mb-4">
                    View the official fee structure for all CSP transactions.
                  </p>
                  <div className="w-full space-y-3">
                    <div className="flex justify-between px-4 py-2 bg-white rounded border">
                      <span>Cash Withdrawal (AEPS)</span>
                      <span className="font-medium">₹10</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 bg-white rounded border">
                      <span>Cash Deposit (upto ₹5,000)</span>
                      <span className="font-medium">₹15</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 bg-white rounded border">
                      <span>Money Transfer (IMPS)</span>
                      <span className="font-medium">₹20</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 bg-white rounded border">
                      <span>Balance Inquiry</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 bg-white rounded border">
                      <span>Mini Statement</span>
                      <span className="font-medium">₹5</span>
                    </div>
                    <Button
                      variant="link"
                      style={{ color: colorPalette.primaryPurple }}
                    >
                      View Complete Fee Chart
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Submit Complaint Tab */}
        <TabsContent value="complaint">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: colorPalette.primaryPurple }}>Submit a Complaint</CardTitle>
              <CardDescription>
                If you experienced any issues with a CSP agent or service, please submit a complaint below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" placeholder="Enter your phone number" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="receiptId">Receipt ID / Transaction ID (Optional)</Label>
                  <Input id="receiptId" placeholder="Enter receipt ID if available" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cspId">CSP ID / Agent Name / Location</Label>
                  <Input id="cspId" placeholder="Enter CSP ID, agent name, or location" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="complaintType">Type of Complaint</Label>
                  <select
                    id="complaintType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" disabled selected>Select complaint type</option>
                    <option value="overcharge">Overcharged Fees</option>
                    <option value="behavior">Agent Behavior</option>
                    <option value="service">Service Denial</option>
                    <option value="technical">Technical Issue</option>
                    <option value="transaction">Failed Transaction</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Describe Your Issue</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please provide details about your complaint..."
                    rows={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="evidence">Upload Evidence (Optional)</Label>
                  <Input id="evidence" type="file" multiple />
                  <p className="text-sm text-gray-500">
                    You can upload photos of receipts, screenshots, or other evidence (Max 3 files, 5MB each)
                  </p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">Cancel</Button>
              <Button 
                style={{ backgroundColor: colorPalette.primaryPurple, color: 'white' }}
              >
                Submit Complaint
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Feedback & Status Tab */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: colorPalette.primaryPurple }}>Track Complaint Status</CardTitle>
              <CardDescription>
                Check the status of your previously submitted complaints or provide additional feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="trackingId">Complaint Tracking ID</Label>
                  <div className="flex gap-2">
                    <Input id="trackingId" placeholder="Enter your complaint tracking ID" />
                    <Button
                      type="button"
                      className="flex-shrink-0 text-white"
                      style={{ backgroundColor: colorPalette.primaryPurple }}
                    >
                      <Search className="h-4 w-4 mr-1" />
                      Track
                    </Button>
                  </div>
                </div>
                
                <div className="my-8 text-center">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4" style={{ color: `${colorPalette.primaryPurple}50` }} />
                  <p className="text-gray-500">
                    Enter your complaint tracking ID to view its current status
                  </p>
                </div>
                
                {/* Sample complaint status (would normally be shown after query) */}
                <div className="p-4 border rounded-lg bg-gray-50 hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">Complaint #FG12345678</h3>
                      <p className="text-sm text-gray-600">Submitted on: 08 May 2025</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      In Progress
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Type:</p>
                      <p>Overcharged Fees</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Description:</p>
                      <p className="text-gray-700">
                        The agent charged me ₹50 for a cash withdrawal transaction when the official fee is ₹10.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status Updates:</p>
                      <ul className="space-y-2 mt-2">
                        <li className="flex gap-3">
                          <span className="w-24 text-xs text-gray-500">10 May 2025</span>
                          <span className="flex-1 text-sm">Complaint assigned to regional officer</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="w-24 text-xs text-gray-500">09 May 2025</span>
                          <span className="flex-1 text-sm">Complaint verified and accepted for investigation</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="w-24 text-xs text-gray-500">08 May 2025</span>
                          <span className="flex-1 text-sm">Complaint received</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Need Immediate Assistance?</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    If your issue requires immediate attention, please contact our customer support:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-white rounded border border-blue-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>Toll-Free: 1800-123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded border border-blue-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>WhatsApp: +91 9876543210</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerCornerPage;

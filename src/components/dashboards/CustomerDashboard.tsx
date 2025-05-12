
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  CheckCircle, 
  MessageSquare, 
  ReceiptText, 
  Clock, 
  AlertCircle,
  MapPin,
  Search
} from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Customer Portal</CardTitle>
          <CardDescription>
            Verify fees, submit complaints, and track your issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            This portal allows you to verify the official fees for banking services provided by Customer Service Points (CSPs) and report any discrepancies or issues you encounter.
          </p>
        </CardContent>
      </Card>

      {/* Verify Fee Section */}
      <Card>
        <CardHeader>
          <CardTitle>Verify CSP Fee</CardTitle>
          <CardDescription>Check if you were charged the correct amount</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Enter Receipt ID" />
              <Button className="bg-csp-blue hover:bg-csp-steel">
                <Search className="mr-2 h-4 w-4" />
                Verify
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              <p>You can find the Receipt ID at the top of your transaction receipt</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Complaint */}
      <Card>
        <CardHeader>
          <CardTitle>Submit a Complaint</CardTitle>
          <CardDescription>Report an issue with a CSP agent or service</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cspId" className="text-sm font-medium">CSP ID or Location</label>
              <Input id="cspId" placeholder="Enter CSP ID or location details" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="issueType" className="text-sm font-medium">Type of Issue</label>
              <select 
                id="issueType"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="">Select an issue type</option>
                <option value="overcharging">Overcharging</option>
                <option value="service-denial">Service Denial</option>
                <option value="agent-behavior">Agent Behavior</option>
                <option value="transaction-issue">Transaction Issue</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Describe your issue</label>
              <Textarea 
                id="description" 
                placeholder="Please provide details of your issue..."
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contact" className="text-sm font-medium">Contact Number</label>
              <Input id="contact" placeholder="Enter your phone number" />
            </div>
            
            <Button className="w-full bg-csp-blue hover:bg-csp-steel">
              <MessageSquare className="mr-2 h-4 w-4" />
              Submit Complaint
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
          <CardDescription>Status of your recent submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Complaint #2458</p>
                  <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                </div>
                <p className="text-sm text-gray-500">Overcharging for AEPS service</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>Submitted: 2 days ago</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>CSP: #245, North District</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Complaint #2476</p>
                  <Badge className="bg-amber-100 text-amber-800">In Progress</Badge>
                </div>
                <p className="text-sm text-gray-500">Service denial for account opening</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>Submitted: Yesterday</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>CSP: #108, East District</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Find Nearby CSP */}
      <Card>
        <CardHeader>
          <CardTitle>Find Nearby CSP</CardTitle>
          <CardDescription>Locate CSP agents in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input placeholder="Enter Pincode or Village Name" />
              <Button className="bg-csp-blue hover:bg-csp-steel">
                <MapPin className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Section */}
      <Card>
        <CardHeader>
          <CardTitle>Give Feedback</CardTitle>
          <CardDescription>Help us improve our services</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="feedbackType" className="text-sm font-medium">Feedback Type</label>
              <select 
                id="feedbackType"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="">Select feedback type</option>
                <option value="service">Service Quality</option>
                <option value="app">Portal Experience</option>
                <option value="suggestion">Suggestion</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="feedback" className="text-sm font-medium">Your Feedback</label>
              <Textarea 
                id="feedback" 
                placeholder="Share your thoughts or suggestions..."
                rows={4}
              />
            </div>
            
            <Button variant="outline" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboard;

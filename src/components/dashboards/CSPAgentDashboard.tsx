
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  CreditCard,
  UserCheck,
  FileText,
  Upload,
  MessageSquare
} from 'lucide-react';

const CSPAgentDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <div className="space-y-6">
      {/* Agent Status Card */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Agent Status</CardTitle>
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Risk Score</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">15</span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
              <p className="text-xs text-gray-500">Low Risk</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">North Zone #245</p>
              <p className="text-xs text-gray-500">GPS Verified</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Last Check-In</p>
              <p className="font-medium">2 days ago</p>
              <p className="text-xs text-green-600">Valid</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Required Alert */}
      <Alert className="border-amber-500 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-800">Action Required</AlertTitle>
        <AlertDescription className="text-amber-700">
          Your monthly facial verification is due in 3 days. Please complete it to maintain your active status.
        </AlertDescription>
        <Button variant="outline" className="mt-2 border-amber-500 text-amber-600 hover:bg-amber-100 hover:text-amber-700">
          Complete Now
        </Button>
      </Alert>

      {/* Transaction Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Transactions</CardTitle>
          <CardDescription>Summary of transactions processed today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">AEPS</p>
                <Badge className="bg-blue-100 text-blue-800">18</Badge>
              </div>
              <p className="text-2xl font-bold">₹24,560</p>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>12% from yesterday</span>
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Micro ATM</p>
                <Badge className="bg-purple-100 text-purple-800">24</Badge>
              </div>
              <p className="text-2xl font-bold">₹32,800</p>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>8% from yesterday</span>
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Money Transfer</p>
                <Badge className="bg-green-100 text-green-800">15</Badge>
              </div>
              <p className="text-2xl font-bold">₹18,450</p>
              <div className="mt-2 flex items-center text-xs text-red-600">
                <ArrowUpRight className="mr-1 h-3 w-3 rotate-45" />
                <span>4% from yesterday</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <CreditCard className="h-6 w-6 text-csp-blue" />
              <span>New Transaction</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <UserCheck className="h-6 w-6 text-csp-blue" />
              <span>Check-In</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <FileText className="h-6 w-6 text-csp-blue" />
              <span>Daily Report</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <MessageSquare className="h-6 w-6 text-csp-blue" />
              <span>Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">AEPS Transaction Successful</p>
                <p className="text-sm text-gray-500">₹5,000 withdrawn for customer #4582</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>10:24 AM</p>
                <p>Today</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">KYC Documents Uploaded</p>
                <p className="text-sm text-gray-500">New account application for Rahul Kumar</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>09:15 AM</p>
                <p>Today</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Daily Report Generated</p>
                <p className="text-sm text-gray-500">System generated daily transaction report</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>08:00 AM</p>
                <p>Today</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSPAgentDashboard;

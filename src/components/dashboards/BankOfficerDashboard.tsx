
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertTriangle,
  BarChart3,
  Download,
  FileSearch,
  CheckCircle,
  XCircle,
  Users,
  FileText,
  Eye
} from 'lucide-react';

const BankOfficerDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total CSPs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,245</div>
              <Badge className="bg-blue-100 text-blue-800">South Region</Badge>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span className="font-medium text-green-600">+14</span> new this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Flagged CSPs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">42</div>
              <Badge variant="destructive">Needs Review</Badge>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span className="font-medium text-amber-600">+7</span> since yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">18</div>
              <Badge className="bg-amber-100 text-amber-800">Urgent</Badge>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span className="font-medium text-red-600">4</span> critical cases
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fraud Alert */}
      <Alert className="border-red-500 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <AlertTitle className="text-red-800">High Risk Alert</AlertTitle>
        <AlertDescription className="text-red-700">
          Unusual transaction patterns detected in 3 CSPs in your region. Please review the fraud dashboard.
        </AlertDescription>
        <Button variant="outline" className="mt-2 border-red-500 text-red-600 hover:bg-red-100 hover:text-red-700">
          Review Now
        </Button>
      </Alert>

      {/* Fraud Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Fraud Statistics</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-[3/2] w-full overflow-hidden rounded-md bg-gray-100">
            <div className="flex h-full w-full items-center justify-center">
              <BarChart3 className="h-12 w-12 text-csp-steel opacity-50" />
              <span className="ml-2 text-lg text-gray-400">Fraud Analytics Chart</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">25%</span> decrease in fraud attempts
          </div>
          <Button variant="ghost" size="sm">Download Report</Button>
        </CardFooter>
      </Card>

      {/* Pending CSP Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Pending CSP Reviews</CardTitle>
          <CardDescription>Cases requiring officer decision</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">CSP #384 - Vikram Singh</p>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                <p className="text-sm text-gray-500">Multiple KYC discrepancies detected</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7">
                    <Eye className="mr-1 h-3 w-3" />
                    <span>View Details</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 border-red-500 text-red-600 hover:bg-red-50">
                    <XCircle className="mr-1 h-3 w-3" />
                    <span>Suspend</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 border-amber-500 text-amber-600 hover:bg-amber-50">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    <span>Warning</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">CSP #156 - Meera Joshi</p>
                  <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                </div>
                <p className="text-sm text-gray-500">Facial verification failed twice</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7">
                    <Eye className="mr-1 h-3 w-3" />
                    <span>View Details</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 border-red-500 text-red-600 hover:bg-red-50">
                    <XCircle className="mr-1 h-3 w-3" />
                    <span>Suspend</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 border-amber-500 text-amber-600 hover:bg-amber-50">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    <span>Warning</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">CSP #728 - Rahul Verma</p>
                  <Badge className="bg-amber-100 text-amber-800">Medium</Badge>
                </div>
                <p className="text-sm text-gray-500">Customer complaints about extra fees</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-7">
                    <Eye className="mr-1 h-3 w-3" />
                    <span>View Details</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 border-red-500 text-red-600 hover:bg-red-50">
                    <XCircle className="mr-1 h-3 w-3" />
                    <span>Suspend</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 border-amber-500 text-amber-600 hover:bg-amber-50">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    <span>Warning</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Pending Reviews</Button>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <Users className="h-6 w-6 text-csp-blue" />
              <span>CSP Registry</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <FileSearch className="h-6 w-6 text-csp-blue" />
              <span>View Documents</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <Download className="h-6 w-6 text-csp-blue" />
              <span>Download Reports</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <FileText className="h-6 w-6 text-csp-blue" />
              <span>Military Coord</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankOfficerDashboard;

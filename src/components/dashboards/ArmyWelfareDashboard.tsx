
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
  Download,
  Users,
  CreditCard,
  FileText,
  Folder
} from 'lucide-react';

const ArmyWelfareDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      <Alert className="border-csp-blue bg-blue-50">
        <CheckCircle className="h-4 w-4 text-csp-blue" />
        <AlertTitle className="text-blue-800">Army Welfare Mode Active</AlertTitle>
        <AlertDescription className="text-blue-700">
          All army families have priority service and zero fees at CSP locations.
        </AlertDescription>
      </Alert>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Registered Families</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <div className="mt-2 text-xs text-gray-500">
              <span className="font-medium text-green-600">+28</span> new this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <div className="mt-2 text-xs text-gray-500">
              <span className="font-medium text-amber-600">12</span> high priority
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Special Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12.8L</div>
            <div className="mt-2 text-xs text-gray-500">
              This month's approved disbursements
            </div>
          </CardContent>
        </Card>
      </div>

      {/* War Mode Notice */}
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>War Mode is Active in 3 Districts</AlertTitle>
        <AlertDescription>
          Special relief procedures are in effect. CSP agents have been notified of zero-fee policy for army families.
        </AlertDescription>
        <Button variant="outline" className="mt-2 border-white bg-destructive text-white hover:bg-destructive/90 hover:text-white">
          View War Mode Protocol
        </Button>
      </Alert>

      {/* Family Support Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Priority Cases</CardTitle>
          <CardDescription>Families needing immediate assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Subedar Rajesh Kumar's Family</p>
                  <Badge variant="destructive">Critical</Badge>
                </div>
                <p className="text-sm text-gray-500">Emergency funds needed for medical treatment</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button size="sm" className="h-7 bg-csp-blue hover:bg-csp-steel">Process Payout</Button>
                  <Button size="sm" variant="outline" className="h-7">View Details</Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Major Vikram Singh's Family</p>
                  <Badge className="bg-amber-100 text-amber-800">Urgent</Badge>
                </div>
                <p className="text-sm text-gray-500">Relocation assistance needed</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button size="sm" className="h-7 bg-csp-blue hover:bg-csp-steel">Process Payout</Button>
                  <Button size="sm" variant="outline" className="h-7">View Details</Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Sepoy Rahul Sharma's Family</p>
                  <Badge className="bg-amber-100 text-amber-800">Urgent</Badge>
                </div>
                <p className="text-sm text-gray-500">Educational scholarship application</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button size="sm" className="h-7 bg-csp-blue hover:bg-csp-steel">Process Payout</Button>
                  <Button size="sm" variant="outline" className="h-7">View Details</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Priority Cases</Button>
        </CardFooter>
      </Card>

      {/* Payout Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Distribution</CardTitle>
          <CardDescription>By category this month</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Medical Assistance</span>
                <span className="font-medium">₹5.2L (41%)</span>
              </div>
              <Progress value={41} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Housing & Relocation</span>
                <span className="font-medium">₹3.8L (30%)</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Education</span>
                <span className="font-medium">₹2.4L (19%)</span>
              </div>
              <Progress value={19} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Daily Subsistence</span>
                <span className="font-medium">₹1.4L (10%)</span>
              </div>
              <Progress value={10} className="h-2" />
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
              <Users className="h-6 w-6 text-csp-blue" />
              <span>Register Family</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <CreditCard className="h-6 w-6 text-csp-blue" />
              <span>Approve Payout</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <FileText className="h-6 w-6 text-csp-blue" />
              <span>Generate Report</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <Folder className="h-6 w-6 text-csp-blue" />
              <span>Document Vault</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CSP Network Status */}
      <Card>
        <CardHeader>
          <CardTitle>CSP Network Status</CardTitle>
          <CardDescription>Available for army family services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">North District</p>
                  <p className="text-xs text-gray-500">245 active CSPs</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">All Operational</Badge>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">East District</p>
                  <p className="text-xs text-gray-500">187 active CSPs</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">All Operational</Badge>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">South District</p>
                  <p className="text-xs text-gray-500">92 of 156 CSPs active</p>
                </div>
              </div>
              <Badge variant="destructive">Limited Service</Badge>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">West District</p>
                  <p className="text-xs text-gray-500">134 of 145 CSPs active</p>
                </div>
              </div>
              <Badge className="bg-amber-100 text-amber-800">Partial Service</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArmyWelfareDashboard;

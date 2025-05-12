
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Users,
  FileText,
  Settings,
  Bell
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      <Alert className="border-csp-warning bg-amber-50">
        <AlertCircle className="h-4 w-4 text-csp-warning" />
        <AlertTitle className="text-csp-warning">System Notice</AlertTitle>
        <AlertDescription>
          New fraud detection rules have been deployed. Please review the updated guidelines.
        </AlertDescription>
      </Alert>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active CSPs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4,832</div>
              <Badge className="bg-green-100 text-green-800">+24</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">312</div>
              <Badge className="bg-amber-100 text-amber-800">High</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Fraud Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">68</div>
              <Badge className="bg-red-100 text-red-800">Critical</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">98%</div>
              <Badge className="bg-green-100 text-green-800">Good</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Real-time Fraud Map */}
        <Card className="col-span-2 md:col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Real-time Fraud Map</CardTitle>
              <Badge variant="outline">Live</Badge>
            </div>
            <CardDescription>Detected suspicious activities in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
              <div className="flex h-full w-full items-center justify-center">
                <MapPin className="h-12 w-12 text-csp-steel opacity-50" />
                <span className="ml-2 text-lg text-gray-400">Interactive Map View</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">24</span> high-risk alerts detected
            </div>
            <Button variant="ghost" size="sm">View Details</Button>
          </CardFooter>
        </Card>

        {/* CSP Status */}
        <Card>
          <CardHeader>
            <CardTitle>CSP Agent Status</CardTitle>
            <CardDescription>Current agent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Active</span>
                  <span className="font-medium">3,450</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Idle</span>
                  <span className="font-medium">1,024</span>
                </div>
                <Progress value={21} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Suspended</span>
                  <span className="font-medium">358</span>
                </div>
                <Progress value={7} className="h-2 bg-red-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Audit Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Audit Alerts</CardTitle>
            <CardDescription>Requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Face Verification Failed</p>
                  <p className="text-sm text-gray-500">CSP #245 in North District</p>
                  <p className="text-xs text-gray-400">20 min ago</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">GPS Location Mismatch</p>
                  <p className="text-sm text-gray-500">CSP #108 in East District</p>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Overdue Monthly Check-In</p>
                  <p className="text-sm text-gray-500">12 CSPs in South District</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              View All Alerts
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Access */}
        <Card className="col-span-2 md:col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
                <Users className="h-6 w-6 text-csp-blue" />
                <span>CSP Management</span>
              </Button>
              
              <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
                <FileText className="h-6 w-6 text-csp-blue" />
                <span>Audit Assignment</span>
              </Button>
              
              <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
                <AlertTriangle className="h-6 w-6 text-csp-blue" />
                <span>Fraud Engine</span>
              </Button>
              
              <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
                <Bell className="h-6 w-6 text-csp-blue" />
                <span>Notification Hub</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

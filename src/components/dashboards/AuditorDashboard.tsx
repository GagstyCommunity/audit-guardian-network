
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle,
  MapPin,
  Clock,
  AlertCircle,
  FileText,
  Camera,
  Users,
  ArrowRight
} from 'lucide-react';

const AuditorDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  return (
    <div className="space-y-6">
      {/* Tasks Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">5</div>
            <p className="text-xs text-gray-500">Urgent audits needed</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Medium Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">12</div>
            <p className="text-xs text-gray-500">Within 48 hours</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Standard Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">28</div>
            <p className="text-xs text-gray-500">Regular scheduled audits</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">7</div>
            <p className="text-xs text-gray-500">Out of 10 assigned</p>
          </CardContent>
        </Card>
      </div>

      {/* Red Zone Alert */}
      <Alert className="border-red-500 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-500" />
        <AlertTitle className="text-red-800">Red Zone Alert</AlertTitle>
        <AlertDescription className="text-red-700">
          2 audit locations are in designated red zones. Use the Red Zone Protocol for these visits.
        </AlertDescription>
        <Button variant="outline" className="mt-2 border-red-500 text-red-600 hover:bg-red-100 hover:text-red-700">
          View Red Zone Protocols
        </Button>
      </Alert>

      {/* Today's Route */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Audit Route</CardTitle>
          <CardDescription>Optimized for distance and priority</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
            <div className="flex h-full w-full items-center justify-center">
              <MapPin className="h-12 w-12 text-csp-steel opacity-50" />
              <span className="ml-2 text-lg text-gray-400">Route Map View</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">10</span> locations, estimated <span className="font-medium">6</span> hours
          </div>
          <Button variant="ghost" size="sm">Get Directions</Button>
        </CardFooter>
      </Card>

      {/* Next Up Audits */}
      <Card>
        <CardHeader>
          <CardTitle>Next Up</CardTitle>
          <CardDescription>Priority audits requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">CSP #245 - Aarav Sharma</p>
                  <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                </div>
                <p className="text-sm text-gray-500">North District, Village: Chandpur</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>15 min drive</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>4.5 km away</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3 w-3" />
                    <span>Face verification failed</span>
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
                  <p className="font-medium">CSP #108 - Priya Patel</p>
                  <Badge className="bg-amber-100 text-amber-800">Medium Priority</Badge>
                </div>
                <p className="text-sm text-gray-500">East District, Village: Raipur</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>25 min drive</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>12 km away</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Clock className="h-3 w-3" />
                    <span>Suspicious transaction pattern</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">CSP #376 - Rajiv Kumar</p>
                  <Badge className="bg-amber-100 text-amber-800">Medium Priority</Badge>
                </div>
                <p className="text-sm text-gray-500">South District, Village: Manoharpur</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>40 min drive</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span>18 km away</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Users className="h-3 w-3" />
                    <span>Customer complaints</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Start Audit Process
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
              <FileText className="h-6 w-6 text-csp-blue" />
              <span>New Audit Form</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <Camera className="h-6 w-6 text-csp-blue" />
              <span>Face Verify</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6 text-csp-blue" />
              <span>Submit Report</span>
            </Button>
            
            <Button variant="outline" className="flex h-24 flex-col items-center justify-center gap-2">
              <MapPin className="h-6 w-6 text-csp-blue" />
              <span>Past Locations</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditorDashboard;

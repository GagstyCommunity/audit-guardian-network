
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, Bell, MapPin, Search, Shield, Smartphone, User, UserCheck, Wifi } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const WarModeTools: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-csp-navy">War Mode Tools</h1>
          <p className="text-gray-500 mt-1">Special tools and functions for emergency situations</p>
        </div>
        <Badge variant="destructive" className="text-base px-3 py-1">WAR MODE: INACTIVE</Badge>
      </div>
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>War Mode Access Restricted</AlertTitle>
        <AlertDescription>
          War Mode features are currently in standby. These tools will only become fully operational when activated by regulatory authorities during emergency situations.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>War Mode Status</CardTitle>
            <CardDescription>Current status and readiness of emergency systems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>System Readiness</span>
                  <span>88%</span>
                </div>
                <Progress value={88} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-md">
                  <div className="flex items-center">
                    <Wifi className="mr-2 h-4 w-4 text-green-600" />
                    <span className="font-medium">Offline Mode</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Ready</div>
                </div>
                
                <div className="p-3 border rounded-md">
                  <div className="flex items-center">
                    <Bell className="mr-2 h-4 w-4 text-green-600" />
                    <span className="font-medium">Alert System</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Connected</div>
                </div>
                
                <div className="p-3 border rounded-md">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-green-600" />
                    <span className="font-medium">Priority Access</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Enabled</div>
                </div>
                
                <div className="p-3 border rounded-md">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-amber-500" />
                    <span className="font-medium">Geofencing</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Needs Setup</div>
                </div>
              </div>
              
              <Alert>
                <Check className="h-4 w-4" />
                <AlertTitle>Last System Check: 14 May 2025</AlertTitle>
                <AlertDescription>
                  War Mode systems are tested monthly to ensure readiness.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Emergency Settings</CardTitle>
            <CardDescription>Configure your emergency operation settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="space-y-0.5">
                  <div className="font-medium">Offline Transaction Mode</div>
                  <div className="text-sm text-gray-500">
                    Process transactions without internet connection
                  </div>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="space-y-0.5">
                  <div className="font-medium">Priority Services</div>
                  <div className="text-sm text-gray-500">
                    Enable special services for military/emergency personnel
                  </div>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="space-y-0.5">
                  <div className="font-medium">Emergency Notifications</div>
                  <div className="text-sm text-gray-500">
                    Receive critical alerts even with low connectivity
                  </div>
                </div>
                <Switch disabled />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="space-y-0.5">
                  <div className="font-medium">Data Backup Mode</div>
                  <div className="text-sm text-gray-500">
                    Automatic local backups of transaction data
                  </div>
                </div>
                <Switch disabled />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Army Personnel Services</CardTitle>
            <CardDescription>Special services for military personnel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <UserCheck className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="font-medium">Military ID Verification</span>
                </div>
                <Button variant="outline" disabled>Verify</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Search className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="font-medium">Check Benefits Eligibility</span>
                </div>
                <Button variant="outline" disabled>Check</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="font-medium">Family Member Services</span>
                </div>
                <Button variant="outline" disabled>Manage</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-gray-500 border-t pt-4">
            Available during emergency activation only
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Emergency Connectivity</CardTitle>
            <CardDescription>Alternate communication methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Smartphone className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="font-medium">SMS Banking</span>
                </div>
                <Button variant="outline" disabled>Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wifi className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="font-medium">Satellite Connection</span>
                </div>
                <Button variant="outline" disabled>Test</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-blue-600" />
                  <span className="font-medium">Secure Channel</span>
                </div>
                <Button variant="outline" disabled>Access</Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-gray-500 border-t pt-4">
            Available during emergency activation only
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Training Resources</CardTitle>
            <CardDescription>Emergency procedure guides</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Emergency Protocols Guide</div>
                <div className="text-sm text-gray-500 mt-1">
                  Standard operating procedures during emergencies
                </div>
              </div>
              
              <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Offline Transaction Training</div>
                <div className="text-sm text-gray-500 mt-1">
                  How to conduct and log transactions without connectivity
                </div>
              </div>
              
              <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <div className="font-medium">Priority Services Training</div>
                <div className="text-sm text-gray-500 mt-1">
                  Processing special transactions for military personnel
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" className="w-full">
              View All Training Resources
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <div className="max-w-2xl w-full p-6 border rounded-lg text-center">
          <AlertCircle className="h-10 w-10 text-amber-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">War Mode Activation Process</h3>
          <p className="text-gray-500 mb-4">
            War Mode features will be automatically activated in the event of a declared emergency by regulatory authorities.
            You will receive a secure notification with activation instructions if this occurs.
          </p>
          <div className="flex justify-center">
            <Button disabled>
              Prepare for Activation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarModeTools;

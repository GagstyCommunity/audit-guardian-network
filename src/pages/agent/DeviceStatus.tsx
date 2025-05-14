
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Cog, RefreshCw, Shield, Smartphone } from 'lucide-react';

const DeviceStatus: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-csp-navy">Device Status</h1>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Status
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Device</CardTitle>
            <CardDescription>Status of the device you are currently using</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <div className="rounded-md bg-gray-100 p-2">
                <Smartphone className="h-8 w-8 text-gray-500" />
              </div>
              <div className="space-y-1">
                <div className="font-medium">Samsung Galaxy S22</div>
                <div className="text-sm text-gray-500">Android 14 • Last sync: 5 minutes ago</div>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="bg-green-50 text-green-700">Authorized</Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Primary Device</Badge>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Device ID: 8f721c63-2e99-4c34-a712-7385021a85e9
                </div>
              </div>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Biometric Authentication</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>GPS Location</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-green-600" />
                    <span>Device Security</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Secure</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Cog className="mr-2 h-4 w-4 text-green-600" />
                    <span>App Version</span>
                  </div>
                  <Badge variant="outline">v2.1.3</Badge>
                </div>
              </div>
              
              <Button className="w-full mt-4" variant="outline">
                Check for Updates
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Device Security</CardTitle>
            <CardDescription>Security status and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Device Secure</AlertTitle>
              <AlertDescription>
                Your device meets all security requirements for transaction processing.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <div className="font-medium mb-1">Biometric Reader Status</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Connected and functioning properly</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">OK</Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="font-medium mb-1">Camera Status</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Available for customer verification</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">OK</Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <div className="font-medium mb-1">Internet Connectivity</div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Strong connection (10 Mbps)</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Good</Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-md bg-amber-50">
                <div className="font-medium mb-1 flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                  Software Update Available
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">New security patch available</span>
                  <Button size="sm" variant="outline">Update Now</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Linked Devices</CardTitle>
          <CardDescription>Manage all devices linked to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="rounded-md bg-gray-100 p-2">
                  <Smartphone className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium">Samsung Galaxy S22</div>
                  <div className="text-sm text-gray-500">Last active: Just now</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 mr-2">Current Device</Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700">Primary</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline" disabled>Remove</Button>
            </div>
            
            <div className="p-4 border rounded-md flex items-center justify-between">
              <div className="flex items-start space-x-4">
                <div className="rounded-md bg-gray-100 p-2">
                  <Smartphone className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium">Samsung Galaxy Tab A8</div>
                  <div className="text-sm text-gray-500">Last active: 3 days ago</div>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="bg-green-50 text-green-700">Authorized</Badge>
                  </div>
                </div>
              </div>
              <Button variant="outline">Remove</Button>
            </div>
          </div>
          
          <Button className="mt-4" variant="outline">
            Add New Device
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceStatus;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Shield, Download, CheckCircle, MapPin, Calendar } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const ArmyFamilyPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-csp-navy">Army Family Panel</h1>
          <p className="text-gray-500 mt-1">Special services for army personnel and their families</p>
        </div>
        <div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Register New Family
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Army Families</CardTitle>
              <CardDescription>
                Manage special banking services for military personnel and their families
              </CardDescription>
            </div>
            <Badge className="bg-green-50 text-green-700">
              <Shield className="mr-1 h-4 w-4" />
              Army Service Provider
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center w-full max-w-sm">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID or regiment..."
                className="max-w-sm"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                Filter
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service ID</TableHead>
                <TableHead>Military Person</TableHead>
                <TableHead>Regiment/Unit</TableHead>
                <TableHead>Family Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">AF-10045</TableCell>
                <TableCell>
                  <div>
                    <div>Major Rajiv Singh</div>
                    <div className="text-sm text-gray-500">ID: IND4532167</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Badge variant="outline">7th Infantry</Badge>
                  </div>
                </TableCell>
                <TableCell>3 registered</TableCell>
                <TableCell>
                  <Badge className="bg-green-50 text-green-700">Active</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm">Services</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">AF-10044</TableCell>
                <TableCell>
                  <div>
                    <div>Captain Mihir Sharma</div>
                    <div className="text-sm text-gray-500">ID: IND4532123</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Badge variant="outline">15th Artillery</Badge>
                  </div>
                </TableCell>
                <TableCell>2 registered</TableCell>
                <TableCell>
                  <Badge className="bg-green-50 text-green-700">Active</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm">Services</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">AF-10039</TableCell>
                <TableCell>
                  <div>
                    <div>Subedar Jaswinder Singh</div>
                    <div className="text-sm text-gray-500">ID: IND4531099</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Badge variant="outline">4th Armored</Badge>
                  </div>
                </TableCell>
                <TableCell>5 registered</TableCell>
                <TableCell>
                  <Badge className="bg-green-50 text-green-700">Active</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm">Services</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">AF-10032</TableCell>
                <TableCell>
                  <div>
                    <div>Lt. Col. Srinivas Rao</div>
                    <div className="text-sm text-gray-500">ID: IND4530875</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Badge variant="outline">11th Engineers</Badge>
                  </div>
                </TableCell>
                <TableCell>4 registered</TableCell>
                <TableCell>
                  <Badge variant="outline">On Deployment</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm">Services</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">AF-10021</TableCell>
                <TableCell>
                  <div>
                    <div>Havildar Deepak Kumar</div>
                    <div className="text-sm text-gray-500">ID: IND4529988</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Badge variant="outline">9th Infantry</Badge>
                  </div>
                </TableCell>
                <TableCell>3 registered</TableCell>
                <TableCell>
                  <Badge className="bg-amber-50 text-amber-700">Family Only Access</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm">Services</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Priority Services</CardTitle>
            <CardDescription>Special banking services for army families</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg flex justify-between items-center">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Zero-Fee Banking</div>
                    <div className="text-sm text-gray-500">
                      No transaction fees for army personnel and families
                    </div>
                  </div>
                </div>
                <Button size="sm">Apply</Button>
              </div>
              
              <div className="p-4 border rounded-lg flex justify-between items-center">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Army Pension Processing</div>
                    <div className="text-sm text-gray-500">
                      Faster pension processing for retired personnel
                    </div>
                  </div>
                </div>
                <Button size="sm">Apply</Button>
              </div>
              
              <div className="p-4 border rounded-lg flex justify-between items-center">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Family Account Access</div>
                    <div className="text-sm text-gray-500">
                      Designated family members can access accounts during deployment
                    </div>
                  </div>
                </div>
                <Button size="sm">Apply</Button>
              </div>
              
              <div className="p-4 border rounded-lg flex justify-between items-center">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Emergency Funds Transfer</div>
                    <div className="text-sm text-gray-500">
                      Expedited funds transfer during emergencies
                    </div>
                  </div>
                </div>
                <Button size="sm">Apply</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Army Events</CardTitle>
            <CardDescription>Special banking services for upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                    <span className="font-medium">Special Pension Camp</span>
                  </div>
                  <Badge variant="outline">25 May 2025</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <MapPin className="mr-1 h-4 w-4" />
                  Community Hall, 5th Sector, Gurugram
                </div>
                <p className="text-sm mt-2">
                  Special pension processing and documentation assistance for veterans and their families.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Register for Camp
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                    <span className="font-medium">Family Financial Workshop</span>
                  </div>
                  <Badge variant="outline">2 June 2025</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <MapPin className="mr-1 h-4 w-4" />
                  Army Welfare Center, Sector 12, Delhi
                </div>
                <p className="text-sm mt-2">
                  Financial planning workshop for army families with special focus on deployment planning.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Register for Workshop
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                    <span className="font-medium">Veterans Benefits Camp</span>
                  </div>
                  <Badge variant="outline">15 June 2025</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <MapPin className="mr-1 h-4 w-4" />
                  District Community Center, Chandigarh
                </div>
                <p className="text-sm mt-2">
                  One-stop assistance for all veterans benefits, including banking services.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Register for Camp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArmyFamilyPanel;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, MessageSquare, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CustomerComplaintsReview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-csp-navy">Customer Complaints</h1>
          <p className="text-gray-500 mt-1">Review and resolve customer complaints against CSP agents</p>
        </div>
        <Badge className="text-base px-3 py-1" variant="destructive">12 Unresolved Complaints</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Complaints Management</CardTitle>
          <CardDescription>
            Review and respond to customer complaints about CSP services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center w-full md:w-auto">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by complaint ID, customer or CSP..."
                className="max-w-sm"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="overcharge">Overcharge</SelectItem>
                  <SelectItem value="transaction-failed">Transaction Failed</SelectItem>
                  <SelectItem value="refusal">Service Refusal</SelectItem>
                  <SelectItem value="behavior">Poor Behavior</SelectItem>
                  <SelectItem value="fraud">Suspected Fraud</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>CSP Agent</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Filed On</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">CMPT-123456</TableCell>
                <TableCell>Ramesh Kumar</TableCell>
                <TableCell>
                  <div>
                    <div>Rajesh Singh</div>
                    <div className="text-xs text-gray-500">CSP12345</div>
                  </div>
                </TableCell>
                <TableCell>Overcharge</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <AlertTriangle className="mr-1 h-4 w-4 text-destructive" />
                    <Badge variant="outline" className="bg-red-50 text-red-700">Open</Badge>
                  </div>
                </TableCell>
                <TableCell>14 May 2025</TableCell>
                <TableCell className="text-right">
                  <Button size="sm">Review</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CMPT-123455</TableCell>
                <TableCell>Anita Sharma</TableCell>
                <TableCell>
                  <div>
                    <div>Dinesh Kumar</div>
                    <div className="text-xs text-gray-500">CSP12339</div>
                  </div>
                </TableCell>
                <TableCell>Transaction Failed</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <AlertTriangle className="mr-1 h-4 w-4 text-destructive" />
                    <Badge variant="outline" className="bg-red-50 text-red-700">Open</Badge>
                  </div>
                </TableCell>
                <TableCell>13 May 2025</TableCell>
                <TableCell className="text-right">
                  <Button size="sm">Review</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CMPT-123452</TableCell>
                <TableCell>Pradeep Verma</TableCell>
                <TableCell>
                  <div>
                    <div>Sangeeta Devi</div>
                    <div className="text-xs text-gray-500">CSP12301</div>
                  </div>
                </TableCell>
                <TableCell>Service Refusal</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-amber-500" />
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">In Progress</Badge>
                  </div>
                </TableCell>
                <TableCell>12 May 2025</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Continue</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CMPT-123449</TableCell>
                <TableCell>Neha Gupta</TableCell>
                <TableCell>
                  <div>
                    <div>Rajesh Singh</div>
                    <div className="text-xs text-gray-500">CSP12345</div>
                  </div>
                </TableCell>
                <TableCell>Suspected Fraud</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-amber-500" />
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">In Progress</Badge>
                  </div>
                </TableCell>
                <TableCell>10 May 2025</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">Continue</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CMPT-123442</TableCell>
                <TableCell>Suresh Patel</TableCell>
                <TableCell>
                  <div>
                    <div>Alok Mishra</div>
                    <div className="text-xs text-gray-500">CSP12290</div>
                  </div>
                </TableCell>
                <TableCell>Poor Behavior</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
                    <Badge variant="outline" className="bg-green-50 text-green-700">Resolved</Badge>
                  </div>
                </TableCell>
                <TableCell>8 May 2025</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">View</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CMPT-123436</TableCell>
                <TableCell>Manish Jain</TableCell>
                <TableCell>
                  <div>
                    <div>Deepak Verma</div>
                    <div className="text-xs text-gray-500">CSP12256</div>
                  </div>
                </TableCell>
                <TableCell>Overcharge</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <XCircle className="mr-1 h-4 w-4 text-gray-400" />
                    <Badge variant="outline">Closed</Badge>
                  </div>
                </TableCell>
                <TableCell>5 May 2025</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">View</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
              Open Complaints
            </CardTitle>
            <CardDescription>
              Complaints awaiting initial review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-gray-500">3 high priority</p>
            <Button className="mt-4 w-full">Review Open Complaints</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-amber-500" />
              In Progress
            </CardTitle>
            <CardDescription>
              Complaints under investigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-sm text-gray-500">2 awaiting CSP response</p>
            <Button className="mt-4 w-full" variant="outline">View In Progress</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
              Resolution Rate
            </CardTitle>
            <CardDescription>
              Complaint resolution statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <p className="text-sm text-gray-500">37 resolved this month</p>
            <Button className="mt-4 w-full" variant="outline">View Statistics</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerComplaintsReview;

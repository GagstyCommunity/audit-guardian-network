
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MessageSquare, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const DisputeCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-csp-navy">Dispute Center</h1>
        <Badge className="text-base px-3 py-1">2 Open Disputes</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Dispute Management</CardTitle>
          <CardDescription>View and respond to customer complaints and disputes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center w-full max-w-sm">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, customer name, or description..."
                className="max-w-sm"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispute ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">DSP-5678</TableCell>
                <TableCell>Rahul Singh</TableCell>
                <TableCell>14 May 2025</TableCell>
                <TableCell>Transaction Failed</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <AlertTriangle className="mr-1 h-4 w-4 text-destructive" />
                    <Badge variant="outline" className="bg-red-50 text-red-700">Open</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm">Respond</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">DSP-5677</TableCell>
                <TableCell>Priya Verma</TableCell>
                <TableCell>13 May 2025</TableCell>
                <TableCell>Incorrect Amount</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <AlertTriangle className="mr-1 h-4 w-4 text-destructive" />
                    <Badge variant="outline" className="bg-red-50 text-red-700">Open</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm">Respond</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">DSP-5675</TableCell>
                <TableCell>Amit Kumar</TableCell>
                <TableCell>10 May 2025</TableCell>
                <TableCell>Fee Dispute</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-amber-500" />
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">In Progress</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">DSP-5670</TableCell>
                <TableCell>Meena Sharma</TableCell>
                <TableCell>8 May 2025</TableCell>
                <TableCell>Service Issue</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
                    <Badge variant="outline" className="bg-green-50 text-green-700">Resolved</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">DSP-5665</TableCell>
                <TableCell>Suresh Patel</TableCell>
                <TableCell>5 May 2025</TableCell>
                <TableCell>Receipt Missing</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <XCircle className="mr-1 h-4 w-4 text-gray-400" />
                    <Badge variant="outline">Closed</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisputeCenter;

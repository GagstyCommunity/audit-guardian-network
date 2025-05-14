
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { 
  AlertTriangle, 
  Search, 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle,
  Filter,
  MessageSquare,
  User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

// Mock fraud alerts data
const mockAlerts = [
  {
    id: 'FA-123456',
    type: 'Location Mismatch',
    detectedAt: new Date(2025, 4, 14, 9, 23),
    description: 'Transaction initiated from a location 5.2 km away from your registered CSP address.',
    risk: 'high',
    status: 'open',
    transaction: {
      id: 'TX-987654',
      customer: 'Amit Singh',
      amount: 5000,
      type: 'Cash Withdrawal'
    }
  },
  {
    id: 'FA-123457',
    type: 'Multiple Failed Auth',
    detectedAt: new Date(2025, 4, 14, 8, 15),
    description: 'Multiple failed authentication attempts detected from your account.',
    risk: 'medium',
    status: 'in-progress',
    transaction: {
      id: 'TX-987655',
      customer: 'N/A',
      amount: 0,
      type: 'Login Attempt'
    }
  },
  {
    id: 'FA-123458',
    type: 'High-value Transaction',
    detectedAt: new Date(2025, 4, 13, 16, 45),
    description: 'Transaction amount (₹15,000) exceeds your usual transaction range.',
    risk: 'low',
    status: 'resolved',
    transaction: {
      id: 'TX-987656',
      customer: 'Priya Sharma',
      amount: 15000,
      type: 'Money Transfer'
    }
  },
  {
    id: 'FA-123459',
    type: 'Unusual Transaction Pattern',
    detectedAt: new Date(2025, 4, 13, 14, 12),
    description: 'Multiple high-value transactions conducted in a short time period.',
    risk: 'medium',
    status: 'resolved',
    transaction: {
      id: 'TX-987657',
      customer: 'Multiple',
      amount: 32000,
      type: 'Various'
    }
  },
  {
    id: 'FA-123460',
    type: 'Device Change',
    detectedAt: new Date(2025, 4, 12, 11, 34),
    description: 'Login detected from a new device that is not in your registered devices list.',
    risk: 'medium',
    status: 'resolved',
    transaction: {
      id: 'N/A',
      customer: 'N/A',
      amount: 0,
      type: 'System'
    }
  }
];

const FraudAlerts: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  
  // Filter alerts based on search term and status filter
  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = 
      alert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const openAlertCount = mockAlerts.filter(alert => alert.status === 'open').length;
  
  const handleAlertClick = (alert: any) => {
    setSelectedAlert(alert);
    setAlertDialogOpen(true);
  };
  
  const handleResponseOpen = () => {
    setAlertDialogOpen(false);
    setResponseDialogOpen(true);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEvidenceFile(e.target.files[0]);
    }
  };
  
  const handleSubmitResponse = () => {
    // In a real implementation, this would submit the agent's response to the server
    toast({
      title: "Response Submitted",
      description: "Your response to the fraud alert has been submitted successfully.",
    });
    
    // Update the status of the alert in our mock data (in a real app, this would be done on the server)
    const updatedAlerts = mockAlerts.map(alert => {
      if (alert.id === selectedAlert.id) {
        return { ...alert, status: 'in-progress' };
      }
      return alert;
    });
    
    // Close the dialog and reset form state
    setResponseDialogOpen(false);
    setResponseMessage('');
    setEvidenceFile(null);
  };
  
  // Helper function for risk badge styling
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Low Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Helper function for status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <div className="flex items-center">
            <AlertTriangle className="mr-1 h-4 w-4 text-destructive" />
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Open</Badge>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-amber-500" />
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">In Progress</Badge>
          </div>
        );
      case 'resolved':
        return (
          <div className="flex items-center">
            <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>
          </div>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-csp-navy">Fraud Alerts</h1>
          <p className="text-gray-500 mt-1">Manage system-detected security alerts and respond to them</p>
        </div>
        <Badge variant={openAlertCount > 0 ? "destructive" : "outline"} className="text-base px-3 py-1">
          {openAlertCount} Open Alerts
        </Badge>
      </div>
      
      {openAlertCount > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Action Required</AlertTitle>
          <AlertDescription>
            You have {openAlertCount} open fraud alerts that require your immediate attention. 
            Please respond to these alerts to avoid account restrictions.
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Fraud Alert List</CardTitle>
          <CardDescription>
            View and respond to security alerts detected by the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center w-full md:w-auto">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className={statusFilter === 'all' ? 'bg-gray-100' : ''}
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button 
                variant="outline" 
                className={statusFilter === 'open' ? 'bg-red-50' : ''}
                onClick={() => setStatusFilter('open')}
              >
                <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                Open
              </Button>
              <Button 
                variant="outline" 
                className={statusFilter === 'in-progress' ? 'bg-amber-50' : ''}
                onClick={() => setStatusFilter('in-progress')}
              >
                <Clock className="mr-2 h-4 w-4 text-amber-500" />
                In Progress
              </Button>
              <Button 
                variant="outline" 
                className={statusFilter === 'resolved' ? 'bg-green-50' : ''}
                onClick={() => setStatusFilter('resolved')}
              >
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                Resolved
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Detected</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No alerts found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredAlerts.map((alert) => (
                  <TableRow key={alert.id} onClick={() => handleAlertClick(alert)} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium">{alert.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <AlertTriangle className="mr-2 h-4 w-4 text-gray-400" />
                        {alert.type}
                      </div>
                    </TableCell>
                    <TableCell>{format(alert.detectedAt, 'dd MMM yy, HH:mm')}</TableCell>
                    <TableCell>{getRiskBadge(alert.risk)}</TableCell>
                    <TableCell>{getStatusBadge(alert.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAlertClick(alert);
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Alert Details Dialog */}
      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
              Fraud Alert Details
            </DialogTitle>
            <DialogDescription>
              Review the alert details and provide your response
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlert && (
            <div className="space-y-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Alert ID</p>
                  <p className="font-medium">{selectedAlert.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div>{getStatusBadge(selectedAlert.status)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Alert Type</p>
                  <p className="font-medium">{selectedAlert.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Risk Level</p>
                  <div>{getRiskBadge(selectedAlert.risk)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Detected At</p>
                  <p className="font-medium">{format(selectedAlert.detectedAt, 'PPp')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium">{selectedAlert.transaction.id}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  {selectedAlert.description}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedAlert.transaction.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">
                    {selectedAlert.transaction.amount > 0 ? `₹${selectedAlert.transaction.amount.toLocaleString()}` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction Type</p>
                  <p className="font-medium">{selectedAlert.transaction.type}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAlertDialogOpen(false)}>
              Close
            </Button>
            {selectedAlert?.status === 'open' && (
              <Button onClick={handleResponseOpen}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Respond to Alert
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Response Dialog */}
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respond to Fraud Alert</DialogTitle>
            <DialogDescription>
              Provide your explanation and any supporting evidence for this alert
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlert && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium text-sm">Alert: {selectedAlert.id}</p>
                <p className="text-sm text-gray-500">{selectedAlert.description}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="response">Your Explanation</Label>
                <Textarea
                  id="response"
                  placeholder="Provide details about this alert (e.g., legitimate transaction, known issue, etc.)"
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Upload Evidence (Optional)</Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">Receipt, screenshot or photo (MAX. 5MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
                {evidenceFile && (
                  <p className="text-sm text-gray-500 mt-2">
                    File selected: {evidenceFile.name}
                  </p>
                )}
              </div>
              
              <Alert>
                <User className="h-4 w-4" />
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription>
                  Providing false information may lead to account restrictions or termination.
                  All responses are logged and may be reviewed by bank officials.
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setResponseDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitResponse}
              disabled={!responseMessage.trim()}
            >
              Submit Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FraudAlerts;

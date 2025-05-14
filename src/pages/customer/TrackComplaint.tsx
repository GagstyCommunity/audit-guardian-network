
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const TrackComplaint: React.FC = () => {
  const [ticketId, setTicketId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [searchMethod, setSearchMethod] = useState<'ticket' | 'mobile'>('ticket');
  const [complaint, setComplaint] = useState<any>(null);
  
  const handleSearch = () => {
    // In a real implementation, this would make an API call to fetch the complaint
    // For demonstration, we'll use mock data
    
    if (searchMethod === 'ticket' && !ticketId) {
      toast({
        title: "Error",
        description: "Please enter a valid ticket ID",
        variant: "destructive"
      });
      return;
    }
    
    if (searchMethod === 'mobile' && !mobileNumber) {
      toast({
        title: "Error",
        description: "Please enter a valid mobile number",
        variant: "destructive"
      });
      return;
    }
    
    // Mock data for demonstration
    const mockComplaint = {
      ticketId: ticketId || 'CMPT-123456',
      status: 'in-progress',
      complainDate: '12 May 2025',
      lastUpdated: '14 May 2025',
      cspId: 'CSP12345',
      cspName: 'Rajesh Kumar',
      cspLocation: 'Sector 14, Gurugram',
      complainType: 'Overcharge/Wrong Fee',
      description: 'The CSP charged me ₹50 extra for a basic transaction that should cost only ₹10.',
      severity: 'medium',
      timeline: [
        {
          date: '12 May 2025, 14:32',
          action: 'Complaint registered',
          details: 'Your complaint has been successfully registered in the system.'
        },
        {
          date: '12 May 2025, 14:35',
          action: 'Assigned to team',
          details: 'Your complaint has been assigned to the regional customer service team.'
        },
        {
          date: '13 May 2025, 10:15',
          action: 'Under investigation',
          details: 'Our team is analyzing the transaction details and contacting the CSP.'
        },
        {
          date: '14 May 2025, 11:30',
          action: 'CSP response received',
          details: 'The CSP has acknowledged the complaint and provided their explanation.'
        }
      ]
    };
    
    setComplaint(mockComplaint);
    
    toast({
      title: "Complaint Found",
      description: `Details for complaint ${mockComplaint.ticketId} have been loaded.`,
    });
  };
  
  // Helper function for status display
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-amber-500" />
            <span className="text-amber-500">Open</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-blue-500" />
            <span className="text-blue-500">In Progress</span>
          </div>
        );
      case 'resolved':
        return (
          <div className="flex items-center">
            <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500">Resolved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center">
            <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
            <span className="text-red-500">Rejected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4 text-gray-500" />
            <span className="text-gray-500">Unknown</span>
          </div>
        );
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Track Complaint</h1>
      
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Track Your Complaint</CardTitle>
          <CardDescription>
            Check the status and updates of your registered complaint
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="ticket" onValueChange={(value) => setSearchMethod(value as 'ticket' | 'mobile')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="ticket">Search by Ticket ID</TabsTrigger>
              <TabsTrigger value="mobile">Search by Mobile Number</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ticket">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ticketId">Complaint Ticket ID</Label>
                  <div className="flex mt-1 space-x-2">
                    <Input
                      id="ticketId"
                      placeholder="Enter ticket ID (e.g., CMPT-123456)"
                      value={ticketId}
                      onChange={(e) => setTicketId(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={handleSearch}>
                      <Search className="mr-2 h-4 w-4" />
                      Track
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mobile">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <div className="flex mt-1 space-x-2">
                    <Input
                      id="mobileNumber"
                      placeholder="Enter the mobile number used to file complaint"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={handleSearch}>
                      <Search className="mr-2 h-4 w-4" />
                      Find
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {complaint && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-medium">Complaint #{complaint.ticketId}</h3>
                  <p className="text-sm text-gray-500">Filed on {complaint.complainDate}</p>
                </div>
                <div>
                  {getStatusDisplay(complaint.status)}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Complaint Details</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span>{complaint.complainType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Severity:</span>
                      <Badge variant={complaint.severity === 'high' ? 'destructive' : 'outline'}>
                        {complaint.severity.charAt(0).toUpperCase() + complaint.severity.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Updated:</span>
                      <span>{complaint.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">CSP Information</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">CSP ID:</span>
                      <span>{complaint.cspId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span>{complaint.cspName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span>{complaint.cspLocation}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm bg-gray-50 p-3 rounded-md">
                  {complaint.description}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Complaint Timeline</h4>
                <div className="relative">
                  {/* Left timeline bar */}
                  <div className="absolute top-0 left-6 h-full w-0.5 bg-blue-100"></div>
                  
                  {complaint.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex mb-6">
                      <div className="flex-shrink-0 relative z-10">
                        <div className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                          {index === 0 ? (
                            <AlertCircle className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Clock className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">{event.action}</div>
                        <div className="text-sm text-gray-500">{event.date}</div>
                        <div className="text-sm mt-1">{event.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="text-sm text-gray-500">
          <p>For assistance with tracking your complaint, call our toll-free helpline at 1800-XXX-XXXX.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TrackComplaint;


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
import { Search, QrCode, CheckCircle, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const VerifyCSP: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<null | {
    verified: boolean;
    agent: {
      name: string;
      id: string;
      bank: string;
      location: string;
      lastAudit: string;
      status: string;
    }
  }>(null);
  
  const handleSearch = () => {
    // In a real implementation, this would make an API call to verify the CSP
    // For now, we'll simulate a response
    if (searchId.trim() === '') {
      toast({
        title: "Error",
        description: "Please enter a CSP ID or scan a QR code",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate successful verification
    if (searchId === '123456' || searchId === 'CSP12345') {
      setSearchResult({
        verified: true,
        agent: {
          name: "Rajesh Kumar",
          id: "CSP12345",
          bank: "State Bank of India",
          location: "Sector 14, Gurugram",
          lastAudit: "12 Apr 2025",
          status: "Active"
        }
      });
      
      toast({
        title: "CSP Verified",
        description: "This CSP agent is legitimate and active",
      });
    } else {
      // Simulate failed verification
      setSearchResult({
        verified: false,
        agent: {
          name: "Unknown",
          id: searchId,
          bank: "Unknown",
          location: "Unknown",
          lastAudit: "Never",
          status: "Unverified"
        }
      });
      
      toast({
        title: "Warning",
        description: "This CSP ID could not be verified. Please be cautious.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Verify CSP Agent</h1>
      
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Check CSP Legitimacy</CardTitle>
          <CardDescription>
            Verify if a CSP agent is legitimate before conducting transactions
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="id">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="id">Search by ID</TabsTrigger>
              <TabsTrigger value="qr">Scan QR Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="id">
              <div className="flex space-x-2 mb-6">
                <Input
                  placeholder="Enter CSP ID (e.g., CSP12345)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleSearch}>
                  <Search className="mr-2 h-4 w-4" />
                  Verify
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="qr">
              <div className="text-center p-8 border-2 border-dashed rounded-lg">
                <QrCode className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">Point your camera at a CSP QR code to verify</p>
                <Button onClick={() => setSearchId('CSP12345')}>
                  Simulate QR Scan
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          {searchResult && (
            <div className="mt-8 border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">Verification Result</h3>
                {searchResult.verified ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="mr-1 h-5 w-5" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <XCircle className="mr-1 h-5 w-5" />
                    <span>Unverified</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Agent Name</p>
                  <p className="font-medium">{searchResult.agent.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">CSP ID</p>
                  <p className="font-medium">{searchResult.agent.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bank</p>
                  <p className="font-medium">{searchResult.agent.bank}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{searchResult.agent.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Audit Date</p>
                  <p className="font-medium">{searchResult.agent.lastAudit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">{searchResult.agent.status}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex-col space-y-4">
          <div className="text-sm text-gray-500">
            <p>Always verify your CSP agent before conducting any transactions.</p>
            <p>Report suspicious CSP agents by calling our toll-free helpline at 1800-XXX-XXXX.</p>
          </div>
          <div className="w-full flex justify-between">
            <Button variant="outline">Report Suspicious CSP</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyCSP;

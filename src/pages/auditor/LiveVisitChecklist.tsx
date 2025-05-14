
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Camera, 
  Video, 
  MapPin, 
  Mic, 
  CheckCircle, 
  AlertTriangle,
  Upload,
  ArrowRight,
  Clock,
  User
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Mock audit data
const mockAudit = {
  id: 'AUD-234567',
  cspId: 'CSP12345',
  cspName: 'Rajesh Kumar',
  cspAddress: '123, Main Market, Sector 14, Gurugram, Haryana',
  assignedDate: new Date(2025, 4, 10),
  dueDate: new Date(2025, 4, 15),
  status: 'in-progress',
  riskLevel: 'medium',
  geoFence: {
    latitude: 28.459497,
    longitude: 77.026634,
    radius: 100 // meters
  },
  checklistItems: [
    { id: 'check1', label: 'CSP agent present at location', required: true, completed: false },
    { id: 'check2', label: 'CSP banner/signage properly displayed', required: true, completed: false },
    { id: 'check3', label: 'Biometric device functional and available', required: true, completed: false },
    { id: 'check4', label: 'Fee chart displayed prominently', required: true, completed: false },
    { id: 'check5', label: 'Proper record keeping (transaction logs)', required: true, completed: false },
    { id: 'check6', label: 'Customer receipt printer working', required: true, completed: false },
    { id: 'check7', label: 'Internet connectivity sufficient', required: true, completed: false },
    { id: 'check8', label: 'Adequate cash handling security', required: true, completed: false },
    { id: 'check9', label: 'Surroundings clean and presentable', required: false, completed: false },
    { id: 'check10', label: 'CSP has backup power solution', required: false, completed: false },
  ]
};

const LiveVisitChecklist: React.FC = () => {
  const [step, setStep] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [checklist, setChecklist] = useState(mockAudit.checklistItems);
  const [agentPhoto, setAgentPhoto] = useState<string | null>(null);
  const [cspPhoto, setCspPhoto] = useState<string | null>(null);
  const [videoRecorded, setVideoRecorded] = useState(false);
  const [audioRecorded, setAudioRecorded] = useState(false);
  const [notes, setNotes] = useState('');
  const [isWithinGeofence, setIsWithinGeofence] = useState(true);
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  
  const handleVerifyOTP = () => {
    if (!otpValue || otpValue.length < 4) {
      toast({
        title: "Error",
        description: "Please enter a valid OTP",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, this would verify the OTP with the server
    setOtpVerified(true);
    
    // Check geofence
    checkGeofence();
    
    toast({
      title: "OTP Verified",
      description: "CSP check-in successful. You can now proceed with the audit.",
    });
    
    setStep(1);
  };
  
  const checkGeofence = () => {
    // In a real implementation, this would use the browser's geolocation API
    // to check if the auditor is within the CSP's geofence
    
    // For demonstration, we'll randomly determine if within geofence
    const withinGeofence = Math.random() > 0.2; // 80% chance of being within geofence
    
    setIsWithinGeofence(withinGeofence);
    
    if (!withinGeofence) {
      toast({
        title: "Warning",
        description: "You appear to be outside the CSP's geofence. This will be noted in the audit.",
        variant: "destructive"
      });
    }
  };
  
  const handleCaptureAgentPhoto = () => {
    // In a real implementation, this would use the camera API
    setAgentPhoto('https://randomuser.me/api/portraits/men/32.jpg');
    
    toast({
      title: "Photo Captured",
      description: "Agent photo has been captured successfully.",
    });
  };
  
  const handleCaptureCspPhoto = () => {
    // In a real implementation, this would use the camera API
    setCspPhoto('https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2266&q=80');
    
    toast({
      title: "Photo Captured",
      description: "CSP environment photo has been captured successfully.",
    });
  };
  
  const handleRecordVideo = () => {
    // In a real implementation, this would use the camera API to record video
    setTimeout(() => {
      setVideoRecorded(true);
      
      toast({
        title: "Video Recorded",
        description: "Geo-tagged video has been recorded successfully.",
      });
    }, 2000);
  };
  
  const handleRecordAudio = () => {
    // In a real implementation, this would use the microphone API to record audio
    setTimeout(() => {
      setAudioRecorded(true);
      
      toast({
        title: "Audio Recorded",
        description: "Voice note has been recorded successfully.",
      });
    }, 1500);
  };
  
  const handleToggleChecklist = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmitAudit = () => {
    // Validate required fields
    const requiredItems = checklist.filter(item => item.required);
    const allRequiredCompleted = requiredItems.every(item => item.completed);
    
    if (!allRequiredCompleted) {
      toast({
        title: "Cannot Submit",
        description: "Please complete all required checklist items before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    if (!agentPhoto || !cspPhoto) {
      toast({
        title: "Cannot Submit",
        description: "Please capture both agent and CSP environment photos.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, this would submit the audit data to the server
    
    toast({
      title: "Audit Submitted",
      description: "Your audit has been successfully submitted and cannot be edited.",
    });
    
    setAuditSubmitted(true);
  };
  
  const calculateProgress = () => {
    const totalSteps = 3;
    return ((step + 1) / totalSteps) * 100;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-csp-navy">Live Visit Checklist</h1>
          <p className="text-gray-500 mt-1">
            Complete the on-site CSP audit with photo and video evidence
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-base">
            <Clock className="mr-1 h-4 w-4" />
            Due: {format(mockAudit.dueDate, 'dd MMM yyyy')}
          </Badge>
          <Badge variant={mockAudit.riskLevel === 'high' ? 'destructive' : 'outline'} className="text-base">
            {mockAudit.riskLevel.charAt(0).toUpperCase() + mockAudit.riskLevel.slice(1)} Risk
          </Badge>
        </div>
      </div>
      
      {!isWithinGeofence && otpVerified && !auditSubmitted && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Geofence Alert</AlertTitle>
          <AlertDescription>
            You appear to be outside the designated area for this CSP. Please ensure you are at the correct location.
            This will be flagged in your audit report.
          </AlertDescription>
        </Alert>
      )}
      
      {!auditSubmitted ? (
        <Card>
          <CardHeader>
            <CardTitle>Audit: {mockAudit.id}</CardTitle>
            <CardDescription>
              CSP: {mockAudit.cspName} ({mockAudit.cspId})
            </CardDescription>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <MapPin className="mr-1 h-4 w-4" />
              {mockAudit.cspAddress}
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span>Audit Progress</span>
                <span>Step {step + 1} of 3</span>
              </div>
              <Progress value={calculateProgress()} />
            </div>
            
            {step === 0 && (
              <div className="space-y-6">
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertTitle>Step 1: CSP Check-In</AlertTitle>
                  <AlertDescription>
                    Ask the CSP agent to generate an OTP from their app for check-in verification
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="otpValue">Enter CSP's OTP Code</Label>
                    <Input
                      id="otpValue"
                      placeholder="Enter 6-digit OTP code"
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      maxLength={6}
                      className="text-center text-xl tracking-wider"
                      disabled={otpVerified}
                    />
                  </div>
                  
                  {!otpVerified && (
                    <Button className="w-full" onClick={handleVerifyOTP}>
                      Verify OTP & Check-In
                    </Button>
                  )}
                  
                  {otpVerified && (
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-2">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="mt-2 font-medium">OTP Verified Successfully</p>
                      <p className="text-sm text-gray-500">
                        Geolocation recorded: {isWithinGeofence ? 'Within geofence' : 'Outside geofence'}
                      </p>
                      
                      <Button className="mt-4" onClick={handleNextStep}>
                        Continue to Evidence Collection
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {step === 1 && (
              <div className="space-y-6">
                <Alert>
                  <Camera className="h-4 w-4" />
                  <AlertTitle>Step 2: Evidence Collection</AlertTitle>
                  <AlertDescription>
                    Capture photos, video, and audio evidence of the CSP location
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>1. Capture CSP Agent Photo</Label>
                    {agentPhoto ? (
                      <div className="aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
                        <img 
                          src={agentPhoto} 
                          alt="CSP Agent" 
                          className="h-32 w-32 rounded-full object-cover" 
                        />
                        <CheckCircle className="absolute top-2 right-2 h-6 w-6 text-green-600 bg-white rounded-full p-1" />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                        <User className="h-10 w-10 text-gray-400 mb-2" />
                        <Button onClick={handleCaptureAgentPhoto}>
                          <Camera className="mr-2 h-4 w-4" />
                          Capture Agent Photo
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <Label>2. Capture CSP Environment Photo</Label>
                    {cspPhoto ? (
                      <div className="aspect-video bg-gray-100 rounded-lg relative">
                        <img 
                          src={cspPhoto} 
                          alt="CSP Environment" 
                          className="w-full h-full object-cover rounded-lg" 
                        />
                        <CheckCircle className="absolute top-2 right-2 h-6 w-6 text-green-600 bg-white rounded-full p-1" />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                        <Camera className="h-10 w-10 text-gray-400 mb-2" />
                        <Button onClick={handleCaptureCspPhoto}>
                          <Camera className="mr-2 h-4 w-4" />
                          Capture CSP Photo
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <Label>3. Record Geo-tagged Video</Label>
                    <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                      <Video className="h-10 w-10 text-gray-400 mb-2" />
                      {videoRecorded ? (
                        <div className="text-center">
                          <CheckCircle className="mx-auto h-6 w-6 text-green-600 mb-2" />
                          <span className="text-green-600 font-medium">Video Recorded</span>
                        </div>
                      ) : (
                        <Button onClick={handleRecordVideo}>
                          <Video className="mr-2 h-4 w-4" />
                          Record Video (10s)
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>4. Record Voice Notes</Label>
                    <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                      <Mic className="h-10 w-10 text-gray-400 mb-2" />
                      {audioRecorded ? (
                        <div className="text-center">
                          <CheckCircle className="mx-auto h-6 w-6 text-green-600 mb-2" />
                          <span className="text-green-600 font-medium">Audio Recorded</span>
                        </div>
                      ) : (
                        <Button onClick={handleRecordAudio}>
                          <Mic className="mr-2 h-4 w-4" />
                          Record Voice Note
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button 
                    onClick={handleNextStep}
                    disabled={!agentPhoto || !cspPhoto || !videoRecorded}
                  >
                    Continue to Checklist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Step 3: Complete Audit Checklist</AlertTitle>
                  <AlertDescription>
                    Verify all required aspects of the CSP location
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">CSP Checklist Items</h3>
                    <div className="space-y-3">
                      {checklist.map((item) => (
                        <div key={item.id} className="flex items-start space-x-3">
                          <Checkbox
                            id={item.id}
                            checked={item.completed}
                            onCheckedChange={() => handleToggleChecklist(item.id)}
                          />
                          <div className="space-y-1">
                            <Label
                              htmlFor={item.id}
                              className={
                                item.completed ? 'line-through text-gray-400' : ''
                              }
                            >
                              {item.label}
                              {item.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="notes">Audit Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any additional observations or notes about the CSP"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important Notice</AlertTitle>
                    <AlertDescription>
                      Once submitted, this audit cannot be edited. Please ensure all information is accurate.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                    <Button onClick={handleSubmitAudit}>
                      Submit Audit Report
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="py-8 text-center space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-medium">Audit Submitted Successfully</h3>
                <p className="text-gray-500 mt-2">
                  Your audit report for {mockAudit.cspName} ({mockAudit.cspId}) has been submitted.
                </p>
              </div>
              
              <div className="max-w-md mx-auto bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Audit Summary:</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div className="text-gray-500">Audit ID:</div>
                  <div>{mockAudit.id}</div>
                  <div className="text-gray-500">Completed On:</div>
                  <div>{format(new Date(), 'PPp')}</div>
                  <div className="text-gray-500">Checklist Items:</div>
                  <div>{checklist.filter(i => i.completed).length}/{checklist.length} Completed</div>
                  <div className="text-gray-500">Within Geofence:</div>
                  <div>{isWithinGeofence ? 'Yes' : 'No'}</div>
                </div>
              </div>
              
              <div className="flex justify-center pt-4 space-x-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                <Button onClick={() => window.location.href = '/auditor/tasks'}>
                  Return to Assigned Tasks
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {!auditSubmitted && (
        <Card>
          <CardHeader>
            <CardTitle>Audit History</CardTitle>
            <CardDescription>
              Previous audits for this CSP location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Audit ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Auditor</TableHead>
                  <TableHead>Issues Found</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">AUD-123456</TableCell>
                  <TableCell>{format(new Date(2025, 3, 15), 'dd MMM yyyy')}</TableCell>
                  <TableCell>Amit Sharma</TableCell>
                  <TableCell>None</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">AUD-123123</TableCell>
                  <TableCell>{format(new Date(2025, 2, 12), 'dd MMM yyyy')}</TableCell>
                  <TableCell>Priya Verma</TableCell>
                  <TableCell>2 minor issues</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">AUD-122987</TableCell>
                  <TableCell>{format(new Date(2025, 1, 10), 'dd MMM yyyy')}</TableCell>
                  <TableCell>Rahul Singh</TableCell>
                  <TableCell>1 critical issue</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveVisitChecklist;

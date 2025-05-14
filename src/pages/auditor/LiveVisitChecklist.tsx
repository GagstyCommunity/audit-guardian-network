
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  UserCheck,
  Upload,
  Image,
  Camera,
  Clipboard,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Visit, ChecklistItem } from '@/types/auditor.types';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const LiveVisitChecklist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const visitId = searchParams.get('id') || 'visit-001'; // Default to first visit for demo
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [visitInfo, setVisitInfo] = useState<Visit | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const loadData = setTimeout(() => {
      // Find the selected visit
      const visit = dummyVisits.find(v => v.id === visitId) || dummyVisits[0];
      setVisitInfo(visit);
      setChecklist(dummyChecklist);
      setLoading(false);
      
      // Calculate initial progress
      const completedItems = dummyChecklist.filter(item => item.completed).length;
      const totalItems = dummyChecklist.length;
      setProgress(totalItems > 0 ? (completedItems / totalItems) * 100 : 0);
    }, 800);
    
    return () => clearTimeout(loadData);
  }, [visitId]);
  
  const handleCheckItem = (itemId: string) => {
    const updatedChecklist = checklist.map(item => 
      item.id === itemId 
        ? { ...item, completed: !item.completed } 
        : item
    );
    setChecklist(updatedChecklist);
    
    // Update progress
    const completedItems = updatedChecklist.filter(item => item.completed).length;
    const totalItems = updatedChecklist.length;
    setProgress(totalItems > 0 ? (completedItems / totalItems) * 100 : 0);
    
    toast({
      title: "Checklist updated",
      description: "Your progress has been saved",
    });
  };
  
  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const handleCompleteVisit = () => {
    toast({
      title: "Visit Completed",
      description: "Your audit visit has been marked as complete",
    });
  };
  
  // Steps for the audit process
  const steps = [
    { title: "CSP Verification", icon: <UserCheck className="h-5 w-5" /> },
    { title: "Premises Check", icon: <MapPin className="h-5 w-5" /> },
    { title: "Document Review", icon: <Clipboard className="h-5 w-5" /> },
    { title: "Photo Evidence", icon: <Camera className="h-5 w-5" /> },
    { title: "Completion", icon: <CheckCircle className="h-5 w-5" /> }
  ];
  
  if (loading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2">Loading checklist...</p>
        </div>
      </div>
    );
  }
  
  if (!visitInfo) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-2" />
              <h2 className="text-xl font-semibold">Visit Not Found</h2>
              <p className="text-muted-foreground">The requested visit could not be found.</p>
              <Button className="mt-4" onClick={() => window.history.back()}>Go Back</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Live Visit Checklist</h1>
        <Badge className={visitInfo.red_zone ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
          {visitInfo.red_zone ? "Red Zone" : "Safe Zone"}
        </Badge>
      </div>
      
      {/* CSP Information */}
      <Card>
        <CardHeader>
          <CardTitle>CSP Information</CardTitle>
          <CardDescription>Details about the CSP you are visiting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">CSP ID</p>
              <p className="font-medium">{visitInfo.csp_id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">CSP Name</p>
              <p className="font-medium">{visitInfo.csp_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{visitInfo.location.village}, {visitInfo.location.district}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Visit Date</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <p className="font-medium">{new Date(visitInfo.visit_date).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Priority</p>
              <Badge className={
                visitInfo.priority === 'high' ? 'bg-red-100 text-red-800' :
                visitInfo.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                'bg-green-100 text-green-800'
              }>
                {visitInfo.priority.charAt(0).toUpperCase() + visitInfo.priority.slice(1)}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Issues to Check</p>
              <p className="font-medium">{visitInfo.issues.join(", ")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Progress Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
            
            {/* Step Tracker */}
            <div className="flex justify-between mt-6">
              {steps.map((step, idx) => (
                <div key={idx} className={`flex flex-col items-center ${idx <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`flex items-center justify-center h-10 w-10 rounded-full 
                    ${idx < currentStepIndex ? 'bg-primary text-primary-foreground' : 
                      idx === currentStepIndex ? 'border-2 border-primary' : 'border border-muted-foreground'}`}>
                    {step.icon}
                  </div>
                  <span className="text-xs mt-1 hidden md:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStepIndex].title}</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStepIndex === 0 && (
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">CSP Verification Steps</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Verify CSP ID badge
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Confirm biometric identification
                  </li>
                  <li className="flex items-center">
                    <Button variant="outline" size="sm" className="mr-2">
                      <UserCheck className="h-4 w-4 mr-1" />
                      Scan Face
                    </Button>
                    Perform face verification
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">CSP Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p>{visitInfo.csp_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">ID Number</p>
                    <p>{visitInfo.csp_id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Registration Date</p>
                    <p>03/12/2023</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge>Active</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStepIndex === 1 && (
            <div className="space-y-4">
              <p>Verify that the CSP premises meets all required standards.</p>
              
              {checklist.filter(item => item.category === 'premises').map((item) => (
                <div key={item.id} className="flex items-start gap-2 border-b pb-2">
                  <Checkbox 
                    id={item.id} 
                    checked={item.completed} 
                    onCheckedChange={() => handleCheckItem(item.id)} 
                  />
                  <div className="space-y-1">
                    <Label htmlFor={item.id} className="font-medium cursor-pointer">
                      {item.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="p-4 border rounded-md">
                <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                  <div className="flex h-full w-full items-center justify-center">
                    <MapPin className="h-12 w-12 text-muted-foreground opacity-50" />
                    <span className="ml-2 text-lg text-muted-foreground">Premises Location</span>
                  </div>
                </div>
                <p className="text-sm mt-2">Verify that the location matches the registered address</p>
              </div>
            </div>
          )}
          
          {currentStepIndex === 2 && (
            <div className="space-y-4">
              <p>Review the required documentation from the CSP.</p>
              
              {checklist.filter(item => item.category === 'documentation').map((item) => (
                <div key={item.id} className="flex items-start gap-2 border-b pb-2">
                  <Checkbox 
                    id={item.id} 
                    checked={item.completed} 
                    onCheckedChange={() => handleCheckItem(item.id)} 
                  />
                  <div className="space-y-1">
                    <Label htmlFor={item.id} className="font-medium cursor-pointer">
                      {item.title}
                    </Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    {item.required && <Badge className="bg-blue-100 text-blue-800">Required</Badge>}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {currentStepIndex === 3 && (
            <div className="space-y-4">
              <p>Take photos as evidence for the audit.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((idx) => (
                  <Card key={idx}>
                    <CardContent className="p-0">
                      <AspectRatio ratio={3/4} className="bg-muted relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Camera className="h-8 w-8 text-muted-foreground opacity-50" />
                          <p className="text-sm text-muted-foreground mt-2">Photo {idx}</p>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                        >
                          <Camera className="h-4 w-4 mr-1" />
                          Capture
                        </Button>
                      </AspectRatio>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Upload Photos</p>
                <p className="text-xs text-muted-foreground">Drag and drop or click to upload</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Image className="h-4 w-4 mr-1" /> Select Files
                </Button>
              </div>
            </div>
          )}
          
          {currentStepIndex === 4 && (
            <div className="space-y-4">
              <div className="text-center p-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold">Audit Visit Complete</h2>
                <p className="text-muted-foreground">You have completed {Math.round(progress)}% of the checklist.</p>
                
                {progress < 100 && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
                    <p className="text-amber-800">Some items are still pending completion. Are you sure you want to submit?</p>
                  </div>
                )}
                
                <div className="mt-6">
                  <Button onClick={handleCompleteVisit} className="w-full">Submit Audit Results</Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline"
            onClick={handlePreviousStep} 
            disabled={currentStepIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          
          {currentStepIndex < steps.length - 1 ? (
            <Button onClick={handleNextStep}>
              Next <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleCompleteVisit}>
              Complete Visit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

// Dummy data
const dummyVisits: Visit[] = [
  {
    id: "visit-001",
    csp_id: "CSP245",
    csp_name: "Aarav Sharma",
    visit_date: "2025-05-15T09:00:00",
    status: "pending",
    priority: "high",
    location: {
      district: "North District",
      village: "Chandpur",
      lat: 28.7041,
      long: 77.1025
    },
    distance: 4.5,
    estimated_time: 15,
    red_zone: true,
    issues: ["Face verification failed", "Suspicious transaction pattern"]
  },
  {
    id: "visit-002",
    csp_id: "CSP108",
    csp_name: "Priya Patel",
    visit_date: "2025-05-15T13:00:00",
    status: "pending",
    priority: "medium",
    location: {
      district: "East District",
      village: "Raipur",
      lat: 28.6139,
      long: 77.2090
    },
    distance: 12,
    estimated_time: 25,
    red_zone: false,
    issues: ["Suspicious transaction pattern"]
  }
];

const dummyChecklist: ChecklistItem[] = [
  {
    id: "check-001",
    title: "Signage and Branding",
    description: "Check that proper signage and branding is displayed outside the premises",
    required: true,
    completed: true,
    category: "premises"
  },
  {
    id: "check-002",
    title: "Operational Hours Display",
    description: "Verify that operational hours are clearly displayed",
    required: true,
    completed: false,
    category: "premises"
  },
  {
    id: "check-003",
    title: "Space Requirements",
    description: "CSP should have minimum 100 sq ft dedicated space",
    required: true,
    completed: false,
    category: "premises"
  },
  {
    id: "check-004",
    title: "Basic Infrastructure",
    description: "Check availability of electricity, internet connectivity",
    required: true,
    completed: true,
    category: "premises"
  },
  {
    id: "check-005",
    title: "CSP Registration Certificate",
    description: "Verify original CSP registration certificate",
    required: true,
    completed: false,
    category: "documentation"
  },
  {
    id: "check-006",
    title: "Service Agreement",
    description: "Review the service agreement with the bank",
    required: true,
    completed: false,
    category: "documentation"
  },
  {
    id: "check-007",
    title: "Transaction Records",
    description: "Inspect transaction records for the last month",
    required: true,
    completed: false,
    category: "documentation"
  },
  {
    id: "check-008",
    title: "KYC Documents",
    description: "Check if KYC documents are properly maintained",
    required: true,
    completed: false,
    category: "documentation"
  }
];

export default LiveVisitChecklist;

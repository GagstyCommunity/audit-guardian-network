
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

// Dummy data for the checklist
const dummyChecklist: ChecklistItem[] = [
  {
    id: "check-001",
    title: "Verify CSP ID badge",
    description: "Check that the CSP ID badge is valid and matches records",
    required: true,
    completed: false,
    category: "verification"
  },
  {
    id: "check-002",
    title: "Confirm biometric authentication system",
    description: "Verify the biometric authentication system is functioning properly",
    required: true,
    completed: false,
    category: "equipment"
  },
  {
    id: "check-003",
    title: "Check transaction records",
    description: "Review the last 7 days of transaction records for any anomalies",
    required: true,
    completed: false,
    category: "documentation"
  },
  {
    id: "check-004",
    title: "Inspect cash management practices",
    description: "Verify that cash handling and storage follows security protocols",
    required: true,
    completed: false,
    category: "security"
  },
  {
    id: "check-005",
    title: "Verify know-your-customer (KYC) documentation",
    description: "Ensure all KYC documents are properly maintained and up to date",
    required: true,
    completed: false,
    category: "compliance"
  },
  {
    id: "check-006",
    title: "Inspect premises cleanliness",
    description: "Check that the CSP premises are clean and professionally maintained",
    required: false,
    completed: false,
    category: "premises"
  },
  {
    id: "check-007",
    title: "Verify signage and branding",
    description: "Ensure proper branding and required regulatory signage is displayed",
    required: true,
    completed: false,
    category: "compliance"
  }
];

// Dummy visit data
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
                      Verify Identity
                    </Button>
                    Match CSP identity with records
                  </li>
                </ul>
              </div>
              
              {/* Checklist for this step */}
              <div className="space-y-2">
                {checklist
                  .filter(item => item.category === "verification")
                  .map(item => (
                    <div key={item.id} className="flex items-top space-x-2 border p-3 rounded-md">
                      <Checkbox 
                        id={item.id} 
                        checked={item.completed}
                        onCheckedChange={() => handleCheckItem(item.id)}
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor={item.id} className="text-base cursor-pointer">
                          {item.title}
                          {item.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
          
          {currentStepIndex === 1 && (
            <div className="space-y-2">
              {checklist
                .filter(item => item.category === "premises")
                .map(item => (
                  <div key={item.id} className="flex items-top space-x-2 border p-3 rounded-md">
                    <Checkbox 
                      id={item.id} 
                      checked={item.completed}
                      onCheckedChange={() => handleCheckItem(item.id)}
                    />
                    <div className="grid gap-1.5">
                      <Label htmlFor={item.id} className="text-base cursor-pointer">
                        {item.title}
                        {item.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              }
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Camera className="mr-2 h-4 w-4" /> Take Photo of Premises
                </Button>
              </div>
            </div>
          )}
          
          {currentStepIndex === 2 && (
            <div className="space-y-2">
              {checklist
                .filter(item => ["documentation", "compliance"].includes(item.category))
                .map(item => (
                  <div key={item.id} className="flex items-top space-x-2 border p-3 rounded-md">
                    <Checkbox 
                      id={item.id} 
                      checked={item.completed}
                      onCheckedChange={() => handleCheckItem(item.id)}
                    />
                    <div className="grid gap-1.5">
                      <Label htmlFor={item.id} className="text-base cursor-pointer">
                        {item.title}
                        {item.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
          
          {currentStepIndex === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Required Photos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="p-3 border rounded-md flex items-center justify-between">
                      <div>CSP ID Card</div>
                      <Button size="sm" variant="outline">
                        <Camera className="h-4 w-4 mr-1" /> Capture
                      </Button>
                    </div>
                    <div className="p-3 border rounded-md flex items-center justify-between">
                      <div>Transaction Device</div>
                      <Button size="sm" variant="outline">
                        <Camera className="h-4 w-4 mr-1" /> Capture
                      </Button>
                    </div>
                    <div className="p-3 border rounded-md flex items-center justify-between">
                      <div>KYC Documentation</div>
                      <Button size="sm" variant="outline">
                        <Camera className="h-4 w-4 mr-1" /> Capture
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Captured Images</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md bg-muted">
                      <p className="text-muted-foreground">No images captured yet</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Upload Additional Documents
                </Button>
              </div>
            </div>
          )}
          
          {currentStepIndex === 4 && (
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-green-50">
                <h3 className="font-medium text-green-800 mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Audit Summary
                </h3>
                <p className="text-green-700">
                  You've completed {checklist.filter(item => item.completed).length} out of {checklist.length} checklist items.
                </p>
              </div>
              
              {checklist.filter(item => item.required && !item.completed).length > 0 && (
                <div className="p-4 border rounded-md bg-amber-50">
                  <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                    Missing Required Items
                  </h3>
                  <ul className="space-y-1 list-disc list-inside text-amber-700">
                    {checklist
                      .filter(item => item.required && !item.completed)
                      .map(item => (
                        <li key={item.id}>{item.title}</li>
                      ))
                    }
                  </ul>
                </div>
              )}
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Audit Recommendations</h3>
                <p className="text-muted-foreground">
                  Based on your audit findings, please provide recommendations for improvement:
                </p>
                <textarea 
                  className="w-full border rounded-md mt-2 p-2 h-24" 
                  placeholder="Enter your recommendations..."
                ></textarea>
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
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          {currentStepIndex < steps.length - 1 ? (
            <Button onClick={handleNextStep}>
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleCompleteVisit}>
              Complete Audit <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LiveVisitChecklist;

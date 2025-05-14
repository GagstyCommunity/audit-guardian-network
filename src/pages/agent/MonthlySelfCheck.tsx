
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
import { 
  Camera, 
  Video, 
  AlertTriangle, 
  Check, 
  CheckCircle, 
  MapPin, 
  Clock,
  Download
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';

const MonthlySelfCheck: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  
  const [checkStep, setCheckStep] = useState(0);
  const [selfieCapture, setSelfieCapture] = useState<string | null>(null);
  const [videoRecorded, setVideoRecorded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  
  // Mock data for demonstration
  const lastCheck = new Date();
  lastCheck.setDate(lastCheck.getDate() - 28); // 28 days ago
  
  const nextCheck = new Date(lastCheck);
  nextCheck.setDate(nextCheck.getDate() + 30); // 30 days after last check
  
  const isCheckDue = new Date() >= nextCheck;
  
  const handleSelfieCapture = () => {
    // In a real implementation, this would use the device camera
    setProcessing(true);
    
    setTimeout(() => {
      setSelfieCapture('https://randomuser.me/api/portraits/men/32.jpg');
      setProcessing(false);
      toast({
        title: "Selfie captured",
        description: "Your facial image has been recorded successfully.",
      });
      setCheckStep(1);
    }, 1500);
  };
  
  const handleVideoCapture = () => {
    // In a real implementation, this would record a video of the agent's environment
    setProcessing(true);
    
    setTimeout(() => {
      setVideoRecorded(true);
      setProcessing(false);
      toast({
        title: "Video captured",
        description: "Your 360° video has been recorded successfully.",
      });
      setCheckStep(2);
    }, 2000);
  };
  
  const handleCompleteCheck = () => {
    // In a real implementation, this would submit the captured data to the server
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
      toast({
        title: "Self-check complete",
        description: "Your monthly verification has been completed successfully.",
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-csp-navy">Monthly Self-Check</h1>
        <div className="flex space-x-2">
          <Badge variant={isCheckDue ? "destructive" : "outline"}>
            {isCheckDue ? "Check Due" : "Check not due yet"}
          </Badge>
          <Badge variant="outline">
            <Clock className="mr-1 h-4 w-4" /> 
            Next: {format(nextCheck, 'dd MMM yyyy')}
          </Badge>
        </div>
      </div>
      
      {isCheckDue && !complete && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Self-check required</AlertTitle>
          <AlertDescription>
            Your monthly self-check is due. Please complete it to continue using the system without restrictions.
          </AlertDescription>
        </Alert>
      )}
      
      {!isCheckDue && !complete && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertTitle>Self-check not due yet</AlertTitle>
          <AlertDescription>
            Your next monthly self-check is scheduled for {format(nextCheck, 'dd MMM yyyy')}. You can complete it early if needed.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Self-Check Process</CardTitle>
            <CardDescription>
              Complete these steps to verify your identity and CSP environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!complete ? (
              <div className="space-y-6">
                <div className="mb-4">
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Progress</span>
                    <span>{checkStep}/3 steps completed</span>
                  </div>
                  <Progress value={(checkStep / 3) * 100} />
                </div>
                
                <div className="space-y-4">
                  <div className={`p-4 border rounded-lg ${checkStep >= 0 ? 'bg-gray-50' : 'opacity-50'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium flex items-center">
                        <Camera className="mr-2 h-4 w-4" /> 
                        Capture Selfie
                      </h3>
                      {selfieCapture && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      Take a clear photo of your face for identity verification
                    </p>
                    {selfieCapture ? (
                      <div className="aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
                        <img 
                          src={selfieCapture} 
                          alt="Selfie" 
                          className="h-32 w-32 rounded-full object-cover" 
                        />
                      </div>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={handleSelfieCapture} 
                        disabled={processing}
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        {processing ? 'Processing...' : 'Capture Selfie'}
                      </Button>
                    )}
                  </div>
                  
                  <div className={`p-4 border rounded-lg ${checkStep >= 1 ? 'bg-gray-50' : 'opacity-50'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium flex items-center">
                        <Video className="mr-2 h-4 w-4" /> 
                        Record 360° CSP Environment
                      </h3>
                      {videoRecorded && (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      Record a short video showing your CSP shop/office environment
                    </p>
                    <Button 
                      className="w-full" 
                      onClick={handleVideoCapture} 
                      disabled={checkStep < 1 || processing || videoRecorded}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      {processing ? 'Processing...' : videoRecorded ? 'Video Recorded' : 'Record Video'}
                    </Button>
                  </div>
                  
                  <div className={`p-4 border rounded-lg ${checkStep >= 2 ? 'bg-gray-50' : 'opacity-50'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium flex items-center">
                        <MapPin className="mr-2 h-4 w-4" /> 
                        Complete Verification
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      Submit your verification data for review
                    </p>
                    <Button 
                      className="w-full" 
                      onClick={handleCompleteCheck} 
                      disabled={checkStep < 2 || processing}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {processing ? 'Processing...' : 'Complete Self-Check'}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-medium">Self-Check Completed</h3>
                <p className="text-gray-500">
                  Your monthly verification has been completed successfully.
                  Your next check is due on {format(new Date(nextCheck.getTime() + 30*24*60*60*1000), 'dd MMM yyyy')}.
                </p>
                <Button variant="outline" className="mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Self-Check History</CardTitle>
            <CardDescription>
              Record of your previous monthly verifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complete && (
                <div className="p-4 border rounded-lg bg-green-50">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{format(new Date(), 'dd MMM yyyy')}</p>
                      <p className="text-sm text-gray-500">Completed today</p>
                    </div>
                    <Badge variant="success">Success</Badge>
                  </div>
                </div>
              )}
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{format(lastCheck, 'dd MMM yyyy')}</p>
                    <p className="text-sm text-gray-500">28 days ago</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50">Success</Badge>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{format(new Date(lastCheck.getTime() - 30*24*60*60*1000), 'dd MMM yyyy')}</p>
                    <p className="text-sm text-gray-500">58 days ago</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50">Success</Badge>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{format(new Date(lastCheck.getTime() - 60*24*60*60*1000), 'dd MMM yyyy')}</p>
                    <p className="text-sm text-gray-500">88 days ago</p>
                  </div>
                  <Badge variant="outline" className="bg-amber-50">Delayed</Badge>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{format(new Date(lastCheck.getTime() - 90*24*60*60*1000), 'dd MMM yyyy')}</p>
                    <p className="text-sm text-gray-500">118 days ago</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50">Success</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonthlySelfCheck;

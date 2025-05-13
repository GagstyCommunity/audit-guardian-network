
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Check, Shield, AlertTriangle, RotateCcw, MapPin, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useSupabaseData, mutateSupabaseData } from '@/hooks/useSupabaseData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const FacialCheckIn: React.FC = () => {
  const { authState } = useAuth();
  const [verifying, setVerifying] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState<boolean | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  
  const { data: verifications, loading, refetch } = useSupabaseData<FaceVerification>('face_verifications', {
    select: '*',
    orderBy: { column: 'verified_at', ascending: false },
    limit: 10
  });
  
  const { data: agents } = useSupabaseData<CSPAgent>('csp_agents', {
    column: 'profile_id', 
    value: authState.user?.id 
  });

  const latestVerification = verifications.length > 0 ? verifications[0] : null;
  const currentAgent = agents.length > 0 ? agents[0] : null;

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access your camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const handleStopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      setShowCamera(false);
    }
  };

  const handleVerification = async () => {
    setVerifying(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = Math.random() > 0.2; // 80% success rate
      
      await mutateSupabaseData(
        'insert',
        'face_verifications',
        {
          profile_id: authState.user?.id,
          verification_type: 'DAILY_LOGIN',
          success: success,
          device_id: 'device-browser',
          location_lat: 28.6139,
          location_long: 77.2090,
          failure_reason: !success ? 'Face not recognized' : null
        }
      );
      
      // Also update the CSP agent's last verification time if success
      if (success && currentAgent) {
        await mutateSupabaseData(
          'update',
          'csp_agents',
          {
            last_face_verification: new Date().toISOString()
          },
          { column: 'id', value: currentAgent.id }
        );
      }
      
      setCheckInSuccess(success);
      refetch();
      
      toast({
        title: success ? "Verification Successful" : "Verification Failed",
        description: success ? 
          "Your identity has been verified successfully." : 
          "We couldn't verify your identity. Please try again.",
        variant: success ? "default" : "destructive"
      });
      
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "An error occurred during verification.",
        variant: "destructive"
      });
    } finally {
      setVerifying(false);
      handleStopCamera();
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'PP');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatDateTime = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'PPp');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const daysSinceLastVerification = () => {
    if (!currentAgent?.last_face_verification) return 'Never';
    
    const lastVerification = new Date(currentAgent.last_face_verification);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastVerification.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays === 0 ? 'Today' : `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-csp-navy">Facial Verification</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Biometric Check-In</CardTitle>
            <CardDescription>Complete your daily facial verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">Last Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      {daysSinceLastVerification()}
                    </p>
                  </div>
                  <Badge variant={
                    !currentAgent?.last_face_verification ? "destructive" :
                      daysSinceLastVerification() === 'Today' ? "success" : "outline"
                  }>
                    {!currentAgent?.last_face_verification ? 'Required' :
                      daysSinceLastVerification() === 'Today' ? 'Verified Today' : 'Verification Needed'}
                  </Badge>
                </div>
                <div className="text-sm">
                  <div className="flex items-center mt-2">
                    <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <span>
                      Location:&nbsp;
                      <span className="font-medium">
                        {currentAgent && currentAgent.location_lat && currentAgent.location_long 
                          ? `${currentAgent.location_lat.toFixed(3)}, ${currentAgent.location_long.toFixed(3)}` 
                          : 'Unknown'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 border rounded-lg aspect-video flex items-center justify-center overflow-hidden">
                {showCamera ? (
                  <video
                    autoPlay
                    ref={(videoElement) => {
                      if (videoElement && cameraStream) {
                        videoElement.srcObject = cameraStream;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                ) : checkInSuccess === null ? (
                  <div className="text-center">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Ready for facial verification</p>
                  </div>
                ) : checkInSuccess ? (
                  <div className="text-center text-green-600">
                    <Check className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-medium">Verification Successful</p>
                  </div>
                ) : (
                  <div className="text-center text-destructive">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-medium">Verification Failed</p>
                    <p className="text-sm mt-1">Face not recognized</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {!showCamera ? (
              <Button
                variant="default"
                onClick={handleStartCamera}
                disabled={verifying}
                className="w-full"
              >
                <Camera className="mr-2 h-4 w-4" />
                Start Facial Verification
              </Button>
            ) : (
              <div className="flex w-full gap-4">
                <Button
                  variant="outline"
                  onClick={handleStopCamera}
                  disabled={verifying}
                  className="w-1/2"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleVerification}
                  disabled={verifying}
                  className="w-1/2"
                >
                  {verifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Verify Identity
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verification History</CardTitle>
            <CardDescription>Recent facial verification attempts</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading verification history...</div>
            ) : verifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No verification history found
              </div>
            ) : (
              <div className="space-y-4">
                {verifications.map((verification, index) => (
                  <div
                    key={verification.id}
                    className={`p-4 rounded-lg border ${
                      verification.success ? 'bg-green-50' : 'bg-red-50'
                    } ${index === 0 ? 'border-2 border-primary' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          {verification.success ? (
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                          )}
                          <span className="font-medium">
                            {verification.verification_type.replace('_', ' ')}
                            {index === 0 && " (Latest)"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDateTime(verification.verified_at)}
                        </p>
                      </div>
                      <Badge variant={verification.success ? "success" : "destructive"}>
                        {verification.success ? 'Success' : 'Failed'}
                      </Badge>
                    </div>
                    
                    {!verification.success && verification.failure_reason && (
                      <p className="text-sm text-destructive mt-2">
                        Reason: {verification.failure_reason}
                      </p>
                    )}
                    
                    <div className="mt-2 text-xs text-muted-foreground">
                      {verification.device_id && (
                        <div className="flex items-center mt-1">
                          <Shield className="h-3 w-3 mr-1" />
                          <span>Device: {verification.device_id}</span>
                        </div>
                      )}
                      
                      {verification.location_lat && verification.location_long && (
                        <div className="flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>
                            Location: {verification.location_lat.toFixed(3)}, {verification.location_long.toFixed(3)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Verification Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Daily Check-in Required</AlertTitle>
            <AlertDescription>
              As a CSP agent, you need to complete facial verification daily before accessing transaction services.
            </AlertDescription>
          </Alert>
          
          <div className="mt-4 space-y-2">
            <h4 className="font-medium">Verification Guidelines</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Ensure adequate lighting when performing verification</li>
              <li>Remove face coverings, glasses, or any items that may obstruct facial recognition</li>
              <li>Position your face directly in front of the camera</li>
              <li>Keep a neutral expression during verification</li>
              <li>If verification fails repeatedly, contact support for assistance</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacialCheckIn;


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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, Phone, CheckCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SubmitComplaint: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    cspId: '',
    complainType: '',
    description: '',
    severity: 'medium',
    attachment: null as File | null,
    otp: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, attachment: e.target.files![0] }));
    }
  };
  
  const requestOtp = () => {
    if (!formData.phone || formData.phone.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "OTP Sent",
      description: `A 6-digit OTP has been sent to ${formData.phone}`,
    });
    
    // In a real app, this would make an API call to send an OTP
    setStep(2);
  };
  
  const verifyOtp = () => {
    if (!formData.otp || formData.otp.length < 4) {
      toast({
        title: "Error",
        description: "Please enter a valid OTP",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would make an API call to verify the OTP
    setStep(3);
  };
  
  const submitComplaint = () => {
    if (!formData.cspId || !formData.complainType || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would make an API call to submit the complaint
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been submitted successfully. You can track its status using the ticket number.",
    });
    
    setStep(4);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Submit Complaint</h1>
      
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Customer Complaint Form</CardTitle>
          <CardDescription>
            Report issues with CSP agents or transactions
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <div className={`flex-1 text-center ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                Verify Mobile
              </div>
              <div className={`flex-1 text-center ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                OTP
              </div>
              <div className={`flex-1 text-center ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                Complaint Details
              </div>
              <div className={`flex-1 text-center ${step >= 4 ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                Complete
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex mt-1 space-x-2">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-grow"
                  />
                  <Button onClick={requestOtp}>
                    <Phone className="mr-2 h-4 w-4" />
                    Get OTP
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  We'll send a one-time password to verify your identity
                </p>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleInputChange}
                  className="text-center text-xl tracking-wider"
                  maxLength={6}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter the 6-digit code sent to {formData.phone}
                </p>
                <div className="flex justify-between mt-4">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <div>
                    <Button variant="link" onClick={requestOtp}>
                      Resend OTP
                    </Button>
                    <Button onClick={verifyOtp}>
                      Verify & Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="cspId">CSP ID or Agent Code</Label>
                <Input
                  id="cspId"
                  name="cspId"
                  placeholder="Enter CSP ID (e.g., CSP12345)"
                  value={formData.cspId}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <Label htmlFor="complainType">Complaint Type</Label>
                <Select 
                  value={formData.complainType} 
                  onValueChange={(value) => handleSelectChange('complainType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select complaint type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overcharge">Overcharge/Wrong Fee</SelectItem>
                    <SelectItem value="refuse-service">Refusal of Service</SelectItem>
                    <SelectItem value="wrong-amount">Wrong Amount Processed</SelectItem>
                    <SelectItem value="rude-behavior">Rude Behavior</SelectItem>
                    <SelectItem value="impersonation">Impersonation/Fake CSP</SelectItem>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Complaint Details</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please provide details of your complaint"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              
              <div>
                <Label>Severity Level</Label>
                <RadioGroup 
                  defaultValue={formData.severity}
                  onValueChange={(value) => handleSelectChange('severity', value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="critical" id="critical" />
                    <Label htmlFor="critical">Critical</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label>Upload Proof (Optional)</Label>
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
                {formData.attachment && (
                  <p className="text-sm text-gray-500 mt-2">
                    File selected: {formData.attachment.name}
                  </p>
                )}
              </div>
              
              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={submitComplaint}>
                  Submit Complaint
                </Button>
              </div>
            </div>
          )}
          
          {step === 4 && (
            <div className="py-8 text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium">Complaint Submitted Successfully</h3>
              <p>Your complaint has been registered with ticket ID:</p>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-lg font-medium">
                CMPT-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <p className="text-sm text-gray-500">
                You will receive SMS updates about your complaint status. You can also track your complaint using this ticket ID.
              </p>
              <div className="pt-4">
                <Button onClick={() => window.location.href = '/track-complaint'}>
                  Track My Complaint
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        
        {step < 4 && (
          <CardFooter className="text-sm text-gray-500">
            <p>For immediate assistance, call our toll-free helpline at 1800-XXX-XXXX.</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default SubmitComplaint;

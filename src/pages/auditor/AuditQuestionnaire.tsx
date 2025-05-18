
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertCircle, 
  CheckCircleIcon, 
  Camera, 
  Upload, 
  FileCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AuditQuestion } from '@/types/audit.types';

// Mock data
const mockAuditData = {
  id: 'audit-123',
  csp: {
    id: 'csp-456',
    name: 'Rajesh Kumar',
    location: 'Chandpur Village, North District',
    branch: 'SBI Chandpur Branch',
    lastAudit: '2024-01-15',
  },
  questions: [
    { 
      id: '1', 
      question: 'Are all required KYC documents available?', 
      category: 'Documentation',
      required: true,
      answerType: 'radio' as const,
      options: ['Yes', 'No', 'Partially'],
      createdAt: new Date('2024-05-10'),
      createdBy: 'Compliance Officer',
      isActive: true
    },
    { 
      id: '2', 
      question: 'Is the cash drawer properly secured when not in use?', 
      category: 'Physical Security',
      required: true,
      answerType: 'radio' as const,
      options: ['Yes', 'No'],
      createdAt: new Date('2024-05-10'),
      createdBy: 'Compliance Officer',
      isActive: true
    },
    { 
      id: '3', 
      question: 'Are passwords being changed regularly according to policy?', 
      category: 'System Security',
      required: true,
      answerType: 'radio' as const,
      options: ['Yes', 'No', 'N/A'],
      createdAt: new Date('2024-05-10'),
      createdBy: 'Compliance Officer',
      isActive: true
    },
    { 
      id: '4', 
      question: 'Rate the cleanliness of the CSP premises (1-5)', 
      category: 'Operational Compliance',
      required: true,
      answerType: 'rating' as const,
      createdAt: new Date('2024-05-10'),
      createdBy: 'Compliance Officer',
      isActive: true
    },
    { 
      id: '5', 
      question: 'Is customer feedback being collected and documented?', 
      category: 'Customer Service',
      required: true,
      answerType: 'radio' as const,
      options: ['Yes', 'No'],
      createdAt: new Date('2024-05-10'),
      createdBy: 'Compliance Officer',
      isActive: true
    },
    { 
      id: '6', 
      question: 'Describe any issues with the biometric authentication system', 
      category: 'System Security',
      required: false,
      answerType: 'text' as const,
      createdAt: new Date('2024-05-10'),
      createdBy: 'Compliance Officer',
      isActive: true
    },
    { 
      id: '7', 
      question: 'Which security features are implemented correctly?', 
      category: 'Physical Security',
      required: true,
      answerType: 'checkbox' as const,
      options: ['CCTV', 'Alarm System', 'Secure Safe', 'Security Guard', 'Panic Button'],
      createdAt: new Date('2024-05-10'),
      createdBy: 'Compliance Officer',
      isActive: true
    },
  ]
};

interface FormAnswers {
  [key: string]: string | string[] | number;
}

const AuditQuestionnaire: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { authState } = useAuth();
  
  const [auditData, setAuditData] = useState(mockAuditData);
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [comments, setComments] = useState<{[key: string]: string}>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  // Group questions by category
  const groupedQuestions: {[key: string]: AuditQuestion[]} = auditData.questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as {[key: string]: AuditQuestion[]});
  
  const handleAnswerChange = (questionId: string, value: string | string[] | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleCommentChange = (questionId: string, value: string) => {
    setComments(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newPhotos = Array.from(event.target.files);
      setPhotos(prev => [...prev, ...newPhotos]);
      
      toast({
        title: "Photos Added",
        description: `${newPhotos.length} new photos uploaded`,
      });
    }
  };
  
  const capturePhoto = () => {
    // In a real app, this would access the camera
    toast({
      title: "Camera Activated",
      description: "This would open the device camera in a real app",
    });
  };
  
  const validateForm = (): boolean => {
    const errors: string[] = [];
    
    auditData.questions
      .filter(q => q.required)
      .forEach(question => {
        if (!answers[question.id]) {
          errors.push(`Please answer "${question.question}"`);
        }
      });
    
    if (photos.length === 0) {
      errors.push('Please upload at least one photo for documentation');
    }
    
    setFormErrors(errors);
    return errors.length === 0;
  };
  
  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please complete all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
      
      toast({
        title: "Audit Submitted",
        description: "Audit questionnaire has been successfully submitted",
      });
    }, 1500);
  };
  
  const renderQuestionInput = (question: AuditQuestion) => {
    switch (question.answerType) {
      case 'text':
        return (
          <Textarea 
            placeholder="Enter your answer"
            value={(answers[question.id] as string) || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="mt-1"
          />
        );
      case 'radio':
        return (
          <RadioGroup 
            value={(answers[question.id] as string) || ''}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            className="mt-2"
          >
            {question.options?.map((option, idx) => (
              <div className="flex items-center space-x-2" key={`${question.id}-option-${idx}`}>
                <RadioGroupItem value={option} id={`${question.id}-option-${idx}`} />
                <Label htmlFor={`${question.id}-option-${idx}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'checkbox':
        return (
          <div className="mt-2 space-y-2">
            {question.options?.map((option, idx) => {
              const selectedValues = (answers[question.id] as string[]) || [];
              
              return (
                <div className="flex items-center space-x-2" key={`${question.id}-option-${idx}`}>
                  <Checkbox 
                    id={`${question.id}-option-${idx}`}
                    checked={selectedValues.includes(option)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleAnswerChange(
                          question.id, 
                          [...(answers[question.id] as string[] || []), option]
                        );
                      } else {
                        handleAnswerChange(
                          question.id,
                          (answers[question.id] as string[])?.filter(v => v !== option) || []
                        );
                      }
                    }}
                  />
                  <Label htmlFor={`${question.id}-option-${idx}`}>{option}</Label>
                </div>
              );
            })}
          </div>
        );
      case 'rating':
        return (
          <div className="flex mt-2 space-x-1">
            {[1, 2, 3, 4, 5].map(rating => (
              <Button
                key={`rating-${rating}`}
                variant={answers[question.id] === rating ? "default" : "outline"}
                size="sm"
                onClick={() => handleAnswerChange(question.id, rating)}
              >
                {rating}
              </Button>
            ))}
          </div>
        );
      default:
        return <Input type="text" className="mt-1" />;
    }
  };
  
  if (formSubmitted) {
    return (
      <div className="max-w-3xl mx-auto my-8 px-4">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
              <CardTitle>Audit Submitted Successfully</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-green-800 mb-4">
              Your audit of {auditData.csp.name} has been successfully submitted.
            </p>
            <p className="text-sm text-muted-foreground">
              The compliance team will review your findings and may follow up if needed.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/auditor/tasks')}>
              Back to Tasks
            </Button>
            <Button onClick={() => navigate('/auditor/visit-logs')}>
              View Audit Logs
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <h1 className="text-3xl font-bold">Audit Questionnaire</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>CSP Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="font-medium">CSP Name:</span>
              <span>{auditData.csp.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Location:</span>
              <span>{auditData.csp.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Branch:</span>
              <span>{auditData.csp.branch}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Last Audit Date:</span>
              <span>{auditData.csp.lastAudit}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Auditor:</span>
              <span>{authState.user?.name}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {formErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5">
              {formErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      {Object.entries(groupedQuestions).map(([category, questions]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
            <CardDescription>Please answer all required questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {questions.map((question) => (
              <div key={question.id} className="space-y-2 pb-4 border-b last:border-0">
                <div className="flex items-start">
                  <Label className="text-base">
                    {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                </div>
                
                {renderQuestionInput(question)}
                
                <div className="pt-2">
                  <Label htmlFor={`comment-${question.id}`} className="text-sm text-muted-foreground">
                    Additional Comments
                  </Label>
                  <Textarea
                    id={`comment-${question.id}`}
                    placeholder="Add any observations or comments..."
                    value={comments[question.id] || ''}
                    onChange={(e) => handleCommentChange(question.id, e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      
      <Card>
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
          <CardDescription>Upload photos as evidence for the audit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button type="button" onClick={capturePhoto}>
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
              
              <label htmlFor="photo-upload">
                <Button type="button" variant="outline" className="cursor-pointer" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </span>
                </Button>
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {photos.length === 0 
                  ? "No photos uploaded yet" 
                  : `${photos.length} photos uploaded`}
              </p>
              
              {photos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative w-16 h-16 border rounded overflow-hidden bg-muted flex items-center justify-center">
                      <FileCheck className="h-8 w-8 text-muted-foreground" />
                      <span className="absolute bottom-0 left-0 right-0 text-center text-xs bg-black bg-opacity-50 text-white">
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/auditor/tasks')}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Submit Audit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuditQuestionnaire;

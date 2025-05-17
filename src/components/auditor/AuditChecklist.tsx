import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Camera, MapPin, Upload, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ChecklistItem {
  id: string;
  category: string;
  question: string;
  required: boolean;
  isCritical: boolean;
  previouslyFlagged?: boolean;
}

interface CategoryGroup {
  name: string;
  items: ChecklistItem[];
}

// Mock data - in a real app this would come from an API
const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Documentation Category
  { 
    id: 'doc1', 
    category: 'documentation', 
    question: 'Does CSP have all required KYC documents?', 
    required: true,
    isCritical: true
  },
  { 
    id: 'doc2', 
    category: 'documentation', 
    question: 'Is cash register properly maintained?', 
    required: true,
    isCritical: false
  },
  { 
    id: 'doc3', 
    category: 'documentation', 
    question: 'Are transaction receipts properly filed?', 
    required: true,
    isCritical: false,
    previouslyFlagged: true
  },
  
  // Physical Premises
  { 
    id: 'prem1', 
    category: 'premises', 
    question: 'Is bank signage clearly displayed?', 
    required: true,
    isCritical: true
  },
  { 
    id: 'prem2', 
    category: 'premises', 
    question: 'Is the premises clean and well-maintained?', 
    required: true,
    isCritical: false
  },
  { 
    id: 'prem3', 
    category: 'premises', 
    question: 'Are banking hours displayed?', 
    required: true,
    isCritical: false
  },
  
  // Equipment
  { 
    id: 'equip1', 
    category: 'equipment', 
    question: 'Is biometric device working properly?', 
    required: true,
    isCritical: true
  },
  { 
    id: 'equip2', 
    category: 'equipment', 
    question: 'Is printer in good condition?', 
    required: true,
    isCritical: false
  },
  { 
    id: 'equip3', 
    category: 'equipment', 
    question: 'Is there sufficient stationery available?', 
    required: false,
    isCritical: false
  },
  
  // Security & Compliance
  { 
    id: 'sec1', 
    category: 'security', 
    question: 'Is cash properly secured?', 
    required: true,
    isCritical: true
  },
  { 
    id: 'sec2', 
    category: 'security', 
    question: 'Is the CSP following all AML guidelines?', 
    required: true,
    isCritical: true,
    previouslyFlagged: true
  },
  { 
    id: 'sec3', 
    category: 'security', 
    question: 'Are transaction limits being followed?', 
    required: true,
    isCritical: true
  }
];

const AuditChecklist: React.FC<{ cspId: string; visitId: string }> = ({ cspId, visitId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [cspInfo, setCspInfo] = useState({
    name: 'Rajesh Kumar',
    location: 'Chandpur Village, North District',
    id: 'CSP-2023-245'
  });
  
  const form = useForm({
    defaultValues: {
      answers: {} as Record<string, 'yes' | 'no' | 'na'>,
      comments: {} as Record<string, string>,
      photos: [] as File[],
      location: { latitude: 0, longitude: 0 }
    }
  });
  
  // Group checklist items by category
  useEffect(() => {
    const grouped = CHECKLIST_ITEMS.reduce((acc, item) => {
      const category = item.category;
      const existingGroup = acc.find(g => g.name === category);
      
      if (existingGroup) {
        existingGroup.items.push(item);
      } else {
        acc.push({ name: category, items: [item] });
      }
      
      return acc;
    }, [] as CategoryGroup[]);
    
    setCategoryGroups(grouped);
  }, []);
  
  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue('location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: 'Location Error',
            description: 'Unable to get your current location. Please enable location services.',
            variant: 'destructive'
          });
        }
      );
    }
  }, [form]);
  
  const handleCapturePicture = () => {
    // In a real app, this would open the camera
    toast({
      title: 'Camera',
      description: 'Camera functionality would be implemented here',
    });
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const currentPhotos = form.getValues('photos') || [];
    form.setValue('photos', [...currentPhotos, ...Array.from(files)]);
    
    toast({
      title: 'Files Uploaded',
      description: `${files.length} file(s) uploaded successfully`,
    });
  };
  
  const nextStep = () => {
    if (currentStep < categoryGroups.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const onSubmit = (data: any) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting checklist:', data);
      toast({
        title: 'Audit Submitted',
        description: 'Audit checklist has been submitted successfully',
      });
      setLoading(false);
      
      // Reset form and go back to first step
      form.reset();
      setCurrentStep(0);
    }, 1500);
  };
  
  // Render form steps
  const renderFormStep = () => {
    // If we're past the categories, show the summary and upload step
    if (currentStep >= categoryGroups.length) {
      return (
        <div className="space-y-6">
          <div className="rounded-md bg-muted p-4">
            <h3 className="mb-2 font-medium">Audit Summary</h3>
            <p className="text-sm text-muted-foreground">
              Please review your answers, add any additional comments, and upload photos before submitting.
            </p>
          </div>
          
          {/* Photo Upload */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Upload Photos</h3>
              <p className="text-sm text-muted-foreground">
                Upload at least 3 photos of the CSP premises and equipment.
              </p>
              
              <div className="mt-2 flex gap-2">
                <Button type="button" variant="outline" onClick={handleCapturePicture}>
                  <Camera className="mr-2 h-4 w-4" />
                  Capture Photo
                </Button>
                <label htmlFor="photo-upload">
                  <Button type="button" variant="outline" asChild>
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </span>
                  </Button>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium">
                  {form.getValues('photos')?.length || 0} photos uploaded
                </p>
              </div>
            </div>
            
            {/* Location */}
            <div>
              <h3 className="font-medium">Location Verification</h3>
              <div className="mt-2 flex items-center rounded-md bg-muted p-3">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                <p className="text-sm">
                  {form.getValues('location').latitude !== 0 
                    ? `Location captured: ${form.getValues('location').latitude.toFixed(6)}, ${form.getValues('location').longitude.toFixed(6)}` 
                    : 'Location not captured yet'}
                </p>
              </div>
            </div>
            
            {/* Final Comments */}
            <div>
              <h3 className="font-medium">Additional Comments</h3>
              <Textarea 
                placeholder="Add any additional observations or comments about this audit..."
                className="mt-2"
                {...form.register('finalComments')}
              />
            </div>
          </div>
        </div>
      );
    }
    
    // Otherwise show the current category questions
    const currentCategory = categoryGroups[currentStep];
    if (!currentCategory) return null;
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium capitalize">
          {currentCategory.name}
        </h3>
        
        {currentCategory.items.map((item) => (
          <Card key={item.id} className={item.previouslyFlagged ? 'border-amber-300' : ''}>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle className="text-base">
                  {item.question}
                </CardTitle>
                {item.isCritical && (
                  <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                    Critical
                  </span>
                )}
                {item.previouslyFlagged && (
                  <span className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                    Previously Flagged
                  </span>
                )}
              </div>
              {item.required && (
                <CardDescription>Required field</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name={`answers.${item.id}`}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="flex gap-6"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="na" />
                          </FormControl>
                          <FormLabel className="font-normal">N/A</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name={`comments.${item.id}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comments</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Add any comments or observations..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add details, especially if you selected 'No' or 'N/A'.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  return (
    <div className="container mx-auto max-w-3xl p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Audit Checklist</h2>
        <div className="mt-2 rounded-md bg-muted p-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm"><span className="font-medium">CSP:</span> {cspInfo.name}</p>
            <p className="text-sm"><span className="font-medium">ID:</span> {cspInfo.id}</p>
            <p className="text-sm"><span className="font-medium">Location:</span> {cspInfo.location}</p>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span>Progress</span>
            <span>{Math.min(100, Math.round((currentStep / (categoryGroups.length + 1)) * 100))}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div 
              className="h-2 bg-green-500" 
              style={{ width: `${Math.min(100, Math.round((currentStep / (categoryGroups.length + 1)) * 100))}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {renderFormStep()}
        
        <div className="mt-6 flex justify-between">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}
          {currentStep === 0 && <div></div>}
          
          {currentStep < categoryGroups.length ? (
            <Button type="button" onClick={nextStep}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Audit'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuditChecklist;

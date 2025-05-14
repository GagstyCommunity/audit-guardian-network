
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { 
  Save, 
  Send,
  Camera, 
  Upload, 
  Download, 
  Trash,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { AuditFormData } from '@/types/auditor.types';

const AuditForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const cspId = searchParams.get('csp') || 'CSP245';
  const [formData, setFormData] = useState<AuditFormData>({
    csp_id: cspId,
    auditor_id: 'AUD-001',
    audit_date: new Date().toISOString().split('T')[0],
    physical_premises_score: 0,
    equipment_score: 0,
    documentation_score: 0,
    customer_service_score: 0,
    overall_score: 0,
    findings: '',
    recommendations: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'unsaved' | 'saving' | 'saved'>('unsaved');
  
  // Calculate overall score whenever individual scores change
  useEffect(() => {
    const calculateOverallScore = () => {
      const { physical_premises_score, equipment_score, documentation_score, customer_service_score } = formData;
      const overallScore = (physical_premises_score + equipment_score + documentation_score + customer_service_score) / 4;
      return Math.round(overallScore * 10) / 10; // Round to 1 decimal place
    };
    
    setFormData(prev => ({
      ...prev,
      overall_score: calculateOverallScore()
    }));
  }, [formData.physical_premises_score, formData.equipment_score, formData.documentation_score, formData.customer_service_score]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSaveStatus('unsaved');
  };
  
  // Handle slider changes
  const handleSliderChange = (name: keyof AuditFormData, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value[0]
    }));
    setSaveStatus('unsaved');
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Audit form submitted",
        description: "Your audit form has been successfully submitted",
      });
      setLoading(false);
      setFormData(prev => ({
        ...prev,
        status: 'submitted'
      }));
    }, 1500);
  };
  
  // Save draft
  const handleSaveDraft = () => {
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Draft saved",
        description: "Your audit form has been saved as a draft",
      });
      setSaveStatus('saved');
    }, 1000);
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Audit Form</h1>
        <div className="flex items-center gap-2">
          {saveStatus === 'unsaved' && (
            <span className="text-sm text-yellow-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" /> Unsaved changes
            </span>
          )}
          {saveStatus === 'saving' && (
            <span className="text-sm text-blue-600 flex items-center">
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-blue-600 border-t-transparent mr-1"></div>
              Saving...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-sm text-green-600 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" /> Saved
            </span>
          )}
          <Button variant="outline" size="sm" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-1" /> Save Draft
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>CSP Basic Information</CardTitle>
            <CardDescription>Basic information about the CSP being audited</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="csp_id">CSP ID</Label>
                <Input id="csp_id" name="csp_id" value={formData.csp_id} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audit_date">Audit Date</Label>
                <Input id="audit_date" name="audit_date" type="date" value={formData.audit_date} onChange={handleInputChange} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Audit Ratings</CardTitle>
            <CardDescription>Rate the CSP on the following parameters (0-10)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="physical_premises_score">Physical Premises</Label>
                <span className="text-sm font-medium">{formData.physical_premises_score}/10</span>
              </div>
              <Slider 
                id="physical_premises_score" 
                min={0} 
                max={10} 
                step={0.5}
                value={[formData.physical_premises_score]} 
                onValueChange={(value) => handleSliderChange('physical_premises_score', value)} 
              />
              <p className="text-xs text-muted-foreground">Rate the physical infrastructure, space, cleanliness, and accessibility</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="equipment_score">Equipment</Label>
                <span className="text-sm font-medium">{formData.equipment_score}/10</span>
              </div>
              <Slider 
                id="equipment_score" 
                min={0} 
                max={10} 
                step={0.5}
                value={[formData.equipment_score]} 
                onValueChange={(value) => handleSliderChange('equipment_score', value)} 
              />
              <p className="text-xs text-muted-foreground">Rate the condition, maintenance and functionality of devices</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="documentation_score">Documentation</Label>
                <span className="text-sm font-medium">{formData.documentation_score}/10</span>
              </div>
              <Slider 
                id="documentation_score" 
                min={0} 
                max={10} 
                step={0.5}
                value={[formData.documentation_score]} 
                onValueChange={(value) => handleSliderChange('documentation_score', value)} 
              />
              <p className="text-xs text-muted-foreground">Rate the record keeping, completeness and organization of documents</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="customer_service_score">Customer Service</Label>
                <span className="text-sm font-medium">{formData.customer_service_score}/10</span>
              </div>
              <Slider 
                id="customer_service_score" 
                min={0} 
                max={10} 
                step={0.5}
                value={[formData.customer_service_score]} 
                onValueChange={(value) => handleSliderChange('customer_service_score', value)} 
              />
              <p className="text-xs text-muted-foreground">Rate the service quality, staff behavior and customer handling</p>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-sm font-medium">Overall Score</p>
                <p className="text-xs text-muted-foreground">Average of all ratings</p>
              </div>
              <div className={`text-2xl font-bold 
                ${formData.overall_score >= 7.5 ? 'text-green-600' : 
                  formData.overall_score >= 5 ? 'text-amber-600' : 'text-red-600'}`}>
                {formData.overall_score}/10
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Findings and Recommendations</CardTitle>
            <CardDescription>Provide detailed observations and suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="findings">Audit Findings</Label>
              <Textarea 
                id="findings" 
                name="findings" 
                placeholder="Enter your detailed observations..." 
                value={formData.findings}
                onChange={handleInputChange}
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recommendations">Recommendations</Label>
              <Textarea 
                id="recommendations" 
                name="recommendations" 
                placeholder="Enter your recommendations for improvement..." 
                value={formData.recommendations}
                onChange={handleInputChange}
                rows={5}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Evidence Attachments</CardTitle>
            <CardDescription>Upload photos and documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-dashed rounded-md text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 font-medium">Upload Documents</p>
                <p className="text-xs text-muted-foreground">Drag and drop files or click to browse</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Upload className="h-4 w-4 mr-1" /> Choose Files
                </Button>
                <div className="mt-4 text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, PDF (Max 10MB)
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Uploaded Files (0)</h4>
                <div className="bg-muted p-4 text-center rounded-md">
                  <p className="text-sm text-muted-foreground">No files uploaded yet</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Signature</CardTitle>
            <CardDescription>Auditor's signature to certify the report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md h-40 flex flex-col items-center justify-center">
              <p className="text-muted-foreground text-center">Sign here</p>
              <Button variant="outline" className="mt-4">
                <Camera className="h-4 w-4 mr-1" /> Capture Signature
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button type="button" variant="outline">Cancel</Button>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-1" /> Save Draft
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-1" /> Submit Audit
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuditForm;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, UserCheck, FileText, Briefcase, Landmark, CheckSquare } from 'lucide-react';
import { colorPalette } from '../../types/auth.types';

const BecomeCspPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: colorPalette.primaryPurple }}>Become a CSP Agent</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our network of trusted banking correspondents and earn while providing essential financial services to your community.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Benefits Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>Benefits of Becoming a CSP</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="rounded-full p-3 h-12 w-12 flex items-center justify-center" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                <Briefcase className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Steady Income Source</h3>
                <p className="text-gray-600">
                  Earn commission on every transaction processed through your service point. 
                  Top performers can earn up to ₹40,000 per month.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="rounded-full p-3 h-12 w-12 flex items-center justify-center" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                <UserCheck className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Community Leadership</h3>
                <p className="text-gray-600">
                  Become a respected financial service provider in your community and help people 
                  access banking services that would otherwise be unavailable.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="rounded-full p-3 h-12 w-12 flex items-center justify-center" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                <FileText className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Training & Support</h3>
                <p className="text-gray-600">
                  Receive comprehensive training, ongoing support, and all necessary equipment 
                  to run your CSP successfully.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="rounded-full p-3 h-12 w-12 flex items-center justify-center" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                <Landmark className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Bank Partnership</h3>
                <p className="text-gray-600">
                  Work directly with established financial institutions and build valuable 
                  professional relationships in the banking sector.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="rounded-full p-3 h-12 w-12 flex items-center justify-center" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                <CheckSquare className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Low Investment</h3>
                <p className="text-gray-600">
                  Start your CSP with minimal investment. Financial assistance and equipment 
                  subsidies available for qualified applicants.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-lg mb-4" style={{ color: colorPalette.primaryPurple }}>Eligibility Criteria</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-green-500" />
                <span>Minimum 10th pass education (12th preferred)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-green-500" />
                <span>Age between 21-45 years</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-green-500" />
                <span>Basic computer knowledge</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-green-500" />
                <span>Clean credit history</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-green-500" />
                <span>Suitable location for CSP setup</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Application Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle style={{ color: colorPalette.primaryPurple }}>CSP Application Form</CardTitle>
              <CardDescription>
                Fill out the form below to apply to become a CSP agent. Our team will review your application 
                and contact you within 3-5 business days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="education">Highest Education</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10th">10th Pass</SelectItem>
                        <SelectItem value="12th">12th Pass</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="postgraduate">Post Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Enter your age" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Proposed CSP Location</Label>
                  <div className="flex gap-2">
                    <Input id="location" placeholder="Enter area/locality" />
                    <Button
                      type="button" 
                      variant="outline"
                      className="flex-shrink-0"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Map
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City/Town/Village</Label>
                    <Input id="city" placeholder="Enter city/town/village" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="andhra">Andhra Pradesh</SelectItem>
                        <SelectItem value="bihar">Bihar</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="tamil">Tamil Nadu</SelectItem>
                        <SelectItem value="west">West Bengal</SelectItem>
                        {/* Add more states as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Relevant Experience</Label>
                  <Textarea id="experience" placeholder="Tell us about any relevant experience you have in banking, finance, retail, or customer service..." />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  style={{ backgroundColor: colorPalette.primaryPurple, color: 'white' }}
                >
                  Submit Application
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                  Your information will be verified as part of the application process.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeCspPage;

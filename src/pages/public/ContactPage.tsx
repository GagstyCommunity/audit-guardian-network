
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MessageSquare, HelpCircle, MapPin } from 'lucide-react';
import { colorPalette } from '../../types/auth.types';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: colorPalette.primaryPurple }}>Contact/Helpline</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get in touch with our support team through multiple channels for assistance with CSP services.
        </p>
      </div>
      
      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full p-3" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                <Phone className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Phone Support</h3>
            <p className="text-gray-500 mb-4">
              Our phone support is available 24/7 for urgent assistance
            </p>
            <div className="space-y-2">
              <p className="font-medium">Toll-Free Number:</p>
              <p className="text-lg" style={{ color: colorPalette.primaryPurple }}>1800-123-4567</p>
              <p className="text-sm text-gray-500">
                (24/7 Support in Hindi, English, Tamil, Telugu, Bengali)
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full p-3" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                <MessageSquare className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">WhatsApp Helpline</h3>
            <p className="text-gray-500 mb-4">
              Quick responses through our WhatsApp business account
            </p>
            <div className="space-y-2">
              <p className="font-medium">WhatsApp Number:</p>
              <p className="text-lg" style={{ color: colorPalette.primaryPurple }}>+91 9876543210</p>
              <p className="text-sm text-gray-500">
                (Available 8 AM to 10 PM, Quick Responses)
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full p-3" style={{ backgroundColor: `${colorPalette.primaryPurple}20` }}>
                <Mail className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">Email Support</h3>
            <p className="text-gray-500 mb-4">
              Send us detailed queries via email for thorough assistance
            </p>
            <div className="space-y-2">
              <p className="font-medium">Support Email:</p>
              <p className="text-lg" style={{ color: colorPalette.primaryPurple }}>support@cspmanagement.com</p>
              <p className="text-sm text-gray-500">
                (Response within 24-48 hours)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Contact Form & Regional Offices */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>Send Us a Message</h2>
          <Card>
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="Enter subject" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Enter your message here..." rows={4} />
                </div>
                
                <Button
                  type="submit"
                  className="text-white w-full"
                  style={{ backgroundColor: colorPalette.primaryPurple }}
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Regional Offices */}
        <div>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: colorPalette.primaryPurple }}>Regional Offices</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-5 w-5" style={{ color: colorPalette.accentGreen }} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">North Region - Delhi</h3>
                    <p className="text-sm text-gray-500">
                      123 Banking Tower, Connaught Place, New Delhi - 110001<br />
                      Phone: 011-98765432<br />
                      Email: north@cspmanagement.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-5 w-5" style={{ color: colorPalette.accentGreen }} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">South Region - Chennai</h3>
                    <p className="text-sm text-gray-500">
                      456 Finance Street, Anna Nagar, Chennai - 600040<br />
                      Phone: 044-12345678<br />
                      Email: south@cspmanagement.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-5 w-5" style={{ color: colorPalette.accentGreen }} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">East Region - Kolkata</h3>
                    <p className="text-sm text-gray-500">
                      789 Banking Road, Salt Lake, Kolkata - 700091<br />
                      Phone: 033-45678901<br />
                      Email: east@cspmanagement.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-5 w-5" style={{ color: colorPalette.accentGreen }} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">West Region - Mumbai</h3>
                    <p className="text-sm text-gray-500">
                      101 Financial Center, Bandra Kurla Complex, Mumbai - 400051<br />
                      Phone: 022-56789012<br />
                      Email: west@cspmanagement.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-5 w-5" style={{ color: colorPalette.accentGreen }} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Central Region - Bhopal</h3>
                    <p className="text-sm text-gray-500">
                      202 CSP Tower, MP Nagar, Bhopal - 462011<br />
                      Phone: 0755-67890123<br />
                      Email: central@cspmanagement.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5" style={{ color: colorPalette.primaryPurple }} />
              <h3 className="text-lg font-medium" style={{ color: colorPalette.primaryPurple }}>Frequently Asked Support Questions</h3>
            </div>
            <div className="space-y-3">
              <details className="group rounded-lg border border-gray-200">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
                  <span className="font-medium">What's the best way to report an urgent issue with a CSP agent?</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 py-3 text-sm text-gray-600">
                  For urgent issues, please call our toll-free number (1800-123-4567) or use the WhatsApp helpline. These channels provide the fastest response times.
                </div>
              </details>
              
              <details className="group rounded-lg border border-gray-200">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
                  <span className="font-medium">How long does it take to resolve a complaint?</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 py-3 text-sm text-gray-600">
                  Most complaints are resolved within 48-72 hours. Complex issues may take up to 7 working days. You'll receive regular updates on the status of your complaint.
                </div>
              </details>
              
              <details className="group rounded-lg border border-gray-200">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
                  <span className="font-medium">How do I apply to become a CSP agent?</span>
                  <span className="transition group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 py-3 text-sm text-gray-600">
                  Visit our "Become a CSP" page to apply online. Alternatively, you can contact your nearest regional office for application assistance.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

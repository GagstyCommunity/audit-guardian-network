
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  FileText,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  User,
  Smartphone
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { RedZoneProtocol as RedZoneProtocolType } from '@/types/auditor.types';

const RedZoneProtocol: React.FC = () => {
  const [acknowledged, setAcknowledged] = useState(false);
  
  const protocolData: RedZoneProtocolType[] = [
    {
      id: "protocol-1",
      title: "General Red Zone Protocol",
      description: "Standard procedures for conducting audits in designated red zones with elevated security risks.",
      steps: [
        {
          id: "step-1",
          step: 1,
          instruction: "Always inform your supervisor before entering a red zone area.",
          critical: true
        },
        {
          id: "step-2",
          step: 2,
          instruction: "Ensure your GPS tracking is enabled on your official device.",
          critical: true
        },
        {
          id: "step-3",
          step: 3,
          instruction: "Travel only during daylight hours (8:00 AM - 4:00 PM).",
          critical: true
        },
        {
          id: "step-4",
          step: 4,
          instruction: "Maintain regular check-ins every 30 minutes while in the red zone.",
          critical: true
        },
        {
          id: "step-5",
          step: 5,
          instruction: "Use the dedicated emergency app on your device if you feel unsafe.",
          critical: true
        },
        {
          id: "step-6",
          step: 6,
          instruction: "Dress modestly and avoid displaying expensive items or equipment.",
          critical: false
        },
        {
          id: "step-7",
          step: 7,
          instruction: "Carry minimum cash and use digital transaction methods where possible.",
          critical: false
        },
        {
          id: "step-8",
          step: 8,
          instruction: "Always have your official ID card visible.",
          critical: true
        },
        {
          id: "step-9",
          step: 9,
          instruction: "If threatened, comply and prioritize your safety over equipment or documentation.",
          critical: true
        },
        {
          id: "step-10",
          step: 10,
          instruction: "Report any security incidents immediately, no matter how minor.",
          critical: true
        }
      ],
      emergency_contacts: [
        {
          name: "Emergency Response Team",
          role: "Security",
          phone: "1800-123-4567"
        },
        {
          name: "Rajesh Kumar",
          role: "Regional Security Head",
          phone: "9876543210"
        },
        {
          name: "Local Police Station",
          role: "Law Enforcement",
          phone: "100"
        }
      ],
      last_updated: "2025-04-15"
    },
    {
      id: "protocol-2",
      title: "Military Movement Area Protocol",
      description: "Special procedures for areas with active military operations or sensitive installations.",
      steps: [
        {
          id: "mil-step-1",
          step: 1,
          instruction: "Obtain special permit from district authority before visiting.",
          critical: true
        },
        {
          id: "mil-step-2",
          step: 2,
          instruction: "Coordinate with local military liaison officer.",
          critical: true
        },
        {
          id: "mil-step-3",
          step: 3,
          instruction: "Do not take photographs of any military installations or checkpoints.",
          critical: true
        },
        {
          id: "mil-step-4",
          step: 4,
          instruction: "Carry all required identification documents.",
          critical: true
        },
        {
          id: "mil-step-5",
          step: 5,
          instruction: "Follow all instructions from military personnel immediately and without question.",
          critical: true
        }
      ],
      emergency_contacts: [
        {
          name: "Military Coordination Office",
          role: "Liaison",
          phone: "1800-789-0123"
        },
        {
          name: "Col. Vikram Singh",
          role: "Military Liaison Officer",
          phone: "9876543211"
        }
      ],
      last_updated: "2025-04-02"
    },
    {
      id: "protocol-3",
      title: "Natural Disaster Risk Zone Protocol",
      description: "Procedures for areas prone to flooding, landslides, or other natural hazards.",
      steps: [
        {
          id: "nat-step-1",
          step: 1,
          instruction: "Check weather forecast and disaster alerts before travel.",
          critical: true
        },
        {
          id: "nat-step-2",
          step: 2,
          instruction: "Avoid travel during adverse weather conditions.",
          critical: true
        },
        {
          id: "nat-step-3",
          step: 3,
          instruction: "Carry emergency supplies (water, first aid kit, emergency rations).",
          critical: false
        },
        {
          id: "nat-step-4",
          step: 4,
          instruction: "Know evacuation routes from the area.",
          critical: true
        },
        {
          id: "nat-step-5",
          step: 5,
          instruction: "Register with local disaster management office upon arrival.",
          critical: true
        }
      ],
      emergency_contacts: [
        {
          name: "Disaster Management Cell",
          role: "Emergency Services",
          phone: "1800-567-8901"
        },
        {
          name: "Meera Patel",
          role: "Regional Disaster Coordinator",
          phone: "9876543212"
        }
      ],
      last_updated: "2025-03-20"
    }
  ];
  
  const handleAcknowledge = () => {
    setAcknowledged(true);
    toast({
      title: "Protocol Acknowledged",
      description: "You have acknowledged the red zone protocols",
    });
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Red Zone Protocol</h1>
        <Badge className="bg-red-100 text-red-800">Critical</Badge>
      </div>
      
      <Alert className="border-red-500 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <AlertTitle className="text-red-800 font-bold">WARNING: RED ZONE SAFETY PROTOCOL</AlertTitle>
        <AlertDescription className="text-red-700">
          You are scheduled to visit areas designated as RED ZONES. These areas have elevated security risks.
          Please review and acknowledge the safety protocols before proceeding with your visit.
        </AlertDescription>
      </Alert>
      
      <Card>
        <CardHeader className="bg-red-50 border-b border-red-100">
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-red-600" />
            Red Zone Definition
          </CardTitle>
          <CardDescription>Understanding what makes an area a designated red zone</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <p>
              A <strong className="text-red-600">Red Zone</strong> is an area that meets one or more of the following criteria:
            </p>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p><strong>Security Concern:</strong> Areas with history of criminal activity, civil unrest, or violence.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p><strong>Military Movement:</strong> Areas with active military operations or sensitive installations.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p><strong>Natural Disaster Risk:</strong> Regions prone to flooding, landslides, or other natural hazards.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p><strong>Health Hazards:</strong> Areas with ongoing health concerns or outbreaks.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <p><strong>Infrastructure Limitations:</strong> Locations with severely limited communication, transportation, or emergency services.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {protocolData.map((protocol) => (
        <Card key={protocol.id}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-red-600" />
              {protocol.title}
            </CardTitle>
            <CardDescription>{protocol.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Required Steps</h3>
              <div className="space-y-2">
                {protocol.steps.map((step) => (
                  <div key={step.id} className="flex items-start p-3 rounded-md border border-gray-200 gap-3">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full 
                      ${step.critical ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <p>{step.instruction}</p>
                      {step.critical && (
                        <Badge className="bg-red-100 text-red-800 mt-1">Critical</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {protocol.emergency_contacts.map((contact, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-sm text-muted-foreground">{contact.role}</p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {contact.phone}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date(protocol.last_updated).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Safety Equipment</CardTitle>
          <CardDescription>Mandatory equipment for red zone visits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-md border">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Smartphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Emergency Beacon Device</p>
                <p className="text-sm text-muted-foreground">GPS-enabled panic button device</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-md border">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Official ID Card</p>
                <p className="text-sm text-muted-foreground">Must be worn visibly at all times</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-md border">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Satellite Phone</p>
                <p className="text-sm text-muted-foreground">For areas with poor cellular network</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-md border">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Company Uniform</p>
                <p className="text-sm text-muted-foreground">To identify you as an authorized official</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Training Requirements</CardTitle>
          <CardDescription>Required training for red zone visits</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Personal Safety Training</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>This 2-day course covers essential safety protocols, threat assessment, and personal protection techniques.</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    <span className="text-muted-foreground">Last completed: April 12, 2025</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Emergency First Aid</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Basic first aid techniques for emergency situations until professional help arrives.</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    <span className="text-muted-foreground">Last completed: March 25, 2025</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Hostage Situation Response</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Training on how to respond during a hostage or high-risk security situation.</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="bg-yellow-100 text-yellow-800">Required</Badge>
                    <span className="text-muted-foreground">Not yet completed</span>
                  </div>
                  <Button size="sm" variant="outline">Schedule Training</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Cultural Sensitivity</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Understanding local customs, traditions, and sensitive topics to avoid in different regions.</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    <span className="text-muted-foreground">Last completed: February 10, 2025</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card className="border-red-200">
        <CardHeader className="bg-red-50 border-b border-red-100">
          <CardTitle className="text-red-800">Acknowledgement Required</CardTitle>
          <CardDescription>You must acknowledge that you understand these protocols</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">
            By clicking "I Acknowledge" below, you confirm that you have read and understood all the safety protocols
            for operating in designated red zones. You agree to follow these procedures during your visits.
          </p>
          <Button 
            onClick={handleAcknowledge} 
            className="w-full"
            disabled={acknowledged}
          >
            {acknowledged ? (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Protocols Acknowledged
              </div>
            ) : (
              'I Acknowledge These Protocols'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedZoneProtocol;

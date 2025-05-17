
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock,
  Package,
  CheckCircle,
  XCircle,
  FileText,
  AlertCircle,
  Printer,
  Smartphone,
  Fingerprint,
  Monitor,
  Truck,
  ShoppingCart
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

interface Gadget {
  id: string;
  name: string;
  description: string;
  category: 'biometric' | 'printer' | 'signage' | 'tablet' | 'other';
  availability: 'in-stock' | 'limited' | 'out-of-stock';
  imageUrl?: string;
  deliveryTime: string;
  isReplacement?: boolean;
}

interface GadgetRequest {
  id: string;
  gadgetId: string;
  gadgetName: string;
  requestType: 'new' | 'replacement';
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'rejected';
  requestedOn: string;
  updatedOn?: string;
  reason?: string;
  rejectionReason?: string;
  trackingNumber?: string;
}

const MOCK_GADGETS: Gadget[] = [
  {
    id: 'bio1',
    name: 'Morpho MSO 1300 E3 Biometric Scanner',
    description: 'Latest UIDAI-approved biometric fingerprint scanner for Aadhaar authentication.',
    category: 'biometric',
    availability: 'in-stock',
    imageUrl: '/assets/devices/biometric.png',
    deliveryTime: '3-5 business days',
  },
  {
    id: 'print1',
    name: 'Bluetooth Thermal Receipt Printer',
    description: 'Portable thermal printer for transaction receipts with multi-device connectivity.',
    category: 'printer',
    availability: 'limited',
    imageUrl: '/assets/devices/printer.png',
    deliveryTime: '5-7 business days',
  },
  {
    id: 'sign1',
    name: 'CSP Branding Kit (Large)',
    description: 'Complete branding package including flex banner, table display, and identity cards.',
    category: 'signage',
    availability: 'in-stock',
    imageUrl: '/assets/devices/signage.png',
    deliveryTime: '7-10 business days',
  },
  {
    id: 'tab1',
    name: 'Android Tablet with CSP App',
    description: 'Pre-configured 10-inch tablet with all CSP applications installed.',
    category: 'tablet',
    availability: 'out-of-stock',
    imageUrl: '/assets/devices/tablet.png',
    deliveryTime: 'Currently unavailable',
  },
  {
    id: 'bio2',
    name: 'Morpho RD Service - Replacement',
    description: 'Replacement RD service for existing biometric devices with issues.',
    category: 'biometric',
    availability: 'in-stock',
    imageUrl: '/assets/devices/biometric-service.png',
    deliveryTime: '2-3 business days',
    isReplacement: true,
  },
  {
    id: 'print2',
    name: 'Printer Paper Rolls (50 pack)',
    description: 'Thermal paper rolls compatible with all CSP printers.',
    category: 'printer',
    availability: 'in-stock',
    imageUrl: '/assets/devices/paper-rolls.png',
    deliveryTime: '3-5 business days',
  },
];

const MOCK_REQUESTS: GadgetRequest[] = [
  {
    id: 'req1',
    gadgetId: 'bio1',
    gadgetName: 'Morpho MSO 1300 E3 Biometric Scanner',
    requestType: 'new',
    status: 'approved',
    requestedOn: '2023-04-15T10:30:00',
    updatedOn: '2023-04-16T14:20:00',
    reason: 'Initial setup for new CSP center',
  },
  {
    id: 'req2',
    gadgetId: 'print1',
    gadgetName: 'Bluetooth Thermal Receipt Printer',
    requestType: 'replacement',
    status: 'shipped',
    requestedOn: '2023-04-25T09:15:00',
    updatedOn: '2023-04-26T11:45:00',
    reason: 'Current printer has paper feed issues',
    trackingNumber: 'SHIP123456789',
  },
  {
    id: 'req3',
    gadgetId: 'sign1',
    gadgetName: 'CSP Branding Kit (Large)',
    requestType: 'new',
    status: 'pending',
    requestedOn: '2023-05-02T15:20:00',
    reason: 'Need new branding materials for shop renovation',
  },
  {
    id: 'req4',
    gadgetId: 'print2',
    gadgetName: 'Printer Paper Rolls (50 pack)',
    requestType: 'new',
    status: 'rejected',
    requestedOn: '2023-04-10T08:45:00',
    updatedOn: '2023-04-11T16:30:00',
    reason: 'Running low on supplies',
    rejectionReason: 'Recent supply was delivered less than 30 days ago',
  },
];

const GadgetCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedGadget, setSelectedGadget] = useState<Gadget | null>(null);
  const [gadgets] = useState<Gadget[]>(MOCK_GADGETS);
  const [requests, setRequests] = useState<GadgetRequest[]>(MOCK_REQUESTS);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  
  const form = useForm({
    defaultValues: {
      requestType: 'new',
      reason: '',
    },
  });
  
  const onSubmit = (data: any) => {
    if (!selectedGadget) return;
    
    // Create new request
    const newRequest: GadgetRequest = {
      id: `req${requests.length + 1}`,
      gadgetId: selectedGadget.id,
      gadgetName: selectedGadget.name,
      requestType: data.requestType as 'new' | 'replacement',
      status: 'pending',
      requestedOn: new Date().toISOString(),
      reason: data.reason,
    };
    
    setRequests([...requests, newRequest]);
    setRequestDialogOpen(false);
    form.reset();
    
    toast({
      title: 'Request Submitted',
      description: `Your request for ${selectedGadget.name} has been submitted.`,
    });
  };
  
  const handleRequestClick = (gadget: Gadget) => {
    setSelectedGadget(gadget);
    form.reset({
      requestType: gadget.isReplacement ? 'replacement' : 'new',
      reason: '',
    });
    setRequestDialogOpen(true);
  };
  
  const getStatusBadge = (status: GadgetRequest['status']) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-700">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700">
            <CheckCircle className="h-3 w-3" />
            Approved
          </Badge>
        );
      case 'shipped':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-indigo-50 text-indigo-700">
            <Truck className="h-3 w-3" />
            Shipped
          </Badge>
        );
      case 'delivered':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700">
            <Package className="h-3 w-3" />
            Delivered
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const getCategoryIcon = (category: Gadget['category']) => {
    switch (category) {
      case 'biometric':
        return <Fingerprint className="h-5 w-5 text-purple-500" />;
      case 'printer':
        return <Printer className="h-5 w-5 text-blue-500" />;
      case 'signage':
        return <FileText className="h-5 w-5 text-amber-500" />;
      case 'tablet':
        return <Monitor className="h-5 w-5 text-green-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getAvailabilityBadge = (availability: Gadget['availability']) => {
    switch (availability) {
      case 'in-stock':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            In Stock
          </Badge>
        );
      case 'limited':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700">
            Limited Stock
          </Badge>
        );
      case 'out-of-stock':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            Out of Stock
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gadget Center</h1>
        <p className="text-muted-foreground">
          Request and manage your CSP equipment and supplies
        </p>
      </div>
      
      <Tabs defaultValue="catalog" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="catalog">
            <Package className="mr-2 h-4 w-4" />
            Gadget Catalog
          </TabsTrigger>
          <TabsTrigger value="requests">
            <ShoppingCart className="mr-2 h-4 w-4" />
            My Requests
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="catalog" className="space-y-6">
          {/* Categories filter would go here in a full implementation */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gadgets.map((gadget) => (
              <Card key={gadget.id} className="overflow-hidden">
                <div className="bg-muted p-6">
                  <div className="flex h-32 items-center justify-center">
                    {gadget.imageUrl ? (
                      <img 
                        src={gadget.imageUrl} 
                        alt={gadget.name}
                        className="max-h-32 w-auto object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-100">
                        {getCategoryIcon(gadget.category)}
                        <span className="ml-2 text-sm text-gray-500">No image</span>
                      </div>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      {getCategoryIcon(gadget.category)}
                      <CardTitle className="ml-2 text-base">{gadget.name}</CardTitle>
                    </div>
                    {getAvailabilityBadge(gadget.availability)}
                  </div>
                  <CardDescription>{gadget.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {gadget.deliveryTime}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    disabled={gadget.availability === 'out-of-stock'}
                    onClick={() => handleRequestClick(gadget)}
                  >
                    {gadget.isReplacement ? 'Request Replacement' : 'Request Item'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Need something else?</CardTitle>
              <CardDescription>
                Contact IT support if you need equipment not listed here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Email: it-support@csp-portal.com</span>
                </div>
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Phone: 1800-123-4567</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests" className="space-y-6">
          {requests.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed">
              <Package className="h-10 w-10 text-muted-foreground opacity-40" />
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't made any requests yet
              </p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={() => setActiveTab('catalog')}
              >
                Browse Gadget Catalog
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{request.gadgetName}</CardTitle>
                        <CardDescription>
                          {request.requestType === 'replacement' ? 'Replacement Request' : 'New Item Request'}
                        </CardDescription>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Request Date:</span>
                        <span>{formatDate(request.requestedOn)}</span>
                      </div>
                      
                      {request.updatedOn && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Updated:</span>
                          <span>{formatDate(request.updatedOn)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reason:</span>
                        <span>{request.reason}</span>
                      </div>
                      
                      {request.status === 'rejected' && request.rejectionReason && (
                        <div className="mt-2 rounded-md bg-red-50 p-2 text-red-700">
                          <strong className="font-medium">Rejection Reason:</strong> {request.rejectionReason}
                        </div>
                      )}
                      
                      {request.status === 'shipped' && request.trackingNumber && (
                        <div className="mt-2 rounded-md bg-blue-50 p-2 text-blue-700">
                          <strong className="font-medium">Tracking Number:</strong> {request.trackingNumber}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  {request.status === 'pending' && (
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => {
                          // Handle cancellation in a real app
                          toast({
                            title: 'Request Cancelled',
                            description: 'Your request has been cancelled.',
                          });
                          setRequests(requests.filter(r => r.id !== request.id));
                        }}
                      >
                        Cancel Request
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Request Dialog */}
      <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Gadget</DialogTitle>
            <DialogDescription>
              {selectedGadget?.name}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="requestType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Request Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="new" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            New Item
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem 
                              value="replacement" 
                              disabled={selectedGadget?.isReplacement === false}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Replacement (for faulty item)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Request</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please explain why you need this item..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide details to help IT team evaluate your request.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GadgetCenter;

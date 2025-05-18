
import React, { useState } from 'react';
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
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  PlusCircle, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Router, 
  Printer, 
  Edit, 
  Trash2,
  Check,
  X,
  Info
} from 'lucide-react';
import { format, addMonths, isAfter } from 'date-fns';
import { StatsCard } from '@/components/shared/StatsCard';
import { Progress } from '@/components/ui/progress';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type DeviceType = 'smartphone' | 'tablet' | 'laptop' | 'router' | 'printer' | 'biometric' | 'pos';
type DeviceStatus = 'active' | 'maintenance' | 'decommissioned' | 'pending' | 'lost';

interface Device {
  id: string;
  name: string;
  type: DeviceType;
  serialNumber: string;
  assignedTo: string;
  location: string;
  purchaseDate: Date;
  warrantyEnd: Date;
  status: DeviceStatus;
  lastUpdated: Date;
  lastMaintenance?: Date;
  notes?: string;
}

const mockDevices: Device[] = [
  {
    id: 'DEV-001',
    name: 'Samsung Galaxy S21',
    type: 'smartphone',
    serialNumber: 'SG21-4567-ABCD',
    assignedTo: 'Rajesh Kumar (CSP Agent)',
    location: 'North District, Chandpur',
    purchaseDate: new Date('2023-04-10'),
    warrantyEnd: new Date('2025-04-10'),
    status: 'active',
    lastUpdated: new Date('2024-04-15'),
    lastMaintenance: new Date('2024-03-22'),
    notes: 'Device is working well, battery replacement may be needed in 6 months'
  },
  {
    id: 'DEV-002',
    name: 'HP ProBook 450',
    type: 'laptop',
    serialNumber: 'HP450-7890-EFGH',
    assignedTo: 'Priya Sharma (HR)',
    location: 'Delhi, Central Office',
    purchaseDate: new Date('2023-02-15'),
    warrantyEnd: new Date('2025-02-15'),
    status: 'active',
    lastUpdated: new Date('2024-05-01'),
    lastMaintenance: new Date('2024-04-20'),
  },
  {
    id: 'DEV-003',
    name: 'Morpho Biometric Device',
    type: 'biometric',
    serialNumber: 'MRPH-2467-IJKL',
    assignedTo: 'Ankit Patel (CSP Agent)',
    location: 'East District, Sundarpur',
    purchaseDate: new Date('2022-11-05'),
    warrantyEnd: new Date('2024-11-05'),
    status: 'maintenance',
    lastUpdated: new Date('2024-05-12'),
    lastMaintenance: new Date('2024-05-12'),
    notes: 'Device sensor needs calibration, scheduled for repair'
  },
  {
    id: 'DEV-004',
    name: 'iPad Pro 12.9',
    type: 'tablet',
    serialNumber: 'IPD-5678-MNOP',
    assignedTo: 'Vikram Singh (Field Auditor)',
    location: 'Mobile (Field Team)',
    purchaseDate: new Date('2023-06-20'),
    warrantyEnd: new Date('2025-06-20'),
    status: 'active',
    lastUpdated: new Date('2024-04-30'),
  },
  {
    id: 'DEV-005',
    name: 'Cisco Router 4321',
    type: 'router',
    serialNumber: 'CSC-9012-QRST',
    assignedTo: 'Central Office Network',
    location: 'Delhi, Server Room',
    purchaseDate: new Date('2022-05-15'),
    warrantyEnd: new Date('2024-05-15'),
    status: 'active',
    lastUpdated: new Date('2024-04-25'),
    lastMaintenance: new Date('2024-03-10'),
    notes: 'Firmware updated to version 15.7(3)M8'
  },
  {
    id: 'DEV-006',
    name: 'Dell Latitude 7420',
    type: 'laptop',
    serialNumber: 'DL74-3456-UVWX',
    assignedTo: 'Deepa Reddy (Compliance)',
    location: 'Delhi, Central Office',
    purchaseDate: new Date('2023-01-10'),
    warrantyEnd: new Date('2025-01-10'),
    status: 'active',
    lastUpdated: new Date('2024-04-10'),
  },
  {
    id: 'DEV-007',
    name: 'Ingenico POS Terminal',
    type: 'pos',
    serialNumber: 'ING-7890-YZAB',
    assignedTo: 'Meera Desai (CSP Agent)',
    location: 'West District, Shivpura',
    purchaseDate: new Date('2022-09-05'),
    warrantyEnd: new Date('2024-09-05'),
    status: 'decommissioned',
    lastUpdated: new Date('2024-02-15'),
    lastMaintenance: new Date('2024-01-30'),
    notes: 'Device has multiple hardware failures, replaced with DEV-012'
  },
  {
    id: 'DEV-008',
    name: 'HP Color LaserJet Pro',
    type: 'printer',
    serialNumber: 'HPCL-2345-CDEF',
    assignedTo: 'Admin Department',
    location: 'Delhi, Central Office',
    purchaseDate: new Date('2023-03-25'),
    warrantyEnd: new Date('2025-03-25'),
    status: 'active',
    lastUpdated: new Date('2024-04-18'),
    lastMaintenance: new Date('2024-04-18'),
    notes: 'Toner replaced and calibrated'
  },
  {
    id: 'DEV-009',
    name: 'iPhone 13 Pro',
    type: 'smartphone',
    serialNumber: 'IPH13-6789-GHIJ',
    assignedTo: 'Rahul Khanna (Admin)',
    location: 'Delhi, Central Office',
    purchaseDate: new Date('2023-05-30'),
    warrantyEnd: new Date('2025-05-30'),
    status: 'active',
    lastUpdated: new Date('2024-05-01'),
  },
  {
    id: 'DEV-010',
    name: 'Morpho Biometric Device',
    type: 'biometric',
    serialNumber: 'MRPH-0123-KLMN',
    assignedTo: 'Neha Gupta (CSP Agent)',
    location: 'Central District, Gopalnagar',
    purchaseDate: new Date('2023-08-10'),
    warrantyEnd: new Date('2025-08-10'),
    status: 'pending',
    lastUpdated: new Date('2024-05-15'),
    notes: 'New device, awaiting deployment'
  },
  {
    id: 'DEV-011',
    name: 'Samsung Galaxy A52',
    type: 'smartphone',
    serialNumber: 'SGA52-4567-OPQR',
    assignedTo: 'Unassigned',
    location: 'IT Storage, Delhi',
    purchaseDate: new Date('2023-07-15'),
    warrantyEnd: new Date('2025-07-15'),
    status: 'pending',
    lastUpdated: new Date('2024-05-10'),
  },
  {
    id: 'DEV-012',
    name: 'Ingenico Move/5000',
    type: 'pos',
    serialNumber: 'ING-8901-STUV',
    assignedTo: 'Meera Desai (CSP Agent)',
    location: 'West District, Shivpura',
    purchaseDate: new Date('2024-01-20'),
    warrantyEnd: new Date('2026-01-20'),
    status: 'active',
    lastUpdated: new Date('2024-02-15'),
    notes: 'Replacement for DEV-007'
  },
  {
    id: 'DEV-013',
    name: 'Samsung Galaxy Tab S7',
    type: 'tablet',
    serialNumber: 'SGT7-2345-WXYZ',
    assignedTo: 'Sanjay Verma (Bank Officer)',
    location: 'South District, Bank Branch',
    purchaseDate: new Date('2023-04-05'),
    warrantyEnd: new Date('2025-04-05'),
    status: 'lost',
    lastUpdated: new Date('2024-03-20'),
    notes: 'Reported missing on 2024-03-20, police report filed'
  }
];

const DeviceInventory: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const filteredDevices = devices.filter(device => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Device counts by status
  const activeDevices = devices.filter(d => d.status === 'active').length;
  const maintenanceDevices = devices.filter(d => d.status === 'maintenance').length;
  const pendingDevices = devices.filter(d => d.status === 'pending').length;
  const decommissionedDevices = devices.filter(d => d.status === 'decommissioned').length;
  
  // Devices by type
  const deviceTypes = {
    smartphone: devices.filter(d => d.type === 'smartphone').length,
    tablet: devices.filter(d => d.type === 'tablet').length,
    laptop: devices.filter(d => d.type === 'laptop').length,
    biometric: devices.filter(d => d.type === 'biometric').length,
    pos: devices.filter(d => d.type === 'pos').length,
    router: devices.filter(d => d.type === 'router').length,
    printer: devices.filter(d => d.type === 'printer').length,
  };
  
  // Warranty expiry counts
  const now = new Date();
  const expiringIn30Days = devices.filter(d => {
    const thirtyDaysFromNow = addMonths(now, 1);
    return isAfter(thirtyDaysFromNow, d.warrantyEnd) && isAfter(d.warrantyEnd, now);
  }).length;
  
  const expiredWarranty = devices.filter(d => isAfter(now, d.warrantyEnd)).length;
  
  const handleDeviceDelete = (id: string) => {
    const updatedDevices = devices.filter(device => device.id !== id);
    setDevices(updatedDevices);
    setDeleteDialogOpen(false);
    setSelectedDevice(null);
    
    toast({
      title: "Device Removed",
      description: "Device has been removed from inventory",
    });
  };
  
  const getDeviceTypeIcon = (type: DeviceType) => {
    switch (type) {
      case 'smartphone': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      case 'laptop': return <Laptop className="h-4 w-4" />;
      case 'router': return <Router className="h-4 w-4" />;
      case 'printer': return <Printer className="h-4 w-4" />;
      case 'biometric': return <Smartphone className="h-4 w-4" />;
      case 'pos': return <Laptop className="h-4 w-4" />;
      default: return <Smartphone className="h-4 w-4" />;
    }
  };
  
  const handleUpdateStatus = (id: string, newStatus: DeviceStatus) => {
    const updatedDevices = devices.map(device => 
      device.id === id
        ? { ...device, status: newStatus, lastUpdated: new Date() }
        : device
    );
    
    setDevices(updatedDevices);
    
    toast({
      title: "Status Updated",
      description: `Device status has been changed to ${newStatus.replace('_', ' ')}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Device Inventory</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Devices"
          value={`${activeDevices}`}
          description="Currently deployed"
          icon={Check}
          isLoading={false}
        />
        <StatsCard
          title="Maintenance"
          value={`${maintenanceDevices}`}
          description="Under repair or service"
          icon={Info}
          isLoading={false}
        />
        <StatsCard
          title="Pending Deployment"
          value={`${pendingDevices}`}
          description="Ready for assignment"
          icon={PlusCircle}
          isLoading={false}
        />
        <StatsCard
          title="Expiring Warranty"
          value={`${expiringIn30Days}`}
          description="Within 30 days"
          icon={Info}
          isLoading={false}
          trend={{
            value: expiredWarranty,
            isPositive: false,
            label: 'Already expired'
          }}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Device Distribution</CardTitle>
          <CardDescription>Breakdown of devices by type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Smartphones</span>
                </div>
                <span>{deviceTypes.smartphone} devices</span>
              </div>
              <Progress value={(deviceTypes.smartphone / devices.length) * 100} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Tablet className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Tablets</span>
                </div>
                <span>{deviceTypes.tablet} devices</span>
              </div>
              <Progress value={(deviceTypes.tablet / devices.length) * 100} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Laptop className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Laptops</span>
                </div>
                <span>{deviceTypes.laptop} devices</span>
              </div>
              <Progress value={(deviceTypes.laptop / devices.length) * 100} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Biometric Devices</span>
                </div>
                <span>{deviceTypes.biometric} devices</span>
              </div>
              <Progress value={(deviceTypes.biometric / devices.length) * 100} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Laptop className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>POS Terminals</span>
                </div>
                <span>{deviceTypes.pos} devices</span>
              </div>
              <Progress value={(deviceTypes.pos / devices.length) * 100} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Router className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Networking</span>
                </div>
                <span>{deviceTypes.router} devices</span>
              </div>
              <Progress value={(deviceTypes.router / devices.length) * 100} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Printer className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Printers</span>
                </div>
                <span>{deviceTypes.printer} devices</span>
              </div>
              <Progress value={(deviceTypes.printer / devices.length) * 100} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Device Inventory</CardTitle>
          <CardDescription>View and manage all registered devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search devices by name, serial, location or assignee..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="shrink-0">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Warranty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No devices found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDevices.map((device) => {
                    const isWarrantyExpired = isAfter(new Date(), device.warrantyEnd);
                    const isWarrantySoon = !isWarrantyExpired && isAfter(addMonths(new Date(), 3), device.warrantyEnd);
                    
                    return (
                      <TableRow key={device.id}>
                        <TableCell className="font-medium">{device.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                              {getDeviceTypeIcon(device.type)}
                            </div>
                            <div>
                              <div>{device.name}</div>
                              <div className="text-xs text-muted-foreground">SN: {device.serialNumber}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{device.assignedTo}</TableCell>
                        <TableCell>{device.location}</TableCell>
                        <TableCell>
                          <div className={
                            isWarrantyExpired 
                              ? 'text-red-500 font-medium' 
                              : isWarrantySoon
                                ? 'text-amber-500'
                                : ''
                          }>
                            {format(device.warrantyEnd, 'MMM d, yyyy')}
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={device.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Info className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80" align="end">
                                <div className="space-y-2">
                                  <h3 className="font-medium">Device Details</h3>
                                  <div className="text-xs grid grid-cols-2 gap-1">
                                    <div className="text-muted-foreground">Purchase Date:</div>
                                    <div>{format(device.purchaseDate, 'MMM d, yyyy')}</div>
                                    
                                    <div className="text-muted-foreground">Last Updated:</div>
                                    <div>{format(device.lastUpdated, 'MMM d, yyyy')}</div>
                                    
                                    {device.lastMaintenance && (
                                      <>
                                        <div className="text-muted-foreground">Last Maintenance:</div>
                                        <div>{format(device.lastMaintenance, 'MMM d, yyyy')}</div>
                                      </>
                                    )}
                                    
                                    {device.notes && (
                                      <>
                                        <div className="text-muted-foreground">Notes:</div>
                                        <div>{device.notes}</div>
                                      </>
                                    )}
                                  </div>
                                  
                                  <div className="pt-2 mt-2 border-t flex gap-2">
                                    <Button variant="outline" size="sm" className="w-full">
                                      Schedule Maintenance
                                    </Button>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setSelectedDevice(device)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Update Device Status</DialogTitle>
                                  <DialogDescription>
                                    Change the status of {selectedDevice?.name}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {selectedDevice && (
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <h4 className="text-sm font-medium">Serial: {selectedDevice.serialNumber}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        Assigned to: {selectedDevice.assignedTo}
                                      </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                      <Button
                                        variant={selectedDevice.status === 'active' ? 'default' : 'outline'}
                                        onClick={() => handleUpdateStatus(selectedDevice.id, 'active')}
                                      >
                                        <Check className="mr-2 h-4 w-4" />
                                        Active
                                      </Button>
                                      <Button
                                        variant={selectedDevice.status === 'maintenance' ? 'default' : 'outline'}
                                        onClick={() => handleUpdateStatus(selectedDevice.id, 'maintenance')}
                                      >
                                        <Info className="mr-2 h-4 w-4" />
                                        Maintenance
                                      </Button>
                                      <Button
                                        variant={selectedDevice.status === 'pending' ? 'default' : 'outline'}
                                        onClick={() => handleUpdateStatus(selectedDevice.id, 'pending')}
                                      >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Pending
                                      </Button>
                                      <Button
                                        variant={selectedDevice.status === 'decommissioned' ? 'default' : 'outline'}
                                        onClick={() => handleUpdateStatus(selectedDevice.id, 'decommissioned')}
                                      >
                                        <X className="mr-2 h-4 w-4" />
                                        Decommissioned
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => setSelectedDevice(device)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirm Deletion</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to remove this device from inventory?
                                    This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedDevice && (
                                  <div className="py-4">
                                    <p className="font-medium">{selectedDevice.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedDevice.serialNumber}
                                    </p>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    onClick={() => selectedDevice && handleDeviceDelete(selectedDevice.id)}
                                  >
                                    Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredDevices.length} of {devices.length} devices
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeviceInventory;

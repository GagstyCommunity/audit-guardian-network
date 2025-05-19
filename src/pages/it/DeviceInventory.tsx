
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatsCard } from '@/components/shared/StatsCard';
import { Tablet, Printer, QrCode, Search, Laptop, Smartphone, Cog } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format, isBefore } from 'date-fns';
import MockData from '@/services/mockDataService';

interface Device {
  id: string;
  device_id: string;
  device_type: string;
  manufacturer: string;
  model: string;
  serial_number: string;
  purchase_date: string;
  warranty_end: string;
  status: string;
  assigned_to: string | null;
  last_maintenance: string | null;
}

const DeviceInventory: React.FC = () => {
  const { toast } = useToast();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDevices(MockData.devices(25));
      setLoading(false);
    }, 800);
  }, []);
  
  // Filter devices based on search and filters
  const filteredDevices = devices.filter(device => {
    const matchesSearch = 
      device.device_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (device.assigned_to && device.assigned_to.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = typeFilter === 'all' || device.device_type === typeFilter;
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Calculate statistics
  const activeDevices = devices.filter(d => d.status === 'active').length;
  const maintenanceDevices = devices.filter(d => d.status === 'maintenance').length;
  const unassignedDevices = devices.filter(d => !d.assigned_to).length;
  
  // Calculate how many devices are out of warranty
  const devicesOutOfWarranty = devices.filter(d => {
    const warrantyEnd = new Date(d.warranty_end);
    return isBefore(warrantyEnd, new Date());
  }).length;
  
  const warrantyRiskPercentage = devices.length > 0 
    ? Math.round((devicesOutOfWarranty / devices.length) * 100) 
    : 0;

  // Column definitions for DataTable
  const columns = [
    {
      header: 'Device ID',
      accessorKey: (row: Device) => row.device_id,
      cell: (row: Device) => (
        <div className="font-medium">{row.device_id}</div>
      ),
    },
    {
      header: 'Type',
      accessorKey: (row: Device) => row.device_type,
      cell: (row: Device) => {
        const getIcon = () => {
          switch(row.device_type.toLowerCase()) {
            case 'tablet': return <Tablet className="h-4 w-4" />;
            case 'printer': return <Printer className="h-4 w-4" />;
            case 'pos terminal': return <Smartphone className="h-4 w-4" />;
            default: return <Laptop className="h-4 w-4" />;
          }
        };
        
        return (
          <div className="flex items-center">
            {getIcon()}
            <span className="ml-2">{row.device_type}</span>
          </div>
        );
      },
    },
    {
      header: 'Manufacturer',
      accessorKey: (row: Device) => row.manufacturer,
      cell: (row: Device) => (
        <div>{row.manufacturer}</div>
      ),
    },
    {
      header: 'Model',
      accessorKey: (row: Device) => row.model,
      cell: (row: Device) => (
        <div>{row.model}</div>
      ),
    },
    {
      header: 'Serial Number',
      accessorKey: (row: Device) => row.serial_number,
      cell: (row: Device) => (
        <div className="font-mono text-sm">{row.serial_number}</div>
      ),
    },
    {
      header: 'Warranty End',
      accessorKey: (row: Device) => row.warranty_end,
      cell: (row: Device) => {
        const warrantyEnd = new Date(row.warranty_end);
        const isExpired = isBefore(warrantyEnd, new Date());
        
        return (
          <div className={isExpired ? 'text-red-600' : ''}>
            {row.warranty_end}
            {isExpired && (
              <span className="block text-xs text-red-600">Expired</span>
            )}
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessorKey: (row: Device) => row.status,
      cell: (row: Device) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      header: 'Assignment',
      accessorKey: (row: Device) => row.assigned_to,
      cell: (row: Device) => (
        <div>{row.assigned_to || 'Unassigned'}</div>
      ),
    },
    {
      header: 'Actions',
      accessorKey: (row: Device) => row.id,
      cell: (row: Device) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Cog className="h-3.5 w-3.5 mr-1" /> Manage
          </Button>
        </div>
      ),
    },
  ];

  const handleStatusChange = (deviceId: string, newStatus: string) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === deviceId ? { ...device, status: newStatus } : device
      )
    );
    
    toast({
      title: "Device Status Updated",
      description: `Device ${deviceId} status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Device Inventory</h1>
        <Button>
          <QrCode className="mr-2 h-4 w-4" /> Add New Device
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Active Devices"
          value={activeDevices.toString()}
          description="Currently in operation"
          icon={Laptop}
          isLoading={loading}
        />
        <StatsCard
          title="In Maintenance"
          value={maintenanceDevices.toString()}
          description="Under repair or service"
          icon={Cog}
          isLoading={loading}
        />
        <StatsCard
          title="Unassigned"
          value={unassignedDevices.toString()}
          description="Available for assignment"
          icon={QrCode}
          isLoading={loading}
        />
        <StatsCard
          title="Warranty Risk"
          value={`${warrantyRiskPercentage}%`}
          description={`${devicesOutOfWarranty} devices out of warranty`}
          icon={Printer}
          isLoading={loading}
          trend={{
            value: warrantyRiskPercentage,
            isPositive: false,
            label: "needs attention"
          }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Device Registry</CardTitle>
          <CardDescription>View and manage all hardware devices and equipment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search devices..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Micro-ATM">Micro-ATM</SelectItem>
                  <SelectItem value="Biometric Scanner">Biometric Scanner</SelectItem>
                  <SelectItem value="Tablet">Tablet</SelectItem>
                  <SelectItem value="POS Terminal">POS Terminal</SelectItem>
                  <SelectItem value="Printer">Printer</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="repair">Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DataTable
            data={filteredDevices}
            columns={columns}
            loading={loading}
            emptyState="No devices found matching your filters"
          />
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

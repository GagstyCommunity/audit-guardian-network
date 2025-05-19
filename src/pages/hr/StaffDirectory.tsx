
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, UserPlus, Mail, Phone, MapPin, UserCog, Users } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { StatsCard } from '@/components/shared/StatsCard';
import MockData from '@/services/mockDataService';

interface StaffMember {
  id: string;
  employee_id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  join_date: string;
  status: string;
  reporting_to: string | null;
  location: string;
}

const StaffDirectory: React.FC = () => {
  const { toast } = useToast();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStaff(MockData.staff(20));
      setLoading(false);
    }, 800);
  }, []);
  
  // Filter staff based on search and filters
  const filteredStaff = staff.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  // Calculate statistics
  const activeStaff = staff.filter(s => s.status === 'active').length;
  const onLeaveStaff = staff.filter(s => s.status === 'on_leave').length;
  const suspendedStaff = staff.filter(s => s.status === 'suspended').length;
  
  const departments = [...new Set(staff.map(s => s.department))];
  
  // Get initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Column definitions for DataTable
  const columns = [
    {
      header: 'Employee',
      accessorKey: (row: StaffMember) => row.name,
      cell: (row: StaffMember) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{getInitials(row.name)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-muted-foreground">{row.employee_id}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessorKey: (row: StaffMember) => row.role,
      cell: (row: StaffMember) => (
        <div>
          <Badge variant="outline" className="capitalize">
            {row.role.replace('_', ' ')}
          </Badge>
        </div>
      ),
    },
    {
      header: 'Department',
      accessorKey: (row: StaffMember) => row.department,
      cell: (row: StaffMember) => (
        <div>{row.department}</div>
      ),
    },
    {
      header: 'Contact',
      accessorKey: (row: StaffMember) => row.email,
      cell: (row: StaffMember) => (
        <div>
          <div className="flex items-center">
            <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            <span className="text-sm">{row.email}</span>
          </div>
          <div className="flex items-center mt-1">
            <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            <span className="text-sm">{row.phone}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Location',
      accessorKey: (row: StaffMember) => row.location,
      cell: (row: StaffMember) => (
        <div className="flex items-center">
          <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
          <span>{row.location}</span>
        </div>
      ),
    },
    {
      header: 'Join Date',
      accessorKey: (row: StaffMember) => row.join_date,
      cell: (row: StaffMember) => (
        <div>{row.join_date}</div>
      ),
    },
    {
      header: 'Status',
      accessorKey: (row: StaffMember) => row.status,
      cell: (row: StaffMember) => (
        <StatusBadge status={row.status} label={row.status.replace('_', ' ')} />
      ),
    },
    {
      header: 'Actions',
      accessorKey: (row: StaffMember) => row.id,
      cell: (row: StaffMember) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <UserCog className="h-3.5 w-3.5 mr-1" /> Profile
          </Button>
        </div>
      ),
    },
  ];

  const handleStatusChange = (userId: string, newStatus: string) => {
    setStaff(prevStaff => 
      prevStaff.map(staffMember => 
        staffMember.id === userId ? { ...staffMember, status: newStatus } : staffMember
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Employee status has been changed to ${newStatus.replace('_', ' ')}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Staff Directory</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="Active Employees"
          value={activeStaff.toString()}
          description={`${activeStaff} of ${staff.length} employees`}
          icon={Users}
          isLoading={loading}
        />
        <StatsCard
          title="On Leave"
          value={onLeaveStaff.toString()}
          description="Currently on leave"
          icon={Users}
          isLoading={loading}
        />
        <StatsCard
          title="Suspended Accounts"
          value={suspendedStaff.toString()}
          description="Accounts requiring attention"
          icon={Users}
          isLoading={loading}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Registry</CardTitle>
          <CardDescription>View and manage all staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search employees..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on_leave">On Leave</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DataTable
            data={filteredStaff}
            columns={columns}
            loading={loading}
            emptyState="No employees found matching your filters"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredStaff.length} of {staff.length} employees
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StaffDirectory;

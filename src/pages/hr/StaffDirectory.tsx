
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
} from "@/components/ui/dialog";
import { StatusBadge } from '@/components/shared/StatusBadge';
import { useToast } from '@/components/ui/use-toast';
import { User, UserCog, UserPlus, Search, Mail, Phone, MapPin, Calendar, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types/auth.types';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  joinDate: Date;
  status: 'active' | 'inactive' | 'on_leave';
  avatar?: string;
  phone: string;
  location: string;
  manager: string;
  recentActivity: {
    action: string;
    date: Date;
  }[];
}

const mockStaffMembers: StaffMember[] = [
  {
    id: 'emp-001',
    name: 'Rahul Khanna',
    email: 'rahul.khanna@example.com',
    role: 'admin',
    department: 'Management',
    joinDate: new Date('2020-01-15'),
    status: 'active',
    avatar: '/assets/avatars/admin.png',
    phone: '+91 98765 43210',
    location: 'Delhi, Central Office',
    manager: 'CEO',
    recentActivity: [
      { action: 'Updated system settings', date: new Date('2024-05-15') },
      { action: 'Created new user account', date: new Date('2024-05-12') },
      { action: 'Changed access permissions', date: new Date('2024-05-10') }
    ]
  },
  {
    id: 'emp-002',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    role: 'hr',
    department: 'Human Resources',
    joinDate: new Date('2021-03-10'),
    status: 'active',
    avatar: '/assets/avatars/hr.png',
    phone: '+91 87654 32109',
    location: 'Delhi, Central Office',
    manager: 'Rahul Khanna',
    recentActivity: [
      { action: 'Updated employee benefits', date: new Date('2024-05-16') },
      { action: 'Processed leave request', date: new Date('2024-05-14') },
      { action: 'Scheduled training session', date: new Date('2024-05-11') }
    ]
  },
  {
    id: 'emp-003',
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    role: 'it_infra',
    department: 'IT & Infrastructure',
    joinDate: new Date('2021-06-22'),
    status: 'active',
    avatar: '/assets/avatars/it.png',
    phone: '+91 76543 21098',
    location: 'Delhi, Tech Center',
    manager: 'Rahul Khanna',
    recentActivity: [
      { action: 'Deployed system update', date: new Date('2024-05-17') },
      { action: 'Resolved network issue', date: new Date('2024-05-15') },
      { action: 'Added new hardware', date: new Date('2024-05-12') }
    ]
  },
  {
    id: 'emp-004',
    name: 'Deepa Reddy',
    email: 'deepa.reddy@example.com',
    role: 'compliance',
    department: 'Compliance',
    joinDate: new Date('2022-01-05'),
    status: 'active',
    avatar: '/assets/avatars/compliance.png',
    phone: '+91 65432 10987',
    location: 'Delhi, Central Office',
    manager: 'Rahul Khanna',
    recentActivity: [
      { action: 'Updated audit checklist', date: new Date('2024-05-16') },
      { action: 'Reviewed audit reports', date: new Date('2024-05-13') },
      { action: 'Created new compliance policy', date: new Date('2024-05-10') }
    ]
  },
  {
    id: 'emp-005',
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    role: 'field_auditor',
    department: 'Field Operations',
    joinDate: new Date('2022-04-18'),
    status: 'on_leave',
    avatar: '/assets/avatars/auditor.png',
    phone: '+91 54321 09876',
    location: 'North District, Field Office',
    manager: 'Deepa Reddy',
    recentActivity: [
      { action: 'Completed field audit', date: new Date('2024-05-10') },
      { action: 'Submitted audit report', date: new Date('2024-05-10') },
      { action: 'Requested annual leave', date: new Date('2024-05-09') }
    ]
  },
  {
    id: 'emp-006',
    name: 'Neha Gupta',
    email: 'neha.gupta@example.com',
    role: 'cluster_manager',
    department: 'Field Operations',
    joinDate: new Date('2022-09-12'),
    status: 'active',
    avatar: '/assets/avatars/manager.png',
    phone: '+91 43210 98765',
    location: 'East District, Field Office',
    manager: 'Rahul Khanna',
    recentActivity: [
      { action: 'Updated cluster report', date: new Date('2024-05-17') },
      { action: 'Assigned new auditor task', date: new Date('2024-05-15') },
      { action: 'Reviewed CSP performance', date: new Date('2024-05-14') }
    ]
  },
  {
    id: 'emp-007',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    role: 'customer_support',
    department: 'Customer Service',
    joinDate: new Date('2023-02-05'),
    status: 'active',
    avatar: '/assets/avatars/support.png',
    phone: '+91 32109 87654',
    location: 'Delhi, Customer Center',
    manager: 'Rahul Khanna',
    recentActivity: [
      { action: 'Resolved customer complaint', date: new Date('2024-05-17') },
      { action: 'Updated knowledge base', date: new Date('2024-05-16') },
      { action: 'Conducted customer survey', date: new Date('2024-05-14') }
    ]
  },
  {
    id: 'emp-008',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@example.com',
    role: 'ops_training',
    department: 'Training & Development',
    joinDate: new Date('2023-05-20'),
    status: 'active',
    avatar: '/assets/avatars/training.png',
    phone: '+91 21098 76543',
    location: 'Delhi, Training Center',
    manager: 'Rahul Khanna',
    recentActivity: [
      { action: 'Conducted training session', date: new Date('2024-05-16') },
      { action: 'Updated training materials', date: new Date('2024-05-15') },
      { action: 'Scheduled new workshops', date: new Date('2024-05-13') }
    ]
  },
  {
    id: 'emp-009',
    name: 'Sanjay Verma',
    email: 'sanjay.verma@example.com',
    role: 'bank_officer',
    department: 'Banking Operations',
    joinDate: new Date('2023-08-14'),
    status: 'inactive',
    avatar: '/assets/avatars/bank.png',
    phone: '+91 10987 65432',
    location: 'South District, Bank Branch',
    manager: 'Rahul Khanna',
    recentActivity: [
      { action: 'Reviewed banking transactions', date: new Date('2024-05-05') },
      { action: 'Updated banking documentation', date: new Date('2024-05-04') },
      { action: 'Processed account transfers', date: new Date('2024-05-03') }
    ]
  }
];

const getRoleDisplayName = (role: UserRole): string => {
  const roleMap: Record<UserRole, string> = {
    admin: 'Administrator',
    csp_agent: 'CSP Agent',
    field_auditor: 'Field Auditor',
    cluster_manager: 'Cluster Manager',
    ops_training: 'Operations & Training',
    compliance: 'Compliance Officer',
    it_infra: 'IT Infrastructure',
    hr: 'Human Resources',
    customer_support: 'Customer Support',
    bank_officer: 'Bank Officer',
    fi_agent: 'FI Agent',
    auditor: 'Auditor',
    customer: 'Customer',
    army_welfare_officer: 'Army Welfare Officer',
    guest: 'Guest'
  };
  
  return roleMap[role] || String(role);
};

const StaffDirectory: React.FC = () => {
  const [staff, setStaff] = useState<StaffMember[]>(mockStaffMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const { toast } = useToast();
  
  const filteredStaff = staff.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getRoleDisplayName(member.role).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleStatusChange = (id: string, newStatus: 'active' | 'inactive' | 'on_leave') => {
    const updatedStaff = staff.map(member => 
      member.id === id ? { ...member, status: newStatus } : member
    );
    
    setStaff(updatedStaff);
    
    toast({
      title: "Status Updated",
      description: `Employee status has been changed to ${newStatus.replace('_', ' ')}`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <StatusBadge status="active" />;
      case 'inactive': return <StatusBadge status="inactive" />;
      case 'on_leave': return <StatusBadge status="on_leave" label="On Leave" />;
      default: return <StatusBadge status="unknown" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Staff Directory</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Employee Management</CardTitle>
          <CardDescription>View and manage staff members across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, email, role or department..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="shrink-0">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No employees found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleDisplayName(member.role)}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{format(member.joinDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setSelectedStaff(member)}
                              >
                                <User className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                              {selectedStaff && (
                                <>
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={selectedStaff.avatar} alt={selectedStaff.name} />
                                        <AvatarFallback>
                                          {selectedStaff.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      {selectedStaff.name}
                                    </DialogTitle>
                                    <DialogDescription className="flex items-center">
                                      <Badge variant="outline">{getRoleDisplayName(selectedStaff.role)}</Badge>
                                      <span className="mx-2">•</span>
                                      {selectedStaff.department}
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <Tabs defaultValue="details">
                                    <TabsList className="grid w-full grid-cols-2">
                                      <TabsTrigger value="details">Details</TabsTrigger>
                                      <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="details" className="space-y-4 pt-4">
                                      <div className="grid gap-3">
                                        <div className="flex items-center gap-2">
                                          <Mail className="h-4 w-4 text-muted-foreground" />
                                          <span>{selectedStaff.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Phone className="h-4 w-4 text-muted-foreground" />
                                          <span>{selectedStaff.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <MapPin className="h-4 w-4 text-muted-foreground" />
                                          <span>{selectedStaff.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Calendar className="h-4 w-4 text-muted-foreground" />
                                          <span>Joined {format(selectedStaff.joinDate, 'MMMM d, yyyy')}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <UserCog className="h-4 w-4 text-muted-foreground" />
                                          <span>Reports to: {selectedStaff.manager}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Settings className="h-4 w-4 text-muted-foreground" />
                                          <span>Status: {selectedStaff.status.replace('_', ' ')}</span>
                                        </div>
                                      </div>
                                    </TabsContent>
                                    <TabsContent value="activity" className="pt-4">
                                      <div className="space-y-4">
                                        {selectedStaff.recentActivity.map((activity, idx) => (
                                          <div key={idx} className="flex items-start space-x-2">
                                            <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                                            <div>
                                              <p>{activity.action}</p>
                                              <p className="text-xs text-muted-foreground">
                                                {format(activity.date, 'MMM d, yyyy')}
                                              </p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </TabsContent>
                                  </Tabs>
                                  
                                  <DialogFooter>
                                    <div className="flex space-x-2">
                                      <Button 
                                        variant={selectedStaff.status === 'active' ? 'default' : 'outline'} 
                                        size="sm"
                                        onClick={() => handleStatusChange(selectedStaff.id, 'active')}
                                      >
                                        Set Active
                                      </Button>
                                      <Button 
                                        variant={selectedStaff.status === 'inactive' ? 'destructive' : 'outline'} 
                                        size="sm"
                                        onClick={() => handleStatusChange(selectedStaff.id, 'inactive')}
                                      >
                                        Set Inactive
                                      </Button>
                                      <Button 
                                        variant={selectedStaff.status === 'on_leave' ? 'secondary' : 'outline'} 
                                        size="sm"
                                        onClick={() => handleStatusChange(selectedStaff.id, 'on_leave')}
                                      >
                                        Set On Leave
                                      </Button>
                                    </div>
                                  </DialogFooter>
                                </>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
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


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Filter, 
  Download, 
  Search, 
  MapPin, 
  CheckCircle, 
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { DataTable } from '@/components/shared/DataTable';
import { createColumns } from '@/utils/tableHelpers';
import { Visit } from '@/types/auditor.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VisitLogs: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Dummy visit logs data
  const visitLogs: Visit[] = [
    // Completed visits
    {
      id: "visit-101",
      csp_id: "CSP187",
      csp_name: "Aditya Patel",
      visit_date: "2025-05-12T14:30:00",
      status: "completed",
      priority: "high",
      location: {
        district: "North District",
        village: "Ambawadi",
        lat: 28.5913,
        long: 77.0298
      },
      distance: 5.2,
      estimated_time: 60,
      red_zone: false,
      issues: ["Document verification"]
    },
    {
      id: "visit-102",
      csp_id: "CSP252",
      csp_name: "Meena Kumari",
      visit_date: "2025-05-11T10:15:00",
      status: "completed",
      priority: "medium",
      location: {
        district: "East District",
        village: "Gokulpuri",
        lat: 28.7034,
        long: 77.2811
      },
      distance: 8.7,
      estimated_time: 45,
      red_zone: false,
      issues: ["Routine audit"]
    },
    {
      id: "visit-103",
      csp_id: "CSP310",
      csp_name: "Rajiv Verma",
      visit_date: "2025-05-10T13:00:00",
      status: "completed",
      priority: "low",
      location: {
        district: "South District",
        village: "Saket",
        lat: 28.5244,
        long: 77.2090
      },
      distance: 12.3,
      estimated_time: 55,
      red_zone: false,
      issues: ["Equipment inspection"]
    },
    
    // Cancelled visits
    {
      id: "visit-201",
      csp_id: "CSP422",
      csp_name: "Sanjay Singh",
      visit_date: "2025-05-09T11:30:00",
      status: "cancelled",
      priority: "medium",
      location: {
        district: "West District",
        village: "Janakpuri",
        lat: 28.6290,
        long: 77.0910
      },
      distance: 15.8,
      estimated_time: 70,
      red_zone: true,
      issues: ["Suspected fraud"]
    },
    
    // Pending visits
    {
      id: "visit-301",
      csp_id: "CSP178",
      csp_name: "Kavita Sharma",
      visit_date: "2025-05-17T09:45:00",
      status: "pending",
      priority: "high",
      location: {
        district: "Central District",
        village: "Connaught Place",
        lat: 28.6315,
        long: 77.2167
      },
      distance: 3.1,
      estimated_time: 30,
      red_zone: false,
      issues: ["Customer complaints"]
    },
    {
      id: "visit-302",
      csp_id: "CSP209",
      csp_name: "Harish Kumar",
      visit_date: "2025-05-18T11:00:00",
      status: "pending",
      priority: "low",
      location: {
        district: "North District",
        village: "Model Town",
        lat: 28.7158,
        long: 77.1910
      },
      distance: 9.4,
      estimated_time: 50,
      red_zone: false,
      issues: ["Routine inspection"]
    },
    
    // In progress visit
    {
      id: "visit-401",
      csp_id: "CSP133",
      csp_name: "Neelam Gupta",
      visit_date: "2025-05-14T10:00:00",
      status: "in_progress",
      priority: "high",
      location: {
        district: "East District",
        village: "Patparganj",
        lat: 28.6226,
        long: 77.2906
      },
      distance: 7.9,
      estimated_time: 65,
      red_zone: true,
      issues: ["Suspicious activities", "System anomalies"]
    }
  ];
  
  // Define columns for the data table
  const columns = createColumns<Visit>([
    {
      header: "CSP ID",
      accessorKey: "csp_id"
    },
    {
      header: "CSP Name",
      accessorKey: "csp_name"
    },
    {
      header: "Visit Date",
      accessorKey: "visit_date",
      cell: (row) => {
        const date = new Date(row.visit_date);
        return (
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            {date.toLocaleDateString()} at {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        );
      }
    },
    {
      header: "Location",
      accessorKey: (row) => `${row.location.village}, ${row.location.district}`,
      cell: (row) => (
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          {row.location.village}, {row.location.district}
        </div>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row) => {
        const statusColors = {
          completed: "bg-green-100 text-green-800",
          pending: "bg-blue-100 text-blue-800",
          cancelled: "bg-red-100 text-red-800",
          in_progress: "bg-amber-100 text-amber-800"
        };
        
        const statusIcons = {
          completed: <CheckCircle className="h-3 w-3 mr-1" />,
          pending: <Clock className="h-3 w-3 mr-1" />,
          cancelled: <XCircle className="h-3 w-3 mr-1" />,
          in_progress: <AlertTriangle className="h-3 w-3 mr-1" />
        };
        
        const statusText = {
          completed: "Completed",
          pending: "Pending",
          cancelled: "Cancelled",
          in_progress: "In Progress"
        };
        
        return (
          <Badge className={statusColors[row.status]}>
            <div className="flex items-center">
              {statusIcons[row.status]}
              {statusText[row.status]}
            </div>
          </Badge>
        );
      }
    },
    {
      header: "Priority",
      accessorKey: "priority",
      cell: (row) => {
        const priorityColor = {
          high: "bg-red-100 text-red-800",
          medium: "bg-amber-100 text-amber-800",
          low: "bg-green-100 text-green-800"
        };
        
        return (
          <Badge className={priorityColor[row.priority]}>
            {row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
          </Badge>
        );
      }
    },
    {
      header: "Red Zone",
      accessorKey: "red_zone",
      cell: (row) => row.red_zone ? 
        <Badge className="bg-red-100 text-red-800">Yes</Badge> : 
        <Badge className="bg-green-100 text-green-800">No</Badge>
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/auditor/audit-form?csp=${row.csp_id}`)}>
            View Report
          </Button>
        </div>
      )
    }
  ]);
  
  // Filter logs based on search term
  const filteredLogs = searchTerm 
    ? visitLogs.filter(log => 
        log.csp_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.csp_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.location.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.location.district.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : visitLogs;
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Visit Logs</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-1" /> Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-1" /> Export
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Visits</p>
              <p className="text-2xl font-bold">{visitLogs.length}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{visitLogs.filter(log => log.status === 'completed').length}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{visitLogs.filter(log => log.status === 'pending').length}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Red Zone</p>
              <p className="text-2xl font-bold">{visitLogs.filter(log => log.red_zone).length}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by CSP ID, Name, or Location..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Visit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Visit Logs</CardTitle>
          <CardDescription>History of all audit visits</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <DataTable
                data={filteredLogs}
                columns={columns}
                loading={loading}
                emptyState={
                  <div className="flex flex-col items-center justify-center p-4">
                    <MapPin className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-lg font-semibold">No visit logs found</p>
                    <p className="text-gray-500">No records match your search criteria.</p>
                  </div>
                }
              />
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <DataTable
                data={filteredLogs.filter(log => log.status === 'completed')}
                columns={columns}
                loading={loading}
                emptyState={
                  <div className="flex flex-col items-center justify-center p-4">
                    <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                    <p className="text-lg font-semibold">No completed visits</p>
                    <p className="text-gray-500">No completed visits found.</p>
                  </div>
                }
              />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <DataTable
                data={filteredLogs.filter(log => log.status === 'pending')}
                columns={columns}
                loading={loading}
                emptyState={
                  <div className="flex flex-col items-center justify-center p-4">
                    <Clock className="h-12 w-12 text-blue-500 mb-2" />
                    <p className="text-lg font-semibold">No pending visits</p>
                    <p className="text-gray-500">No pending visits found.</p>
                  </div>
                }
              />
            </TabsContent>
            <TabsContent value="cancelled" className="mt-4">
              <DataTable
                data={filteredLogs.filter(log => log.status === 'cancelled')}
                columns={columns}
                loading={loading}
                emptyState={
                  <div className="flex flex-col items-center justify-center p-4">
                    <XCircle className="h-12 w-12 text-red-500 mb-2" />
                    <p className="text-lg font-semibold">No cancelled visits</p>
                    <p className="text-gray-500">No cancelled visits found.</p>
                  </div>
                }
              />
            </TabsContent>
            <TabsContent value="in_progress" className="mt-4">
              <DataTable
                data={filteredLogs.filter(log => log.status === 'in_progress')}
                columns={columns}
                loading={loading}
                emptyState={
                  <div className="flex flex-col items-center justify-center p-4">
                    <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />
                    <p className="text-lg font-semibold">No visits in progress</p>
                    <p className="text-gray-500">No visits currently in progress.</p>
                  </div>
                }
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitLogs;

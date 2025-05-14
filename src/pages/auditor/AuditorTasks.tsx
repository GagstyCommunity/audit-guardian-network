
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';
import { DataTable } from '@/components/shared/DataTable';
import { createColumns } from '@/utils/tableHelpers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Visit } from '@/types/auditor.types';

const AuditorTasks: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Dummy data
  const tasks: Visit[] = [
    {
      id: "visit-001",
      csp_id: "CSP245",
      csp_name: "Aarav Sharma",
      visit_date: "2025-05-15T09:00:00",
      status: "pending",
      priority: "high",
      location: {
        district: "North District",
        village: "Chandpur",
        lat: 28.7041,
        long: 77.1025
      },
      distance: 4.5,
      estimated_time: 15,
      red_zone: true,
      issues: ["Face verification failed", "Suspicious transaction pattern"]
    },
    {
      id: "visit-002",
      csp_id: "CSP108",
      csp_name: "Priya Patel",
      visit_date: "2025-05-15T13:00:00",
      status: "pending",
      priority: "medium",
      location: {
        district: "East District",
        village: "Raipur",
        lat: 28.6139,
        long: 77.2090
      },
      distance: 12,
      estimated_time: 25,
      red_zone: false,
      issues: ["Suspicious transaction pattern"]
    },
    {
      id: "visit-003",
      csp_id: "CSP376",
      csp_name: "Rajiv Kumar",
      visit_date: "2025-05-15T15:30:00",
      status: "pending",
      priority: "medium",
      location: {
        district: "South District",
        village: "Manoharpur",
        lat: 28.5530,
        long: 77.2540
      },
      distance: 18,
      estimated_time: 40,
      red_zone: false,
      issues: ["Customer complaints"]
    },
    {
      id: "visit-004",
      csp_id: "CSP189",
      csp_name: "Neha Gupta",
      visit_date: "2025-05-16T10:00:00",
      status: "pending",
      priority: "low",
      location: {
        district: "West District",
        village: "Bahadurgarh",
        lat: 28.6760,
        long: 76.9217
      },
      distance: 22,
      estimated_time: 50,
      red_zone: false,
      issues: ["Routine audit"]
    },
    {
      id: "visit-005",
      csp_id: "CSP412",
      csp_name: "Vikram Singh",
      visit_date: "2025-05-16T14:00:00",
      status: "pending",
      priority: "high",
      location: {
        district: "Central District",
        village: "Mayapuri",
        lat: 28.6387,
        long: 77.1218
      },
      distance: 7.8,
      estimated_time: 20,
      red_zone: true,
      issues: ["Inconsistent operating hours", "System tampering suspected"]
    }
  ];

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
      header: "Location",
      accessorKey: (row) => `${row.location.village}, ${row.location.district}`
    },
    {
      header: "Visit Date",
      accessorKey: "visit_date",
      cell: (row) => <div className="flex items-center">
        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
        {new Date(row.visit_date).toLocaleDateString()}
      </div>
    },
    {
      header: "Priority",
      accessorKey: "priority",
      cell: (row) => {
        const priorityColor = {
          high: "bg-red-100 text-red-800 border-red-300",
          medium: "bg-amber-100 text-amber-800 border-amber-300",
          low: "bg-green-100 text-green-800 border-green-300"
        };
        
        return (
          <Badge className={priorityColor[row.priority]}>
            {row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
          </Badge>
        );
      }
    },
    {
      header: "Issues",
      accessorKey: "issues",
      cell: (row) => (
        <div className="max-w-[200px] truncate">
          {row.issues.join(", ")}
        </div>
      )
    },
    {
      header: "Red Zone",
      accessorKey: "red_zone",
      cell: (row) => row.red_zone ? 
        <Badge className="bg-red-100 text-red-800 border-red-300">Yes</Badge> : 
        <Badge className="bg-green-100 text-green-800 border-green-300">No</Badge>
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (row) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/auditor/live-visit?id=${row.id}`)}>
            Start Visit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/auditor/audit-form?csp=${row.csp_id}`)}>
            Form
          </Button>
        </div>
      )
    }
  ]);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assigned Audit Tasks</h1>
        <div className="flex gap-2">
          <Button variant="outline">Today's Route</Button>
          <Button variant="default">
            <Calendar className="mr-2 h-4 w-4" /> View Calendar
          </Button>
        </div>
      </div>

      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-gray-500">Urgent visits</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Medium Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">2</div>
            <p className="text-xs text-gray-500">Standard visits</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Low Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-xs text-gray-500">Routine checks</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">64.3 km</div>
            <p className="text-xs text-gray-500">For all pending tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Red Zone Alert */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
        <div>
          <p className="font-medium text-red-800">Red Zone Alert</p>
          <p className="text-red-700 text-sm">2 audit locations are in designated red zones. Use the Red Zone Protocol for these visits.</p>
          <Button 
            variant="outline" 
            className="mt-2 border-red-500 text-red-600 hover:bg-red-100 hover:text-red-700"
            onClick={() => navigate('/auditor/red-zone')}
          >
            View Red Zone Protocols
          </Button>
        </div>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Tasks</CardTitle>
          <CardDescription>Tasks assigned to you for auditing</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={tasks}
            columns={columns}
            loading={loading}
            emptyState={
              <div className="flex flex-col items-center justify-center p-4">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <p className="text-lg font-semibold">All caught up!</p>
                <p className="text-gray-500">No pending tasks assigned to you.</p>
              </div>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditorTasks;

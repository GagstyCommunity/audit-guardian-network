
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Clock, MapPin, UserCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from 'date-fns';

interface Audit {
  id: string;
  status: string;
  scheduled_for: string;
  assigned_at: string;
  priority: number;
  is_red_zone: boolean;
  csp: {
    id: string;
    bank_id: string;
    profile: {
      name: string;
    }
  };
  auditor: {
    id: string;
    name: string;
    avatar_url: string;
  };
  location_lat: number;
  location_long: number;
}

const AuditAssignment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');
  
  const { data: audits, loading } = useSupabaseData<Audit>('audits', {
    select: '*, csp:csp_agents(id, bank_id, profile:profiles(name)), auditor:profiles(*)'
  });

  const filteredAudits = audits.filter(audit => {
    if (activeTab === 'pending') return ['pending', 'scheduled'].includes(audit.status);
    if (activeTab === 'completed') return ['completed', 'failed', 'cancelled'].includes(audit.status);
    return true;
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not scheduled';
    try {
      return format(new Date(dateString), 'PPp');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getPriorityBadge = (priority: number) => {
    const variant = priority === 1 ? 'destructive' : priority === 2 ? 'warning' : 'secondary';
    const label = priority === 1 ? 'High' : priority === 2 ? 'Medium' : 'Low';
    return <Badge variant={variant}>{label}</Badge>;
  };

  const columns = [
    {
      header: 'CSP Agent',
      accessorKey: 'csp',
      cell: (row: Audit) => (
        <div className="flex items-center">
          <div>
            <div className="font-medium">{row.csp?.profile?.name}</div>
            <div className="text-sm text-muted-foreground">{row.csp?.bank_id}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Priority',
      accessorKey: 'priority',
      cell: (row: Audit) => (
        <div className="flex items-center">
          {getPriorityBadge(row.priority)}
          {row.is_red_zone && (
            <Badge variant="destructive" className="ml-2">Red Zone</Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Schedule',
      accessorKey: 'scheduled_for',
      cell: (row: Audit) => (
        <div>
          <div className="flex items-center">
            <Calendar className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            <span>{formatDate(row.scheduled_for)}</span>
          </div>
          <div className="text-sm text-muted-foreground flex items-center mt-1">
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            <span>Assigned {formatDate(row.assigned_at)}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Location',
      accessorKey: (row: Audit) => `${row.location_lat},${row.location_long}`,
      cell: (row: Audit) => (
        <div className="flex items-center">
          <MapPin className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
          <span>{row.location_lat ? `${row.location_lat.toFixed(3)}, ${row.location_long.toFixed(3)}` : 'Not available'}</span>
        </div>
      ),
    },
    {
      header: 'Auditor',
      accessorKey: 'auditor',
      cell: (row: Audit) => (
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={row.auditor?.avatar_url} />
            <AvatarFallback>{row.auditor?.name?.charAt(0) || 'A'}</AvatarFallback>
          </Avatar>
          <div>
            {row.auditor?.name || 'Not assigned'}
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row: Audit) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (row: Audit) => (
        <div className="flex space-x-2">
          {['pending', 'scheduled'].includes(row.status) ? (
            <>
              <Button variant="outline" size="sm" className="h-8">
                <UserCheck className="h-3.5 w-3.5 mr-1" />
                Assign
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" className="h-8">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Review
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-csp-navy">Audit Assignment</h1>
        <Button>Create New Audit</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audits</CardTitle>
          <CardDescription>Assign and manage audit tasks for CSP agents</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="pending">Pending & Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Audits</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <DataTable
            data={filteredAudits}
            columns={columns}
            loading={loading}
            emptyMessage="No audits found"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditAssignment;

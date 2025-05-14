import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Download, Filter, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data - in a real app this would come from the database
const mockLogs = Array(20).fill(0).map((_, i) => ({
  id: `log-${i+1}`,
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
  user: {
    id: `user-${Math.floor(Math.random() * 10) + 1}`,
    name: ['Admin', 'Bank Officer', 'Auditor', 'CSP Agent'][Math.floor(Math.random() * 4)],
    role: ['admin', 'bank_officer', 'auditor', 'csp_agent'][Math.floor(Math.random() * 4)],
  },
  action: ['login', 'create', 'update', 'delete', 'export', 'approve', 'reject'][Math.floor(Math.random() * 7)],
  resource: ['user', 'csp_agent', 'transaction', 'audit', 'dispute', 'setting', 'report'][Math.floor(Math.random() * 7)],
  details: `${['Created', 'Modified', 'Deleted', 'Viewed', 'Exported'][Math.floor(Math.random() * 5)]} ${['CSP agent', 'transaction record', 'audit report', 'system setting', 'user account'][Math.floor(Math.random() * 5)]} #${Math.floor(Math.random() * 10000)}`,
  ip_address: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
}));

const AuditTrailLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [logs, setLogs] = useState(mockLogs);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesRole = selectedRole === 'all' || log.user.role === selectedRole;
    
    return matchesSearch && matchesAction && matchesRole;
  });

  const formatDate = (date: Date) => {
    return format(date, 'PPp');
  };

  const columns = [
    {
      header: 'Time',
      accessorKey: 'timestamp',
      cell: (row: any) => (
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{formatDate(row.timestamp)}</span>
        </div>
      ),
    },
    {
      header: 'User',
      accessorKey: 'user',
      cell: (row: any) => (
        <div>
          <div className="font-medium">{row.user.name}</div>
          <div className="text-sm text-muted-foreground capitalize">{row.user.role.replace('_', ' ')}</div>
        </div>
      ),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      cell: (row: any) => (
        <div className="capitalize">{row.action}</div>
      ),
    },
    {
      header: 'Resource',
      accessorKey: 'resource',
      cell: (row: any) => (
        <div className="capitalize">{row.resource}</div>
      ),
    },
    {
      header: 'Details',
      accessorKey: 'details',
    },
    {
      header: 'IP Address',
      accessorKey: 'ip_address',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-csp-navy">Audit Trail Logs</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Activity Logs</CardTitle>
          <CardDescription>Track all system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center w-full md:w-auto">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Select value={selectedAction} onValueChange={setSelectedAction}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                  <SelectItem value="approve">Approve</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="bank_officer">Bank Officer</SelectItem>
                  <SelectItem value="auditor">Auditor</SelectItem>
                  <SelectItem value="csp_agent">CSP Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DataTable
            data={filteredLogs}
            columns={columns}
            loading={false}
            emptyState="No logs found matching the filters"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrailLogs;

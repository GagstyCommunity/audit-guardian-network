
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { MessageSquare, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MockData from '@/services/mockDataService';

interface Complaint {
  id: string;
  customer_name: string;
  customer_id: string;
  complaint_type: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  resolved_at: string | null;
}

const FeedbackLog: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setComplaints(MockData.complaints(12));
      setLoading(false);
    }, 800);
  }, []);

  const filteredComplaints = complaints.filter(complaint => 
    complaint.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.complaint_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'ID',
      accessorKey: (row: Complaint) => row.id,
      cell: (row: Complaint) => (
        <div className="font-medium">{row.id.substring(0, 8)}</div>
      ),
    },
    {
      header: 'Date',
      accessorKey: (row: Complaint) => row.created_at,
      cell: (row: Complaint) => (
        <div>{row.created_at}</div>
      ),
    },
    {
      header: 'Customer',
      accessorKey: (row: Complaint) => row.customer_name,
      cell: (row: Complaint) => (
        <div>
          <div className="font-medium">{row.customer_name}</div>
          <div className="text-sm text-muted-foreground">{row.customer_id}</div>
        </div>
      ),
    },
    {
      header: 'Type',
      accessorKey: (row: Complaint) => row.complaint_type,
      cell: (row: Complaint) => (
        <Badge variant="outline">{row.complaint_type}</Badge>
      ),
    },
    {
      header: 'Description',
      accessorKey: (row: Complaint) => row.description,
      cell: (row: Complaint) => (
        <div className="max-w-[300px] truncate">{row.description}</div>
      ),
    },
    {
      header: 'Priority',
      accessorKey: (row: Complaint) => row.priority,
      cell: (row: Complaint) => (
        <div>
          <Badge variant={
            row.priority === 'high' ? 'destructive' : 
            row.priority === 'medium' ? 'warning' : 'outline'
          }>
            {row.priority}
          </Badge>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: (row: Complaint) => row.status,
      cell: (row: Complaint) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      header: 'Resolution Date',
      accessorKey: (row: Complaint) => row.resolved_at,
      cell: (row: Complaint) => (
        <div>{row.resolved_at || 'Pending'}</div>
      ),
    },
    {
      header: 'Actions',
      accessorKey: (row: Complaint) => row.id,
      cell: (row: Complaint) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            <MessageSquare className="h-3.5 w-3.5 mr-1" /> Respond
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Feedback & Complaints Log</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Customer Feedback History</CardTitle>
          <CardDescription>View and manage customer complaints and feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by customer, description or type..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <DataTable
            data={filteredComplaints}
            columns={columns}
            loading={loading}
            emptyState="No feedback or complaints found"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackLog;

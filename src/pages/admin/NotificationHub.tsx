
// Since this is a newly created file and we need to update it, I'll create the minimal version required:
import React from 'react';
import { DataTable } from '@/components/shared/DataTable'; 
import { createColumns } from '@/utils/tableHelpers';

interface Notification {
  id: string;
  type: string;
  message: string;
  created_at: string;
  status: string;
}

const NotificationHub: React.FC = () => {
  // Mock data for now - replace with actual implementation
  const notifications: Notification[] = [];
  const loading = false;
  
  const columns = createColumns<Notification>([
    {
      header: 'Type',
      accessorKey: 'type',
    },
    {
      header: 'Message',
      accessorKey: 'message',
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
  ]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notification Hub</h1>
      
      <DataTable
        data={notifications}
        columns={columns}
        loading={loading}
        emptyState="No notifications found"
      />
    </div>
  );
};

export default NotificationHub;

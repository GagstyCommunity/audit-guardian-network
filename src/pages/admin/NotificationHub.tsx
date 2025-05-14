
import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/shared/DataTable'; 
import { createColumns } from '@/utils/tableHelpers';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Bell, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: string;
  message: string;
  created_at: string;
  status: string;
  priority: string;
  recipient?: string;
}

const NotificationHub: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setNotifications(generateMockNotifications(20));
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const generateMockNotifications = (count: number): Notification[] => {
    const types = ['Alert', 'System', 'Audit', 'Update', 'Security'];
    const statuses = ['read', 'unread', 'archived'];
    const priorities = ['low', 'medium', 'high', 'critical'];
    const recipients = ['All Users', 'Admins', 'Auditors', 'Agents', 'Bank Officers'];
    
    const messages = [
      'New CSP agent registered in Mumbai region',
      'System maintenance scheduled for tomorrow',
      'High-risk transaction detected in Chennai',
      'Audit report ready for review',
      'Security alert: Multiple login attempts',
      'New policy update requires attention',
      'War Mode protocol activated',
      'CSP agent failed facial verification',
      'Application version 2.5 deployed successfully',
      'Customer complaint requires immediate attention'
    ];
    
    return Array(count).fill(0).map((_, i) => {
      const daysAgo = Math.floor(Math.random() * 14);
      const hoursAgo = Math.floor(Math.random() * 24);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      date.setHours(date.getHours() - hoursAgo);
      
      return {
        id: Math.random().toString(36).substring(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        created_at: format(date, 'yyyy-MM-dd HH:mm:ss'),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        recipient: recipients[Math.floor(Math.random() * recipients.length)]
      };
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  };
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.status === activeTab);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM d, yyyy h:mm a');
  };
  
  const columns = createColumns<Notification>([
    {
      header: 'Type',
      accessorKey: (row) => (
        <div className="flex items-center gap-2">
          <Bell className={`h-4 w-4 ${
            row.priority === 'critical' ? 'text-red-500' : 
            row.priority === 'high' ? 'text-amber-500' :
            row.priority === 'medium' ? 'text-blue-500' :
            'text-green-500'
          }`} />
          <span>{row.type}</span>
        </div>
      ),
    },
    {
      header: 'Message',
      accessorKey: (row) => row.message,
    },
    {
      header: 'Status',
      accessorKey: (row) => (
        <div className="flex items-center gap-2">
          {row.status === 'read' ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : row.status === 'unread' ? (
            <Clock className="h-4 w-4 text-amber-500" />
          ) : (
            <Bell className="h-4 w-4 text-gray-400" />
          )}
          <StatusBadge status={row.status} />
        </div>
      ),
    },
    {
      header: 'Priority',
      accessorKey: (row) => (
        <StatusBadge status={row.priority} />
      ),
    },
    {
      header: 'Recipient',
      accessorKey: (row) => row.recipient || 'All',
    },
    {
      header: 'Time',
      accessorKey: (row) => formatDate(row.created_at),
    },
  ]);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notification Hub</h1>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage and review system notifications</CardDescription>
            </div>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">
                  All
                  <span className="ml-1 rounded-full bg-gray-200 px-2 text-xs">{notifications.length}</span>
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  <span className="ml-1 rounded-full bg-amber-100 px-2 text-xs">
                    {notifications.filter(n => n.status === 'unread').length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={filteredNotifications}
            columns={columns}
            loading={loading}
            emptyState="No notifications found"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationHub;

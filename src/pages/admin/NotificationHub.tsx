
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search, Send, Users } from 'lucide-react';
import { format } from 'date-fns';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
  profile: {
    name: string;
    role: string;
  }
}

const NotificationTemplates = [
  { id: 'verification-reminder', name: 'Face Verification Reminder', template: 'Your monthly face verification is due on {date}. Please complete it to avoid service interruption.' },
  { id: 'critical-alert', name: 'Critical Alert', template: 'ATTENTION: A critical security issue has been detected in your account. Please verify your recent activities immediately.' },
  { id: 'system-maintenance', name: 'System Maintenance', template: 'The system will be undergoing maintenance on {date} from {start_time} to {end_time}. Some services may be unavailable during this period.' },
  { id: 'new-feature', name: 'New Feature Announcement', template: 'We\'re excited to announce a new feature: {feature_name}! This will help you {benefit}.' },
];

const NotificationHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newNotificationMessage, setNewNotificationMessage] = useState('');
  const [newNotificationTitle, setNewNotificationTitle] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedRecipientType, setSelectedRecipientType] = useState('all');
  const [activeTab, setActiveTab] = useState('sent');
  
  const { data: notifications, loading } = useSupabaseData<Notification>('notifications', {
    select: '*, profile:profiles(*)',
    orderBy: { column: 'created_at', ascending: false }
  });

  const filteredNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.profile?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = NotificationTemplates.find(t => t.id === templateId);
    if (template) {
      setNewNotificationTitle(template.name);
      setNewNotificationMessage(template.template);
    }
  };

  const handleSendNotification = () => {
    // In a real app, this would send the notification through Supabase
    alert(`Notification "${newNotificationTitle}" will be sent to ${selectedRecipientType} users!`);
    setNewNotificationTitle('');
    setNewNotificationMessage('');
    setSelectedTemplate('');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'PPp');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getNotificationTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'alert':
        return <Bell className="h-4 w-4 text-amber-500" />;
      case 'warning':
        return <Bell className="h-4 w-4 text-destructive" />;
      case 'task':
        return <Bell className="h-4 w-4 text-primary" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const columns = [
    {
      header: 'Notification',
      accessorKey: 'title',
      cell: (row: Notification) => (
        <div className="flex items-start">
          {getNotificationTypeIcon(row.type)}
          <div className="ml-2">
            <div className="font-medium">{row.title}</div>
            <div className="text-sm text-muted-foreground truncate" style={{ maxWidth: '250px' }}>
              {row.message}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {formatDate(row.created_at)}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Recipient',
      accessorKey: 'profile.name',
      cell: (row: Notification) => (
        <div>
          <div className="font-medium">{row.profile?.name || 'Unknown'}</div>
          <div className="text-sm text-muted-foreground capitalize">
            {(row.profile?.role || '').replace('_', ' ')}
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'read',
      cell: (row: Notification) => (
        <Badge variant={row.read ? 'outline' : 'default'}>
          {row.read ? 'Read' : 'Unread'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (row: Notification) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            View
          </Button>
          <Button variant="ghost" size="sm" className="h-8">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-csp-navy">Notification Hub</h1>

      {unreadCount > 0 && (
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertTitle>Unread Notifications</AlertTitle>
          <AlertDescription>
            There are {unreadCount} unread notifications in the system.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sent">Sent Notifications</TabsTrigger>
          <TabsTrigger value="compose">Compose New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sent" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sent Notifications</CardTitle>
              <CardDescription>Manage and track all system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-6">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              
              <DataTable
                data={filteredNotifications}
                columns={columns}
                loading={loading}
                emptyMessage="No notifications found"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compose" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Notification</CardTitle>
              <CardDescription>Send notifications to users across the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Template (Optional)</label>
                    <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Template</SelectItem>
                        {NotificationTemplates.map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Recipients</label>
                    <Select value={selectedRecipientType} onValueChange={setSelectedRecipientType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="csp_agents">CSP Agents Only</SelectItem>
                        <SelectItem value="auditors">Auditors Only</SelectItem>
                        <SelectItem value="bank_officers">Bank Officers Only</SelectItem>
                        <SelectItem value="customers">Customers Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Notification Title</label>
                  <Input
                    placeholder="Enter notification title"
                    value={newNotificationTitle}
                    onChange={(e) => setNewNotificationTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Notification Message</label>
                  <Textarea
                    placeholder="Enter message content..."
                    value={newNotificationMessage}
                    onChange={(e) => setNewNotificationMessage(e.target.value)}
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use {'{variable}'} syntax for placeholders. These will be replaced with actual data when sent.
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Recipients: <strong>{selectedRecipientType === 'all' ? 'All Users' : selectedRecipientType}</strong>
                    </span>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setActiveTab('sent')}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSendNotification}
                      disabled={!newNotificationTitle.trim() || !newNotificationMessage.trim()}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Notification
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationHub;

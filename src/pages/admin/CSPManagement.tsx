import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  UserPlus, 
  Filter, 
  Download,
  MapPin,
  AlertCircle,
  Check,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSupabaseData, mutateSupabaseData } from '@/hooks/useSupabaseData';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { createColumns } from '@/utils/tableHelpers';

interface CSPAgent {
  id: string;
  bank_id: string;
  status: string;
  risk_score: number;
  last_face_verification: string;
  is_in_red_zone: boolean;
  is_army_service_provider: boolean;
  profile: {
    name: string;
    email: string;
    phone_number: string;
    region: string;
    district: string;
    state: string;
  };
}

const CSPManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string | null>(null);
  
  const { data: cspAgents, loading, refetch } = useSupabaseData<CSPAgent>('csp_agents', {
    select: '*, profile:profiles(*)'
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleActionClick = async (action: string, agentId: string, currentStatus?: string) => {
    const newStatus = action === 'activate' ? 'active' : 
                     action === 'suspend' ? 'suspended' : currentStatus;
                     
    try {
      // Using type assertion to handle dynamic table access
      const { error } = await (supabase
        .from('csp_agents') as unknown as any)
        .update({ status: newStatus })
        .eq('id', agentId);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `CSP agent status updated to ${newStatus}`,
      });
      
      refetch();
    } catch (error) {
      console.error('Error updating agent status:', error);
      toast({
        title: "Error",
        description: "Failed to update agent status",
        variant: "destructive"
      });
    }
  };

  const filteredAgents = cspAgents
    .filter(agent => 
      (agent.profile?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       agent.bank_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       agent.profile?.email?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filter || agent.status === filter)
    );

  const columns = createColumns<CSPAgent>([
    {
      header: 'Name',
      accessorKey: (row) => (
        <div className="flex items-center">
          <div className="ml-2">
            <div className="font-medium">{row.profile.name}</div>
            <div className="text-sm text-muted-foreground">{row.bank_id}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessorKey: (row) => (
        <div>
          <div>{row.profile.email}</div>
          <div className="text-sm text-muted-foreground">{row.profile.phone_number}</div>
        </div>
      ),
    },
    {
      header: 'Location',
      accessorKey: (row) => (
        <div className="flex items-center">
          <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
          <span>{row.profile.district}, {row.profile.state}</span>
          {row.is_in_red_zone && (
            <Badge variant="destructive" className="ml-2">Red Zone</Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: (row) => (
        <div className="flex items-center">
          <StatusBadge status={row.status} />
          {row.risk_score > 0.5 && (
            <AlertCircle className="ml-2 h-4 w-4 text-destructive" />
          )}
          {row.is_army_service_provider && (
            <Badge variant="secondary" className="ml-2">Army</Badge>
          )}
        </div>
      ),
    },
    {
      header: 'Actions',
      accessorKey: (row) => (
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleActionClick('view', row.id)}>
                  View Details
                </DropdownMenuItem>
                {row.status !== 'active' && (
                  <DropdownMenuItem onClick={() => handleActionClick('activate', row.id)}>
                    <Check className="mr-2 h-4 w-4" /> Activate
                  </DropdownMenuItem>
                )}
                {row.status !== 'suspended' && (
                  <DropdownMenuItem onClick={() => handleActionClick('suspend', row.id)}>
                    <X className="mr-2 h-4 w-4" /> Suspend
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  Audit History
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-csp-navy">CSP Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New CSP
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CSP Agents</CardTitle>
          <CardDescription>Manage and monitor all CSP agents in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center w-full max-w-sm">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID or email..."
                value={searchTerm}
                onChange={handleSearch}
                className="max-w-sm"
              />
            </div>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    {filter || 'All Status'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilter(null)}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('active')}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('suspended')}>Suspended</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('pending_approval')}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter('blacklisted')}>Blacklisted</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <DataTable
            data={filteredAgents}
            columns={columns}
            loading={loading}
            emptyMessage="No CSP agents found"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CSPManagement;

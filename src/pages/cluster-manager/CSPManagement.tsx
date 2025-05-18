
import React, { useState, useEffect } from 'react';
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
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { StatsCard } from '@/components/shared/StatsCard';
import { useToast } from '@/components/ui/use-toast';
import { UserPlus, UserCog, AlertTriangle, MapPin, Activity, Search } from 'lucide-react';

const CSPManagement: React.FC = () => {
  const { toast } = useToast();
  
  // Mock CSP agents data
  const [cspAgents, setCspAgents] = useState([
    {
      id: 'csp-001',
      name: 'Rajesh Kumar',
      location: 'North District, Chandpur',
      status: 'active',
      riskScore: 0.1,
      lastAudit: '2024-04-15',
      complianceScore: 95,
      transactions: 450
    },
    {
      id: 'csp-002',
      name: 'Priya Sharma',
      location: 'South District, Rampur',
      status: 'active',
      riskScore: 0.05,
      lastAudit: '2024-04-10',
      complianceScore: 98,
      transactions: 320
    },
    {
      id: 'csp-003',
      name: 'Ankit Patel',
      location: 'East District, Sundarpur',
      status: 'flagged',
      riskScore: 0.35,
      lastAudit: '2024-03-22',
      complianceScore: 78,
      transactions: 280
    },
    {
      id: 'csp-004',
      name: 'Meera Desai',
      location: 'West District, Shivpura',
      status: 'suspended',
      riskScore: 0.65,
      lastAudit: '2024-03-05',
      complianceScore: 62,
      transactions: 0
    },
    {
      id: 'csp-005',
      name: 'Vikram Singh',
      location: 'North District, Pratapnagar',
      status: 'active',
      riskScore: 0.15,
      lastAudit: '2024-04-18',
      complianceScore: 91,
      transactions: 380
    },
    {
      id: 'csp-006',
      name: 'Neha Gupta',
      location: 'Central District, Gopalnagar',
      status: 'pending',
      riskScore: 0.2,
      lastAudit: 'Not audited yet',
      complianceScore: 0,
      transactions: 0
    },
  ]);
  
  const [filteredAgents, setFilteredAgents] = useState(cspAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    let filtered = cspAgents;
    
    if (searchTerm) {
      filtered = filtered.filter(agent => 
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(agent => agent.status === statusFilter);
    }
    
    setFilteredAgents(filtered);
  }, [searchTerm, statusFilter, cspAgents]);
  
  const handleStatusChange = (agentId: string, newStatus: string) => {
    const updatedAgents = cspAgents.map(agent => 
      agent.id === agentId ? { ...agent, status: newStatus } : agent
    );
    
    setCspAgents(updatedAgents);
    
    toast({
      title: "Status Updated",
      description: `Agent status has been changed to ${newStatus}`,
    });
  };
  
  const activeCount = cspAgents.filter(agent => agent.status === 'active').length;
  const flaggedCount = cspAgents.filter(agent => agent.status === 'flagged').length;
  const suspendedCount = cspAgents.filter(agent => agent.status === 'suspended').length;
  const pendingCount = cspAgents.filter(agent => agent.status === 'pending').length;
  
  const totalTransactions = cspAgents.reduce((sum, agent) => sum + agent.transactions, 0);
  const avgComplianceScore = cspAgents
    .filter(agent => agent.complianceScore > 0)
    .reduce((sum, agent) => sum + agent.complianceScore, 0) / 
    cspAgents.filter(agent => agent.complianceScore > 0).length;
    
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">CSP Agent Management</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active CSPs"
          value={`${activeCount}`}
          description="Currently operating"
          icon={UserCog}
          isLoading={false}
        />
        <StatsCard
          title="Flagged CSPs"
          value={`${flaggedCount}`}
          description="Requiring attention"
          icon={AlertTriangle}
          isLoading={false}
        />
        <StatsCard
          title="Total Transactions"
          value={`${totalTransactions.toLocaleString()}`}
          description="Last 30 days"
          icon={Activity}
          isLoading={false}
        />
        <StatsCard
          title="Avg. Compliance"
          value={`${avgComplianceScore.toFixed(1)}%`}
          description="Across active CSPs"
          icon={Activity}
          isLoading={false}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>CSP Agent Directory</CardTitle>
          <CardDescription>Manage and monitor CSP agents in your cluster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, location or ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="shrink-0">
              <UserPlus className="mr-2 h-4 w-4" />
              Add CSP
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CSP ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Score</TableHead>
                  <TableHead>Last Audit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No CSP agents found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAgents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.id}</TableCell>
                      <TableCell>{agent.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span>{agent.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={agent.status} />
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${
                          agent.riskScore > 0.5 ? 'text-red-600' :
                          agent.riskScore > 0.3 ? 'text-amber-500' :
                          'text-green-600'
                        }`}>
                          {Math.round(agent.riskScore * 100)}%
                        </div>
                      </TableCell>
                      <TableCell>{agent.lastAudit}</TableCell>
                      <TableCell>
                        <Select 
                          defaultValue={agent.status}
                          onValueChange={(value) => handleStatusChange(agent.id, value)}
                        >
                          <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Activate</SelectItem>
                            <SelectItem value="flagged">Flag</SelectItem>
                            <SelectItem value="suspended">Suspend</SelectItem>
                          </SelectContent>
                        </Select>
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
            Showing {filteredAgents.length} of {cspAgents.length} CSP agents
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CSPManagement;

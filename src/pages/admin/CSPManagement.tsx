
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SearchIcon, PlusCircle, Filter } from 'lucide-react';
import { CSPAgent } from '@/types/agent.types';

// Mock data until we have proper Supabase tables
const mockAgents: CSPAgent[] = [
  { id: '1', name: 'John Smith', bank_id: 'SBI-001', risk_score: 0.25, status: 'active', location: 'New Delhi', lastAudit: '2025-04-12' },
  { id: '2', name: 'Priya Sharma', bank_id: 'PNB-045', risk_score: 0.72, status: 'flagged', location: 'Mumbai', lastAudit: '2025-03-22' },
  { id: '3', name: 'Arun Kumar', bank_id: 'BOI-118', risk_score: 0.41, status: 'active', location: 'Bangalore', lastAudit: '2025-04-01' },
  { id: '4', name: 'Neha Patel', bank_id: 'ICICI-287', risk_score: 0.18, status: 'active', location: 'Hyderabad', lastAudit: '2025-04-15' },
  { id: '5', name: 'Raj Malhotra', bank_id: 'AXIS-192', risk_score: 0.89, status: 'suspended', location: 'Chennai', lastAudit: '2025-02-28' },
];

const CSPManagement: React.FC = () => {
  const [agents, setAgents] = useState<CSPAgent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setAgents(mockAgents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredAgents = agents.filter(
    agent => 
      agent.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      agent.bank_id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteAgent = async (id: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
  };

  const getStatusBadgeColor = (status: string | undefined) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'suspended': return 'bg-red-500';
      case 'flagged': return 'bg-amber-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-csp-navy">CSP Management</h1>
        <Button className="bg-csp-blue">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Agent
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or bank ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CSP Agents</CardTitle>
          <CardDescription>Manage and monitor your CSP agents</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-csp-blue border-t-transparent"></div>
            </div>
          ) : filteredAgents.length === 0 ? (
            <p className="py-4 text-center text-muted-foreground">No CSP agents found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="whitespace-nowrap px-4 py-3 font-medium">Agent</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium">Location</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium">Status</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium">Risk Score</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium">Last Audit</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map(agent => (
                    <tr key={agent.id} className="border-b">
                      <td className="px-4 py-3">
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.bank_id}</div>
                      </td>
                      <td className="px-4 py-3">{agent.location}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={`${getStatusBadgeColor(agent.status)} text-white`}>
                          {agent.status?.charAt(0).toUpperCase() + agent.status?.slice(1) || 'Unknown'}
                        </Badge>
                      </td>
                      <td className={`px-4 py-3 font-medium ${
                        (agent.risk_score || 0) > 0.7 ? 'text-red-600' : 
                        (agent.risk_score || 0) > 0.4 ? 'text-amber-600' : 
                        'text-green-600'
                      }`}>
                        {agent.risk_score ? `${(agent.risk_score * 100).toFixed(0)}%` : 'N/A'}
                      </td>
                      <td className="px-4 py-3">{agent.lastAudit}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button size="sm">View</Button>
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => handleDeleteAgent(agent.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CSPManagement;

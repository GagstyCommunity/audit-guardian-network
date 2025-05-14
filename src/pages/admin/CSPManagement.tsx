import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useSupabaseData, mutateSupabaseData } from '@/hooks/useSupabaseData';
import { toast } from '@/components/ui/use-toast';
import { CSPAgent } from '@/types/agent.types';

const CSPManagement: React.FC = () => {
  const [agents, setAgents] = useState<CSPAgent[]>([]);
  const { data, loading, error, refetch } = useSupabaseData<CSPAgent>('csp_agents');

  useEffect(() => {
    if (data) {
      setAgents(data);
    }
  }, [data]);

  const handleDeleteAgent = async (id: string) => {
    try {
      await mutateSupabaseData('delete', 'csp_agents', undefined, { column: 'id', value: id });
      toast({
        title: "Success",
        description: "Agent deleted successfully.",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete agent.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">CSP Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>CSP Agents</CardTitle>
          <CardDescription>Manage your CSP agents here.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading agents...</p>
          ) : error ? (
            <p>Error loading agents: {error}</p>
          ) : agents.length === 0 ? (
            <p>No CSP agents found.</p>
          ) : (
            <ul>
              {agents.map(agent => (
                <li key={agent.id} className="flex justify-between items-center py-2">
                  <span>{agent.name || 'Unnamed Agent'}</span>
                  <Button variant="destructive" onClick={() => handleDeleteAgent(agent.id)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CSPManagement;

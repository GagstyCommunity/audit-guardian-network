
import React, { useState, useEffect } from 'react';
import { 
  Card,
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { 
  AlertTriangle, 
  ArrowRight, 
  BarChart3, 
  Clock, 
  Shield, 
  Users,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { CSPAgent } from '@/types/agent.types';
import MockData from '@/services/mockDataService';

// Define types for the data we're fetching
interface FraudAlert {
  id: string;
  alert_type?: string;
  risk_level?: string;
  status?: string;
  detected_at?: string;
  details?: string;
}

interface Audit {
  id: string;
  scheduled_for?: string;
  priority?: number;
  status?: string;
  agent_id?: string;
  auditor_id?: string;
  location?: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cspAgents, setCspAgents] = useState<CSPAgent[]>([]);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [audits, setAudits] = useState<Audit[]>([]);
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setCspAgents(MockData.agents(10).sort((a, b) => (b.risk_score || 0) - (a.risk_score || 0)).slice(0, 5));
      setFraudAlerts(MockData.fraudAlerts(5));
      setAudits(MockData.audits(5));
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not scheduled';
    try {
      return format(new Date(dateString), 'PP');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  // Columns for high risk agents
  const agentColumns: Column<CSPAgent>[] = [
    {
      header: 'Agent',
      accessorKey: (row) => (
        <div>
          <div className="font-medium">{row.profile?.name || row.name}</div>
          <div className="text-sm text-muted-foreground">{row.bank_id}</div>
        </div>
      ),
    },
    {
      header: 'Risk Score',
      accessorKey: (row) => (
        <div className={`font-medium ${
          (row.risk_score || 0) > 0.7 ? 'text-destructive' : 
          (row.risk_score || 0) > 0.4 ? 'text-amber-500' : 
          'text-green-600'
        }`}>
          {((row.risk_score || 0) * 100).toFixed(0)}%
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: (row) => (
        <StatusBadge status={row.status || 'unknown'} />
      ),
    },
  ];
  
  // Columns for fraud alerts
  const alertColumns: Column<FraudAlert>[] = [
    {
      header: 'Alert Type',
      accessorKey: (row) => (
        <div className="flex items-center">
          <AlertTriangle className={`mr-2 h-4 w-4 ${
            row.risk_level === 'critical' || row.risk_level === 'high' ? 'text-destructive' : 'text-amber-500'
          }`} />
          <span>{row.alert_type}</span>
        </div>
      ),
    },
    {
      header: 'Risk Level',
      accessorKey: (row) => (
        <StatusBadge status={row.risk_level || 'unknown'} />
      ),
    },
    {
      header: 'Status',
      accessorKey: (row) => (
        <StatusBadge status={row.status || 'unknown'} />
      ),
    },
  ];
  
  // Columns for audits
  const auditColumns: Column<Audit>[] = [
    {
      header: 'Scheduled For',
      accessorKey: (row) => (
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{formatDate(row.scheduled_for)}</span>
        </div>
      ),
    },
    {
      header: 'Priority',
      accessorKey: (row) => (
        <StatusBadge 
          status={row.priority === 1 ? 'high' : row.priority === 2 ? 'medium' : 'low'} 
        />
      ),
    },
    {
      header: 'Status',
      accessorKey: (row) => (
        <StatusBadge status={row.status || 'unknown'} />
      ),
    },
  ];
  
  const totalActive = cspAgents.filter(agent => agent.status === 'active').length;
  const openAlerts = fraudAlerts.filter(alert => alert.status === 'open').length;
  const pendingAudits = audits.filter(audit => audit.status === 'pending').length;
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total CSP Agents"
          value={`${totalActive}`}
          description="Active agents"
          icon={Users}
          trend={{ value: 12, isPositive: true, label: "from last month" }}
          isLoading={loading}
        />
        <StatsCard
          title="Pending Audits"
          value={`${pendingAudits}`}
          description="Scheduled for this week"
          icon={Clock}
          isLoading={loading}
        />
        <StatsCard
          title="Open Fraud Alerts"
          value={`${openAlerts}`}
          description="Requiring attention"
          icon={AlertTriangle}
          trend={{ value: 5, isPositive: false, label: "since yesterday" }}
          isLoading={loading}
        />
        <StatsCard
          title="System Status"
          value={loading ? "Loading..." : openAlerts > 3 ? "At Risk" : "Normal"}
          description="All systems operational"
          icon={Activity}
          isLoading={loading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>High Risk CSP Agents</CardTitle>
            <CardDescription>Agents with elevated risk scores</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={cspAgents}
              columns={agentColumns}
              loading={loading}
              emptyState="No high risk agents found"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/csp-management')}>
              View All Agents
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Fraud Alerts</CardTitle>
            <CardDescription>Newest detected system alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              data={fraudAlerts}
              columns={alertColumns}
              loading={loading}
              emptyState="No recent fraud alerts"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/fraud-engine')}>
              View All Alerts
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Audits</CardTitle>
          <CardDescription>Scheduled audits that require attention</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={audits}
            columns={auditColumns}
            loading={loading}
            emptyState="No upcoming audits"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/audit-assignment')}>
            Manage Audits
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-blue-600" />
            System Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">War Mode: {
                loading ? "Loading..." : openAlerts > 5 ? (
                  <span className="text-destructive">Recommended</span>
                ) : (
                  <span className="text-green-600">Not Active</span>
                )
              }</div>
              <p className="text-muted-foreground">
                {loading ? "Loading system status..." : 
                 openAlerts > 5
                  ? "High number of security alerts detected. Consider activating War Mode."
                  : "System operating under normal conditions."}
              </p>
            </div>
            <Button 
              variant={loading ? "outline" : openAlerts > 5 ? "destructive" : "outline"}
              onClick={() => navigate('/admin/war-mode')}
            >
              War Mode Controls
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

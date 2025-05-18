
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { AlertTriangle, ArrowUpRight, Search, CircleDollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { StatsCard } from '@/components/shared/StatsCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createColumns } from '@/utils/tableHelpers';

interface FraudAlert {
  id: string;
  csp_id: string;
  alert_type: string;
  description: string;
  detected_at: string;
  risk_level: string;
  status: string;
  csp: {
    bank_id: string;
    profile: {
      name: string;
    }
  }
}

const FraudEngine: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: fraudAlerts, loading } = useSupabaseData<FraudAlert>('fraud_alerts', {
    select: '*, csp:csp_agents(bank_id, profile:profiles(name))',
    orderBy: { column: 'detected_at', ascending: false }
  });

  const filteredAlerts = fraudAlerts.filter(alert => 
    alert.csp?.profile?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.alert_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    alert.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highRiskAlerts = fraudAlerts.filter(alert => alert.risk_level === 'high' || alert.risk_level === 'critical');
  const openAlerts = fraudAlerts.filter(alert => alert.status === 'open');

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'PPp');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  const getRiskScore = () => {
    if (fraudAlerts.length === 0) return 0;
    const riskMap = { 'low': 0.25, 'medium': 0.5, 'high': 0.75, 'critical': 1 };
    const sum = fraudAlerts.reduce((acc, alert) => 
      acc + (riskMap[alert.risk_level as keyof typeof riskMap] || 0), 0);
    return Math.min(100, Math.round((sum / fraudAlerts.length) * 100));
  };

  const riskScore = getRiskScore();
  
  const columns = createColumns<FraudAlert>([
    {
      header: 'Alert Type',
      accessorKey: (row) => (
        <div className="flex items-center">
          <AlertTriangle className={`mr-2 h-4 w-4 ${
            row.risk_level === 'critical' || row.risk_level === 'high' ? 'text-destructive' : 'text-amber-500'
          }`} />
          <div>
            <div className="font-medium">{row.alert_type}</div>
            <div className="text-sm text-muted-foreground">
              {formatDate(row.detected_at)}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'CSP Agent',
      accessorKey: (row) => (
        <div>
          <div className="font-medium">{row.csp?.profile?.name || 'Unknown'}</div>
          <div className="text-sm text-muted-foreground">{row.csp?.bank_id || 'No ID'}</div>
        </div>
      ),
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Risk Level',
      accessorKey: (row) => (
        <StatusBadge status={row.risk_level} />
      ),
    },
    {
      header: 'Status',
      accessorKey: (row) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      header: 'Actions',
      accessorKey: (row) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            Review
          </Button>
          {row.status === 'open' && (
            <Button size="sm" className="h-8">
              Resolve
            </Button>
          )}
        </div>
      ),
    },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-csp-navy">Fraud Engine</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          title="System Risk Score"
          value={`${riskScore}%`}
          description="Overall system risk assessment"
          icon={CircleDollarSign}
          isLoading={loading}
        />
        <StatsCard
          title="High Risk Alerts"
          value={highRiskAlerts.length.toString()}
          description="Critical and high risk alerts"
          icon={AlertTriangle}
          trend={{ value: 12, isPositive: false, label: "since last week" }}
          isLoading={loading}
        />
        <StatsCard
          title="Open Alerts"
          value={openAlerts.length.toString()}
          description="Alerts requiring attention"
          icon={AlertTriangle}
          isLoading={loading}
        />
      </div>
      
      {highRiskAlerts.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Critical Alerts Detected</AlertTitle>
          <AlertDescription>
            There are {highRiskAlerts.length} high-risk alerts that require immediate attention.
          </AlertDescription>
        </Alert>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Fraud Alerts</CardTitle>
          <CardDescription>Review and manage system detected fraud alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <DataTable
            data={filteredAlerts}
            columns={columns}
            loading={loading}
            emptyState="No fraud alerts found"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredAlerts.length} of {fraudAlerts.length} alerts
          </div>
          <Button variant="outline" className="flex items-center">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            View All Alerts
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FraudEngine;

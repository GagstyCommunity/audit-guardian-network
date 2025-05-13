import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { useAuth } from '@/contexts/AuthContext';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable, Column } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { format } from 'date-fns';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle,
  CreditCard,
  IndianRupee,
  MapPin,
  User,
  Wallet
} from 'lucide-react';

// Define interface types for our data
interface CSPAgent {
  id: string;
  status?: string;
  risk_score?: number;
  district?: string;
  state?: string;
  is_in_red_zone?: boolean;
}

interface Transaction {
  transaction_date: string;
  transaction_type: string;
  receipt_id: string;
  status: string;
  amount: number;
  fee_charged?: number;
}

interface FaceVerification {
  verified_at: string;
}

interface Dispute {
  dispute_type: string;
  created_at: string;
  status: string;
}

const CSPAgentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  
  const { data: cspAgents } = useSupabaseData<CSPAgent>('csp_agents', {
    column: 'profile_id',
    value: authState.user?.id
  });
  
  const currentAgent = cspAgents.length > 0 ? cspAgents[0] : null;
  
  const { data: transactions, loading: transactionsLoading } = useSupabaseData<Transaction>('transactions', {
    column: 'csp_id',
    value: currentAgent?.id,
    orderBy: { column: 'transaction_date', ascending: false },
    limit: 5
  });
  
  const { data: verifications } = useSupabaseData<FaceVerification>('face_verifications', {
    column: 'profile_id',
    value: authState.user?.id,
    orderBy: { column: 'verified_at', ascending: false },
    limit: 1
  });
  
  const { data: disputes, loading: disputesLoading } = useSupabaseData<Dispute>('disputes', {
    column: 'csp_id',
    value: currentAgent?.id,
    orderBy: { column: 'created_at', ascending: false },
    limit: 3
  });
  
  const lastVerification = verifications.length > 0 ? verifications[0] : null;
  const verifiedToday = lastVerification ? 
    new Date(lastVerification.verified_at).toDateString() === new Date().toDateString() : false;
  
  // Calculate key metrics
  const todayTransactions = transactions.filter(tx => 
    new Date(tx.transaction_date).toDateString() === new Date().toDateString()
  );
  
  const todaysTotal = todayTransactions.reduce(
    (sum, tx) => sum + (tx.status === 'success' ? tx.amount : 0), 0
  );
  
  const todaysCommission = todayTransactions.reduce(
    (sum, tx) => sum + (tx.status === 'success' ? (tx.fee_charged || 0) : 0), 0
  );
  
  const successRate = transactions.length > 0
    ? (transactions.filter(tx => tx.status === 'success').length / transactions.length * 100).toFixed(0)
    : '0';
  
  // Format functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'PP');
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  // Table columns
  const transactionColumns: Column<Transaction>[] = [
    {
      header: 'Receipt ID',
      accessorKey: 'receipt_id',
    },
    {
      header: 'Type',
      accessorKey: (row) => (
        <Badge variant="outline" className="capitalize">
          {row.transaction_type.toLowerCase().replace('_', ' ')}
        </Badge>
      ),
    },
    {
      header: 'Amount',
      accessorKey: (row) => (
        <div className="font-medium">{formatCurrency(row.amount)}</div>
      ),
    },
    {
      header: 'Status',
      accessorKey: (row) => (
        <StatusBadge status={row.status} />
      ),
    },
  ];
  
  const disputeColumns: Column<Dispute>[] = [
    {
      header: 'Dispute Type',
      accessorKey: (row) => (
        <div className="capitalize">{row.dispute_type.toLowerCase().replace('_', ' ')}</div>
      ),
    },
    {
      header: 'Date',
      accessorKey: (row) => (
        <div>{formatDate(row.created_at)}</div>
      ),
    },
    {
      header: 'Status',
      accessorKey: (row) => (
        <StatusBadge status={row.status} />
      ),
    },
  ];
  
  return (
    <div className="space-y-6">
      {!verifiedToday && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Facial Verification Required</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            <span>You need to complete your daily facial verification to access all features.</span>
            <Button size="sm" onClick={() => navigate('/agent/check-in')}>
              Verify Now
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      {currentAgent?.is_in_red_zone && (
        <Alert>
          <MapPin className="h-4 w-4" />
          <AlertTitle>Red Zone Notice</AlertTitle>
          <AlertDescription>
            You are currently operating in a designated red zone. Additional security protocols are active.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Today's Transactions"
          value={todayTransactions.length.toString()}
          description="Total transactions today"
          icon={CreditCard}
          isLoading={transactionsLoading}
        />
        <StatsCard
          title="Today's Volume"
          value={formatCurrency(todaysTotal)}
          description="Total transaction value"
          icon={IndianRupee}
          isLoading={transactionsLoading}
        />
        <StatsCard
          title="Commission Earned"
          value={formatCurrency(todaysCommission)}
          description="Today's earnings"
          icon={Wallet}
          isLoading={transactionsLoading}
        />
        <StatsCard
          title="Success Rate"
          value={`${successRate}%`}
          description="Transaction success rate"
          icon={CheckCircle}
          isLoading={transactionsLoading}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest customer transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={transactions}
                columns={transactionColumns}
                loading={transactionsLoading}
                emptyMessage="No recent transactions"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => navigate('/agent/transactions')}>
                View All Transactions
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Agent Status</CardTitle>
              <CardDescription>Your current operational status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Account Status</span>
                  <StatusBadge status={currentAgent?.status || 'unknown'} />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Verification Status</span>
                  <StatusBadge status={verifiedToday ? 'success' : 'pending'} customLabel={verifiedToday ? 'Verified Today' : 'Required'} />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Location</span>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">
                      {currentAgent?.district}, {currentAgent?.state}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Risk Score</span>
                  <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    (currentAgent?.risk_score || 0) > 0.5 ? 'bg-red-100 text-red-800' : 
                    (currentAgent?.risk_score || 0) > 0.3 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {currentAgent ? ((currentAgent.risk_score || 0) * 100).toFixed(0) : 0}%
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => navigate('/agent/check-in')}>
                <User className="mr-1.5 h-4 w-4" />
                Face Verification
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Open Disputes</CardTitle>
              <CardDescription>Customer issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={disputes}
                columns={disputeColumns}
                loading={disputesLoading}
                emptyMessage="No open disputes"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => navigate('/agent/dispute')}>
                View All Disputes
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CSPAgentDashboard;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { DataTable } from '@/components/shared/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, Download, Filter, IndianRupee, Printer, Search, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { format } from 'date-fns';
import { StatsCard } from '@/components/shared/StatsCard';
import { useAuth } from '@/contexts/AuthContext';

interface Transaction {
  id: string;
  transaction_type: string;
  amount: number;
  status: string;
  customer_name: string;
  customer_id: string;
  transaction_date: string;
  fee_charged: number;
  receipt_id: string;
}

const Transactions: React.FC = () => {
  const { authState } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const { data: transactions, loading } = useSupabaseData<Transaction>('transactions');

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'PPp');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.receipt_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer_id?.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = typeFilter === 'all' || transaction.transaction_type === typeFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const today = new Date();
      const txDate = new Date(transaction.transaction_date);
      
      if (dateFilter === 'today') {
        matchesDate = txDate.toDateString() === today.toDateString();
      } else if (dateFilter === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        matchesDate = txDate >= weekAgo;
      } else if (dateFilter === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        matchesDate = txDate >= monthAgo;
      }
    }
    
    return matchesSearch && matchesType && matchesDate;
  });

  // Calculate statistics
  const totalAmount = filteredTransactions.reduce(
    (sum, tx) => sum + (tx.status === 'success' ? tx.amount : 0), 0
  );
  
  const totalFees = filteredTransactions.reduce(
    (sum, tx) => sum + (tx.status === 'success' ? (tx.fee_charged || 0) : 0), 0
  );
  
  const successCount = filteredTransactions.filter(tx => tx.status === 'success').length;
  const failedCount = filteredTransactions.filter(tx => tx.status === 'failed').length;
  
  const successRate = filteredTransactions.length > 0
    ? (successCount / filteredTransactions.length * 100).toFixed(0)
    : '0';

  const columns = [
    {
      header: 'Receipt',
      accessorKey: 'receipt_id',
      cell: (row: Transaction) => (
        <div className="font-medium">{row.receipt_id}</div>
      ),
    },
    {
      header: 'Date & Time',
      accessorKey: 'transaction_date',
      cell: (row: Transaction) => (
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{formatDate(row.transaction_date)}</span>
        </div>
      ),
    },
    {
      header: 'Customer',
      accessorKey: 'customer_name',
      cell: (row: Transaction) => (
        <div>
          <div className="font-medium">{row.customer_name}</div>
          <div className="text-sm text-muted-foreground">{row.customer_id}</div>
        </div>
      ),
    },
    {
      header: 'Type',
      accessorKey: 'transaction_type',
      cell: (row: Transaction) => (
        <Badge variant="outline" className="capitalize">
          {row.transaction_type.toLowerCase().replace('_', ' ')}
        </Badge>
      ),
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: (row: Transaction) => (
        <div className="font-medium text-right">
          {formatCurrency(row.amount)}
        </div>
      ),
    },
    {
      header: 'Fee',
      accessorKey: 'fee_charged',
      cell: (row: Transaction) => (
        <div className="text-right">
          {row.fee_charged ? formatCurrency(row.fee_charged) : '₹0.00'}
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row: Transaction) => (
        <StatusBadge status={row.status} />
      ),
    },
    {
      header: 'Actions',
      accessorKey: 'id',
      cell: (row: Transaction) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            <Printer className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-csp-navy">Live Transactions</h1>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" /> New Transaction
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Transaction Value"
          value={formatCurrency(totalAmount)}
          description={`From ${filteredTransactions.length} transactions`}
          icon={IndianRupee}
          isLoading={loading}
        />
        <StatsCard
          title="Total Fees Collected"
          value={formatCurrency(totalFees)}
          description="Commission earned"
          icon={IndianRupee}
          isLoading={loading}
        />
        <StatsCard
          title="Success Rate"
          value={`${successRate}%`}
          description={`${successCount} successful / ${failedCount} failed`}
          isLoading={loading}
        />
        <StatsCard
          title="Today's Transactions"
          value={filteredTransactions.filter(tx => {
            const today = new Date().toDateString();
            const txDate = new Date(tx.transaction_date).toDateString();
            return txDate === today;
          }).length.toString()}
          description="Transactions today"
          icon={Calendar}
          isLoading={loading}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View and manage all customer transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center w-full md:w-auto">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer name, ID or receipt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[300px]"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="AEPS_WITHDRAWAL">AEPS Withdrawal</SelectItem>
                  <SelectItem value="CASH_DEPOSIT">Cash Deposit</SelectItem>
                  <SelectItem value="BBPS_BILL">BBPS Bill Payment</SelectItem>
                  <SelectItem value="MICRO_ATM">Micro ATM</SelectItem>
                  <SelectItem value="MONEY_TRANSFER">Money Transfer</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <DataTable
            data={filteredTransactions}
            columns={columns}
            loading={loading}
            emptyMessage="No transactions found"
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Transactions;

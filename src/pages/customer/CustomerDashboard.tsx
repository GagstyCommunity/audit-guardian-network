
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Bell, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  AlertCircle,
  MapPin,
  Calendar
} from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  // Mock data for customer dashboard
  const accountBalance = "₹45,230.75";
  const savings = "₹12,500.00";
  const pendingActions = 2;

  // Recent transactions mock data
  const recentTransactions = [
    { id: 1, type: 'credit', description: 'Salary Credit', amount: '₹32,500.00', date: '2 days ago' },
    { id: 2, type: 'debit', description: 'Mobile Recharge', amount: '₹599.00', date: '3 days ago' },
    { id: 3, type: 'debit', description: 'Grocery Shopping', amount: '₹1,235.50', date: '5 days ago' },
    { id: 4, type: 'credit', description: 'Refund', amount: '₹450.00', date: 'Yesterday' }
  ];

  // Upcoming payments mock data
  const upcomingPayments = [
    { id: 1, description: 'Electricity Bill', amount: '₹1,250.00', dueDate: 'May 22, 2025' },
    { id: 2, description: 'Home Loan EMI', amount: '₹12,500.00', dueDate: 'May 28, 2025' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-primary/10 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-primary mb-2">Welcome back, {user?.name || 'Customer'}</h1>
        <p className="text-gray-600">Access your accounts, track transactions, and manage your banking needs with ease.</p>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">ACCOUNT BALANCE</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountBalance}</div>
            <p className="text-xs text-gray-500 mt-1">Primary Savings Account</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">TOTAL SAVINGS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savings}</div>
            <p className="text-xs text-gray-500 mt-1">Across all accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">PENDING ACTIONS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingActions}</div>
            <p className="text-xs text-gray-500 mt-1">Requires your attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Alert>
        <Bell className="h-4 w-4" />
        <AlertTitle>New Feature Available!</AlertTitle>
        <AlertDescription>
          You can now verify CSP agents directly from your dashboard. Try our new verification feature.
        </AlertDescription>
      </Alert>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest account activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`rounded-full p-2 ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {transaction.type === 'credit' ? 
                      <ArrowDownLeft className="h-4 w-4 text-green-600" /> : 
                      <ArrowUpRight className="h-4 w-4 text-red-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Transactions</Button>
        </CardFooter>
      </Card>

      {/* Upcoming Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payments</CardTitle>
          <CardDescription>Bills and recurring payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingPayments.map(payment => (
              <div key={payment.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full p-2 bg-blue-100">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-xs text-gray-500">Due: {payment.dueDate}</p>
                  </div>
                </div>
                <div className="font-medium">{payment.amount}</div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Manage Payments</Button>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="flex flex-col h-24 items-center justify-center space-y-2">
              <CreditCard className="h-5 w-5" />
              <span className="text-sm">Fund Transfer</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-24 items-center justify-center space-y-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Find CSP</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-24 items-center justify-center space-y-2">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">Report Issue</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboard;

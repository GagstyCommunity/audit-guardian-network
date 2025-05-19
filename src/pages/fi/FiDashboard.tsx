
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const FiDashboard: React.FC = () => {
  const { authState } = useAuth();
  const user = authState.user;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Financial Institution Agent Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.name}</CardTitle>
            <CardDescription>Financial Institution Agent Portal</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You are now logged in as a Financial Institution Agent. From here you can manage your financial operations.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>Financial requests awaiting your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">12</div>
            <p className="text-sm text-muted-foreground">Pending requests to review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Transactions</CardTitle>
            <CardDescription>Transaction overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">₹34,521</div>
            <p className="text-sm text-muted-foreground">Total transaction volume today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FiDashboard;

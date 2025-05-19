
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const CustomerAccounts: React.FC = () => {
  // Dummy data for demonstration
  const accounts = [
    { id: 1, name: 'Rahul Sharma', accountNumber: '1234567890', balance: '₹24,500', status: 'active' },
    { id: 2, name: 'Priya Patel', accountNumber: '2345678901', balance: '₹8,750', status: 'active' },
    { id: 3, name: 'Amit Kumar', accountNumber: '3456789012', balance: '₹15,200', status: 'blocked' },
    { id: 4, name: 'Neha Gupta', accountNumber: '4567890123', balance: '₹32,600', status: 'active' },
    { id: 5, name: 'Sanjay Singh', accountNumber: '5678901234', balance: '₹5,100', status: 'pending' },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Customer Accounts</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{account.accountNumber}</TableCell>
                  <TableCell>{account.balance}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      account.status === 'active' ? 'bg-green-100 text-green-800' : 
                      account.status === 'blocked' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {account.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerAccounts;

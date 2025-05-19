
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDownToLine, ArrowUpFromLine, FileText, Download } from 'lucide-react';

const AccountDetails: React.FC = () => {
  // Mock account data
  const account = {
    accountNumber: '1234567890',
    ifscCode: 'BANK0001234',
    accountType: 'Savings Account',
    balance: '₹45,230.75',
    availableBalance: '₹45,230.75',
    holdAmount: '₹0.00',
    branch: 'Main Branch',
    dateOpened: 'Jan 15, 2022',
    interestRate: '3.5%',
    nomineeName: 'Radha Sharma',
  };

  // Mock transaction history
  const transactions = [
    { id: 1, date: '2025-05-18', description: 'Salary Credit', reference: 'TXN78965412', amount: '+₹32,500.00', balance: '₹45,230.75', type: 'credit' },
    { id: 2, date: '2025-05-17', description: 'Mobile Recharge', reference: 'TXN78965354', amount: '-₹599.00', balance: '₹12,730.75', type: 'debit' },
    { id: 3, date: '2025-05-15', description: 'ATM Withdrawal', reference: 'TXN78963354', amount: '-₹2,000.00', balance: '₹13,329.75', type: 'debit' },
    { id: 4, date: '2025-05-12', description: 'Fund Transfer', reference: 'TXN78961354', amount: '-₹5,000.00', balance: '₹15,329.75', type: 'debit' },
    { id: 5, date: '2025-05-10', description: 'Interest Credit', reference: 'TXN78961234', amount: '+₹125.50', balance: '₹20,329.75', type: 'credit' },
    { id: 6, date: '2025-05-05', description: 'Utility Bill Payment', reference: 'TXN78961111', amount: '-₹1,235.00', balance: '₹20,204.25', type: 'debit' },
    { id: 7, date: '2025-05-01', description: 'Salary Credit', reference: 'TXN78960111', amount: '+₹32,500.00', balance: '₹21,439.25', type: 'credit' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Account Details</h1>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Download Statement
          </Button>
          <Button size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Request Statement by Email
          </Button>
        </div>
      </div>

      {/* Account Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Account Summary</CardTitle>
          <CardDescription>Savings Account - {account.accountNumber}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-500">Account Number</span>
                <span className="font-medium">{account.accountNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-500">IFSC Code</span>
                <span className="font-medium">{account.ifscCode}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-500">Account Type</span>
                <span className="font-medium">{account.accountType}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-500">Branch</span>
                <span className="font-medium">{account.branch}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-500">Date Opened</span>
                <span className="font-medium">{account.dateOpened}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-500">Current Balance</span>
                <span className="font-medium">{account.balance}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-500">Available Balance</span>
                <span className="font-medium">{account.availableBalance}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-500">Hold Amount</span>
                <span className="font-medium">{account.holdAmount}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-500">Interest Rate</span>
                <span className="font-medium">{account.interestRate}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-gray-500">Nominee</span>
                <span className="font-medium">{account.nomineeName}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent transactions from your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount}
                  </TableCell>
                  <TableCell>{transaction.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline">
              Load More Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountDetails;

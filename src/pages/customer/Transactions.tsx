
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Download, 
  Filter, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Calendar 
} from 'lucide-react';

const Transactions: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [transactionType, setTransactionType] = useState('all');

  // Mock transaction data
  const transactions = [
    { 
      id: 1, 
      date: '2025-05-18', 
      description: 'Salary Credit', 
      category: 'Income', 
      reference: 'TXN78965412', 
      amount: '+₹32,500.00', 
      status: 'Completed',
      type: 'credit' 
    },
    { 
      id: 2, 
      date: '2025-05-17', 
      description: 'Mobile Recharge', 
      category: 'Bill Payment', 
      reference: 'TXN78965354', 
      amount: '-₹599.00', 
      status: 'Completed',
      type: 'debit' 
    },
    { 
      id: 3, 
      date: '2025-05-15', 
      description: 'ATM Withdrawal', 
      category: 'Cash Withdrawal', 
      reference: 'TXN78963354', 
      amount: '-₹2,000.00', 
      status: 'Completed',
      type: 'debit' 
    },
    { 
      id: 4, 
      date: '2025-05-12', 
      description: 'Fund Transfer to Amit Kumar', 
      category: 'Transfer', 
      reference: 'TXN78961354', 
      amount: '-₹5,000.00', 
      status: 'Completed',
      type: 'debit' 
    },
    { 
      id: 5, 
      date: '2025-05-10', 
      description: 'Interest Credit', 
      category: 'Income', 
      reference: 'TXN78961234', 
      amount: '+₹125.50', 
      status: 'Completed',
      type: 'credit' 
    },
    { 
      id: 6, 
      date: '2025-05-05', 
      description: 'Utility Bill Payment', 
      category: 'Bill Payment', 
      reference: 'TXN78961111', 
      amount: '-₹1,235.00', 
      status: 'Completed',
      type: 'debit' 
    },
    { 
      id: 7, 
      date: '2025-05-01', 
      description: 'Salary Credit', 
      category: 'Income', 
      reference: 'TXN78960111', 
      amount: '+₹32,500.00', 
      status: 'Completed',
      type: 'credit' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Filter section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filter Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input placeholder="Search by description or reference" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="credit">Credits Only</SelectItem>
                  <SelectItem value="debit">Debits Only</SelectItem>
                  <SelectItem value="transfer">Transfers</SelectItem>
                  <SelectItem value="bill-payment">Bill Payments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`rounded-full p-1 ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.type === 'credit' ? 
                          <ArrowDownLeft className="h-3 w-3 text-green-600" /> : 
                          <ArrowUpRight className="h-3 w-3 text-red-600" />
                        }
                      </div>
                      <span>{transaction.description}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{transaction.category}</TableCell>
                  <TableCell className="hidden md:table-cell">{transaction.reference}</TableCell>
                  <TableCell className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 1-7 of 48 transactions
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;

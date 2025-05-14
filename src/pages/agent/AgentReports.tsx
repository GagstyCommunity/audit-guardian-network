
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Calendar,
  BarChart3,
  FileText,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AgentReports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-csp-navy">Agent Reports</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Select Period
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
            <CardDescription>Daily, weekly and monthly reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Daily Transaction Report</div>
                    <div className="text-sm text-gray-500">Summary of today's transactions</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Weekly Transaction Report</div>
                    <div className="text-sm text-gray-500">Last 7 days summary</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Monthly Transaction Report</div>
                    <div className="text-sm text-gray-500">May 2025 summary</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Compliance Reports</CardTitle>
            <CardDescription>Audit and regulatory reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <div className="font-medium">Audit Compliance Report</div>
                    <div className="text-sm text-gray-500">Last audit reports and findings</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <div className="font-medium">KYC Verification Report</div>
                    <div className="text-sm text-gray-500">Customer verification summary</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-green-600" />
                  <div>
                    <div className="font-medium">Security Compliance Report</div>
                    <div className="text-sm text-gray-500">Device and transaction security</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Custom Reports</CardTitle>
            <CardDescription>Generate custom reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transactions">Transaction Report</SelectItem>
                    <SelectItem value="customers">Customer Report</SelectItem>
                    <SelectItem value="commission">Commission Report</SelectItem>
                    <SelectItem value="disputes">Dispute Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    <SelectItem value="csv">CSV File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Generate Custom Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center">
                <FileText className="h-6 w-6 mr-4 text-gray-500" />
                <div>
                  <div className="font-medium">Daily Transaction Summary - 13 May 2025</div>
                  <div className="text-sm text-gray-500">Generated on 13 May 2025, 11:45 PM</div>
                </div>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center">
                <FileText className="h-6 w-6 mr-4 text-gray-500" />
                <div>
                  <div className="font-medium">Weekly Commission Report - W19 2025</div>
                  <div className="text-sm text-gray-500">Generated on 12 May 2025, 9:30 AM</div>
                </div>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center">
                <FileText className="h-6 w-6 mr-4 text-gray-500" />
                <div>
                  <div className="font-medium">Monthly KYC Compliance Report - April 2025</div>
                  <div className="text-sm text-gray-500">Generated on 1 May 2025, 12:15 PM</div>
                </div>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center">
                <FileText className="h-6 w-6 mr-4 text-gray-500" />
                <div>
                  <div className="font-medium">Dispute Resolution Summary - April 2025</div>
                  <div className="text-sm text-gray-500">Generated on 30 Apr 2025, 5:45 PM</div>
                </div>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentReports;

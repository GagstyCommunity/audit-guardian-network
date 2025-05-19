
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Users,
} from 'lucide-react';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import CSPAgentDashboard from '../components/dashboards/CSPAgentDashboard';
import AuditorDashboard from '../components/dashboards/AuditorDashboard';
import BankOfficerDashboard from '../components/dashboards/BankOfficerDashboard';
import CustomerDashboard from '../components/dashboards/CustomerDashboard';
import ArmyWelfareDashboard from '../components/dashboards/ArmyWelfareDashboard';
import { UserRole } from '@/types/auth.types';
import MockData from '@/services/mockDataService';

const DashboardSelector: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'csp_agent':
    case 'fi_agent':
      return <CSPAgentDashboard />;
    case 'field_auditor':
    case 'auditor':
      return <AuditorDashboard />;
    case 'bank_officer':
      return <BankOfficerDashboard />;
    case 'customer':
      return <CustomerDashboard />;
    case 'army_welfare_officer':
      return <ArmyWelfareDashboard />;
    case 'cluster_manager':
      return <ClusterManagerDashboard />;
    case 'ops_training':
      return <OpsTrainingDashboard />;
    case 'compliance':
      return <ComplianceDashboard />;
    case 'it_infra':
      return <ITInfraDashboard />;
    case 'hr':
      return <HRDashboard />;
    case 'customer_support':
      return <CustomerSupportDashboard />;
    default:
      return <div>No dashboard available for your role.</div>;
  }
};

const ClusterManagerDashboard: React.FC = () => {
  const [cspAgents, setCspAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCspAgents(MockData.agents(6));
      setLoading(false);
    }, 800);
  }, []);
  
  // Calculate stats
  const activeAgents = cspAgents.filter(agent => agent.status === 'active').length;
  const flaggedAgents = cspAgents.filter(agent => agent.status === 'flagged').length;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cluster Manager Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">CSP Agent Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-bold">{activeAgents}</div>
                <p className="text-sm text-muted-foreground">Active Agents</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">{flaggedAgents}</div>
                <p className="text-sm text-muted-foreground">Flagged Agents</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">{cspAgents.length - activeAgents - flaggedAgents}</div>
                <p className="text-sm text-muted-foreground">Other Status</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All CSP Agents
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Region Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">North District</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">South District</span>
                  <span className="text-sm font-medium">86%</span>
                </div>
                <Progress value={86} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">East District</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2 mt-1" />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Full Report
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Fraud Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Location Mismatch</span>
                  </div>
                  <Badge variant="destructive">High Risk</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Multiple Failed Logins</span>
                  </div>
                  <Badge variant="outline">Medium Risk</Badge>
                </div>
              </>
            )}
            <Button variant="outline" className="w-full mt-2">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>Action Required</AlertTitle>
        <AlertDescription>
          2 agents need to complete their monthly self-audit. Deadline: 5 days remaining.
        </AlertDescription>
      </Alert>
    </div>
  );
};

const OpsTrainingDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Operations & Training Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Onboarding Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">5</div>
                <p className="text-sm text-muted-foreground">Pending Verification</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">8</div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Onboarding Queue
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Training Programs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">KYC Compliance</div>
                  <div className="text-sm text-muted-foreground">May 25, 2025</div>
                </div>
                <Badge variant="outline" className="bg-green-50">Scheduled</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Fraud Prevention</div>
                  <div className="text-sm text-muted-foreground">June 10, 2025</div>
                </div>
                <Badge variant="outline" className="bg-green-50">Scheduled</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">New Services Training</div>
                  <div className="text-sm text-muted-foreground">TBD</div>
                </div>
                <Badge variant="outline">Planning</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Training
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">KYC Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">Approved</span>
                </div>
                <span className="font-medium">32</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm">Pending</span>
                </div>
                <span className="font-medium">18</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm">Rejected</span>
                </div>
                <span className="font-medium">7</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View KYC Queue
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Alert>
        <Clock className="h-4 w-4" />
        <AlertTitle>Upcoming Deadline</AlertTitle>
        <AlertDescription>
          New CSP candidates must complete their KYC verification by May 31, 2025.
        </AlertDescription>
      </Alert>
    </div>
  );
};

const ComplianceDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Compliance Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Audit Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-bold text-green-500">42</div>
                <p className="text-sm text-muted-foreground">Passed</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">8</div>
                <p className="text-sm text-muted-foreground">Minor Issues</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">3</div>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Review Audit Results
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-baseline">
              87% <span className="text-sm font-normal text-muted-foreground ml-2">Overall</span>
            </div>
            <div className="space-y-2 mt-4">
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Documentation</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">KYC Adherence</span>
                  <span className="text-sm font-medium">86%</span>
                </div>
                <Progress value={86} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Security Protocol</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2 mt-1" />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Compliance Details
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Fraud Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm">Unusual Transaction Pattern</span>
              </div>
              <Badge variant="destructive">High Risk</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm">Multiple Failed Logins</span>
              </div>
              <Badge variant="outline">Medium Risk</Badge>
            </div>
            <Button variant="outline" className="w-full mt-2">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>High Risk Alert</AlertTitle>
        <AlertDescription>
          3 agents have not completed their mandatory security training. Immediate action required.
        </AlertDescription>
      </Alert>
    </div>
  );
};

const ITInfraDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">IT Infrastructure Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Device Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-bold text-green-500">128</div>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">18</div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">7</div>
                <p className="text-sm text-muted-foreground">Offline</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Manage Devices
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Server Uptime</span>
                  <span className="text-sm font-medium">99.8%</span>
                </div>
                <Progress value={99.8} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">API Response</span>
                  <span className="text-sm font-medium">94%</span>
                </div>
                <Progress value={94} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Network Status</span>
                  <span className="text-sm font-medium">97%</span>
                </div>
                <Progress value={97} className="h-2 mt-1" />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View System Logs
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Equipment Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Micro-ATM Devices</div>
                <div className="text-sm text-muted-foreground">8 requests</div>
              </div>
              <Badge>Pending</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Biometric Scanners</div>
                <div className="text-sm text-muted-foreground">12 requests</div>
              </div>
              <Badge variant="outline">In Progress</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">POS Terminals</div>
                <div className="text-sm text-muted-foreground">5 requests</div>
              </div>
              <Badge variant="secondary">Approved</Badge>
            </div>
            <Button variant="outline" className="w-full mt-2">
              View All Requests
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Scheduled Maintenance</AlertTitle>
        <AlertDescription>
          System maintenance scheduled for May 25, 2025, 01:00 - 05:00 AM. Some services may be temporarily unavailable.
        </AlertDescription>
      </Alert>
    </div>
  );
};

const HRDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">HR Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Staff Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-bold">78</div>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">12</div>
                <p className="text-sm text-muted-foreground">On Leave</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">3</div>
                <p className="text-sm text-muted-foreground">Inactive</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Staff Directory
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Onboarding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <div>
                  <div className="font-medium">CSP Agents</div>
                  <div className="text-sm text-muted-foreground">8 new this month</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                <div>
                  <div className="font-medium">Field Auditors</div>
                  <div className="text-sm text-muted-foreground">3 new this month</div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>
            <Button variant="outline" className="w-full mt-2">
              View Onboarding Status
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Rajesh Kumar</span>
                </div>
                <Badge variant="secondary">CSP Agent</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Priya Sharma</span>
                </div>
                <Badge variant="secondary">Cluster Manager</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Vikram Singh</span>
                </div>
                <Badge variant="secondary">Field Auditor</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-2">
              View Leaderboard
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Upcoming Events</AlertTitle>
        <AlertDescription>
          Team Building Event scheduled for June 15, 2025. Registration closes on June 1st.
        </AlertDescription>
      </Alert>
    </div>
  );
};

const CustomerSupportDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Support Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Ticket Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <div className="text-2xl font-bold">18</div>
                <p className="text-sm text-muted-foreground">Open</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">7</div>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">42</div>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tickets
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-baseline">
              4.2 <span className="text-sm font-normal text-muted-foreground ml-2">hours avg.</span>
            </div>
            <div className="space-y-2 mt-4">
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">High Priority</span>
                  <span className="text-sm font-medium">1.5 hrs</span>
                </div>
                <Progress value={75} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Medium Priority</span>
                  <span className="text-sm font-medium">3.8 hrs</span>
                </div>
                <Progress value={65} className="h-2 mt-1" />
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Low Priority</span>
                  <span className="text-sm font-medium">7.2 hrs</span>
                </div>
                <Progress value={55} className="h-2 mt-1" />
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Detailed Report
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Common Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Transaction Failures</div>
                <div className="text-sm text-muted-foreground">28 tickets</div>
              </div>
              <Badge>32%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Device Malfunction</div>
                <div className="text-sm text-muted-foreground">22 tickets</div>
              </div>
              <Badge>26%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Fee Disputes</div>
                <div className="text-sm text-muted-foreground">15 tickets</div>
              </div>
              <Badge>18%</Badge>
            </div>
            <Button variant="outline" className="w-full mt-2">
              View Knowledge Base
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Priority Alert</AlertTitle>
        <AlertDescription>
          5 high-priority tickets have been waiting for more than 2 hours. Immediate attention required.
        </AlertDescription>
      </Alert>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-csp-navy">Dashboard</h1>
      <DashboardSelector />
    </div>
  );
};

export default Dashboard;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types/auth.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DemoUser {
  role: UserRole;
  email: string;
  name: string;
}

const demoUsers: DemoUser[] = [
  { role: 'admin', email: 'admin@example.com', name: 'Admin User' },
  { role: 'csp_agent', email: 'cspagent@example.com', name: 'CSP Agent' },
  { role: 'fi_agent', email: 'fiagent@example.com', name: 'FI Agent' },
  { role: 'auditor', email: 'auditor@example.com', name: 'Auditor User' },
  { role: 'bank_officer', email: 'bankofficer@example.com', name: 'Bank Officer' },
  { role: 'customer', email: 'customer@example.com', name: 'Customer User' },
  { role: 'army_welfare_officer', email: 'armywelfare@example.com', name: 'Army Welfare Officer' },
];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. For demo, use any email with password "password".');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoUserSelect = (role: string) => {
    const selectedUser = demoUsers.find(user => user.role === role);
    if (selectedUser) {
      setEmail(selectedUser.email);
      setPassword('password');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-csp-navy to-csp-blue p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-3">
            <Shield className="h-12 w-12 text-white" />
            <h1 className="text-3xl font-bold text-white">CSP Management</h1>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Login</CardTitle>
            <CardDescription className="text-center">
              Access the CSP Management Platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-csp-blue hover:bg-csp-steel"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mb-4">
              <p className="text-center text-sm text-muted-foreground">
                --- Demo Accounts ---
              </p>
            </div>
            <div className="w-full">
              <Select onValueChange={handleDemoUserSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a demo account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Demo Users</SelectLabel>
                    {demoUsers.map((user) => (
                      <SelectItem key={user.role} value={user.role}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              All demo accounts use password: "password"
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;

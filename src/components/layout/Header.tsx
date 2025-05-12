
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  LogOut, 
  Menu, 
  User,
  Shield
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'react-router-dom';
import { colorPalette } from '../../types/auth.types';

const roleLabels: Record<string, string> = {
  admin: 'Administrator',
  csp_agent: 'CSP Agent',
  fi_agent: 'FI Agent',
  auditor: 'Auditor',
  bank_officer: 'Bank Officer',
  customer: 'Customer',
  army_welfare_officer: 'Army Welfare Officer',
  guest: 'Guest'
};

const Header: React.FC = () => {
  const { authState, logout } = useAuth();
  const { user } = authState;
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Determine if any "War Mode" is active (this would come from a context in a real app)
  const isWarModeActive = false;

  // Function to get page title from route path
  const getPageTitle = () => {
    const path = location.pathname;
    
    // Default for dashboard routes
    if (path.includes('dashboard')) return 'Dashboard';
    
    // Other routes
    if (path === '/') return 'Home';
    if (path === '/login') return 'Login';
    if (path === '/unauthorized') return 'Unauthorized';
    
    // Capitalized path segments
    return path.split('/').filter(Boolean).map(
      segment => segment.charAt(0).toUpperCase() + segment.slice(1)
    ).join(' ');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left section with logo and title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleMobileMenu}
            className="block md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" style={{ color: colorPalette.primaryPurple }} />
          </button>
          
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8" style={{ color: colorPalette.primaryPurple }} />
            <span className="hidden text-xl font-bold sm:inline-block" style={{ color: colorPalette.primaryPurple }}>
              Bank Correspondent Portal
            </span>
          </div>
          
          {isWarModeActive && (
            <Badge variant="destructive" className="animate-pulse-slow" style={{ backgroundColor: colorPalette.alertRed }}>
              War Mode Active
            </Badge>
          )}
        </div>

        {/* Page title - visible on medium screens and above */}
        <h1 className="hidden text-xl font-semibold md:block" style={{ color: colorPalette.primaryPurple }}>
          {getPageTitle()}
        </h1>

        {/* Right section with notifications and profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                     style={{ backgroundColor: colorPalette.accentGreen }}>
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <div className="font-medium">New Audit Assignment</div>
                  <div className="text-sm text-muted-foreground">You have been assigned 3 new audits</div>
                  <div className="text-xs text-muted-foreground">5 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <div className="font-medium">High Risk Alert</div>
                  <div className="text-sm text-muted-foreground">CSP Agent #245 shows unusual transaction pattern</div>
                  <div className="text-xs text-muted-foreground">1 hour ago</div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1">
                  <div className="font-medium">System Update</div>
                  <div className="text-sm text-muted-foreground">New fraud detection rules have been deployed</div>
                  <div className="text-xs text-muted-foreground">Yesterday</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm font-medium" style={{ color: colorPalette.accentGreen }}>
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback style={{ backgroundColor: colorPalette.primaryPurple, color: colorPalette.baseWhite }}>
                    {user?.name.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.role ? roleLabels[user.role] : 'User'}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex cursor-pointer items-center gap-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex cursor-pointer items-center gap-2" 
                onClick={logout}
                style={{ color: colorPalette.alertRed }}
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { Badge } from "@/components/ui/badge";

interface StatusConfig {
  label: string;
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'success' | 'warning';
}

type StatusType = 
  | 'active' | 'inactive' | 'pending' | 'suspended' | 'completed' 
  | 'failed' | 'success' | 'error' | 'open' | 'in_progress' | 'resolved' 
  | 'escalated' | 'approved' | 'rejected' | 'processing' | 'blacklisted'
  | 'critical' | 'high' | 'medium' | 'low';

const statusConfig: Record<StatusType, StatusConfig> = {
  active: { label: 'Active', variant: 'success' },
  inactive: { label: 'Inactive', variant: 'outline' },
  pending: { label: 'Pending', variant: 'secondary' },
  suspended: { label: 'Suspended', variant: 'destructive' },
  completed: { label: 'Completed', variant: 'success' },
  failed: { label: 'Failed', variant: 'destructive' },
  success: { label: 'Success', variant: 'success' },
  error: { label: 'Error', variant: 'destructive' },
  open: { label: 'Open', variant: 'secondary' },
  in_progress: { label: 'In Progress', variant: 'default' },
  resolved: { label: 'Resolved', variant: 'success' },
  escalated: { label: 'Escalated', variant: 'warning' },
  approved: { label: 'Approved', variant: 'success' },
  rejected: { label: 'Rejected', variant: 'destructive' },
  processing: { label: 'Processing', variant: 'default' },
  blacklisted: { label: 'Blacklisted', variant: 'destructive' },
  critical: { label: 'Critical', variant: 'destructive' },
  high: { label: 'High', variant: 'warning' },
  medium: { label: 'Medium', variant: 'default' },
  low: { label: 'Low', variant: 'secondary' }
};

interface StatusBadgeProps {
  status: string;
  customLabel?: string;
  className?: string;
  label?: string; // Added the label prop
}

export function StatusBadge({ status, customLabel, label, className = '' }: StatusBadgeProps) {
  // Convert status to lowercase and replace spaces/underscores with underscores for consistency
  const normalizedStatus = status.toLowerCase().replace(/[\s-]/g, '_') as StatusType;
  
  // Use the configured status if it exists, otherwise default to 'default'
  const config = statusConfig[normalizedStatus] || { 
    label: customLabel || label || status, 
    variant: 'default' 
  };

  return (
    <Badge 
      variant={config.variant} 
      className={className}
    >
      {customLabel || label || config.label}
    </Badge>
  );
}

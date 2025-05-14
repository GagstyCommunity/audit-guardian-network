
export interface Visit {
  id: string;
  csp_id: string;
  csp_name: string;
  visit_date: string;
  status: 'pending' | 'completed' | 'cancelled' | 'in_progress';
  priority: 'high' | 'medium' | 'low';
  location: {
    district: string;
    village: string;
    lat?: number;
    long?: number;
  };
  distance: number;
  estimated_time: number;
  red_zone: boolean;
  issues: string[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
  category: 'documentation' | 'verification' | 'equipment' | 'security' | 'compliance';
}

export interface AuditFormData {
  id?: string;
  csp_id: string;
  auditor_id: string;
  audit_date: string;
  physical_premises_score: number;
  equipment_score: number;
  documentation_score: number;
  customer_service_score: number;
  overall_score: number;
  findings: string;
  recommendations: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  signature_url?: string;
  photos?: string[];
}

export interface RedZoneProtocol {
  id: string;
  title: string;
  description: string;
  steps: {
    id: string;
    step: number;
    instruction: string;
    critical: boolean;
  }[];
  emergency_contacts: {
    name: string;
    role: string;
    phone: string;
  }[];
  last_updated: string;
}

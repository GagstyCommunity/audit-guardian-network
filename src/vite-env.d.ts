
/// <reference types="vite/client" />

// Define Transaction interface
interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
  customer_name?: string;
  customer_id?: string;
  device_id?: string;
  location_lat?: number;
  location_long?: number;
  account_number?: string;
  reference_id?: string;
  verified_at?: string;
  agent_id?: string;
  [key: string]: any; // Allow for additional dynamic properties
}

interface FaceVerification {
  id: string;
  agent_id: string;
  verified_at: string;
  status: string;
  image_url?: string;
  confidence_score?: number;
  device_info?: {
    device_id: string;
    ip_address: string;
    location?: {
      latitude: number;
      longitude: number;
      accuracy: number;
    }
  };
  created_at: string;
}

interface AuditTask {
  id: string;
  auditor_id: string;
  csp_id: string;
  status: string;
  assigned_date: string;
  due_date: string;
  completed_date?: string;
  risk_level: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface AuditEvidence {
  id: string;
  audit_id: string;
  type: "photo" | "video" | "audio" | "document";
  url: string;
  notes?: string;
  created_at: string;
}

interface CSPProfile {
  id: string;
  bank_id: string;
  user_id: string;
  status: "pending_approval" | "active" | "suspended" | "blacklisted";
  risk_score: number;
  last_face_verification?: string;
  is_in_red_zone: boolean;
  is_army_service_provider: boolean;
  created_at: string;
  updated_at: string;
  profile: {
    name: string;
    email: string;
    phone_number: string;
    region: string;
    district: string;
    state: string;
  };
}

interface FraudAlert {
  id: string;
  csp_id: string;
  transaction_id?: string;
  alert_type: string;
  description: string;
  detected_at: string;
  risk_level: "low" | "medium" | "high" | "critical";
  status: "open" | "in-progress" | "resolved" | "false-positive";
  response?: {
    response_text: string;
    evidence_urls?: string[];
    responded_at: string;
  };
  resolution?: {
    resolution_text: string;
    action_taken: string;
    resolved_at: string;
    resolved_by: string;
  };
  created_at: string;
  updated_at: string;
}

interface CustomerComplaint {
  id: string;
  csp_id: string;
  customer_phone: string;
  complaint_type: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in-progress" | "resolved" | "closed";
  evidence_url?: string;
  csp_response?: string;
  resolution?: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
}

interface MilitaryFamily {
  id: string;
  military_id: string;
  military_person_name: string;
  regiment_unit: string;
  rank: string;
  status: "active" | "on_deployment" | "retired";
  family_members: {
    name: string;
    relationship: string;
    has_access: boolean;
  }[];
  special_services: string[];
  created_at: string;
  updated_at: string;
  expires_at?: string;
}

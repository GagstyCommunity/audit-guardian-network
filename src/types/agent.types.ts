
export interface CSPAgent {
  id: string;
  name?: string;
  bank_id?: string;
  risk_score?: number;
  status?: string;
  location?: string;
  lastAudit?: string;
  profile?: {
    name?: string;
    avatar?: string;
  };
  // Adding fields to fix type errors
  last_face_verification?: string;
  location_lat?: number;
  location_long?: number;
  district?: string;
  state?: string;
  is_in_red_zone?: boolean;
}

export interface AgentEvent {
  id: string;
  agent_id: string;
  event_type: string;
  timestamp: string;
  details: any;
}

export interface Transaction {
  id: string;
  agent_id: string;
  amount: number;
  transaction_type: string;
  status: string;
  customer_id?: string;
  created_at: string;
}

export interface DeviceStatus {
  id: string;
  agent_id: string;
  device_type: string;
  status: string;
  last_checked: string;
  battery_level?: number;
  connection_strength?: string;
}

export interface Dispute {
  id: string;
  agent_id: string;
  customer_id?: string;
  issue_type: string;
  description: string;
  status: string;
  created_at: string;
  resolved_at?: string;
}

export interface FaceVerification {
  id: string;
  agent_id: string;
  status: string;
  timestamp: string;
  match_percentage?: number;
  location?: string;
  // Adding fields to fix type errors
  profile_id?: string;
  verification_type?: string;
  device_id?: string;
  verified_at?: string;
  success?: boolean;
  failure_reason?: string;
  location_lat?: number;
  location_long?: number;
}

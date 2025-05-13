
/// <reference types="vite/client" />

// Workaround to allow dynamic table access in Supabase client
declare namespace global {
  interface SupabaseTablesAndViews {
    [tableName: string]: any;
  }
}

// Define interfaces for our data models
interface CSPAgent {
  id: string;
  profile_id: string;
  bank_id: string;
  location_lat: number;
  location_long: number;
  address?: string;
  district?: string;
  state?: string;
  status?: string;
  risk_score?: number;
  onboarded_at?: string;
  last_face_verification?: string;
  device_id?: string;
  is_in_red_zone?: boolean;
  is_army_service_provider?: boolean;
  profile?: Profile;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar_url?: string;
  phone_number?: string;
  created_at?: string;
  last_login?: string;
  status?: string;
  region?: string;
  district?: string;
  state?: string;
}

interface Transaction {
  id: string;
  csp_id: string;
  transaction_type: string;
  amount: number;
  status: string;
  customer_name?: string;
  customer_id?: string;
  transaction_date: string;
  fee_charged?: number;
  receipt_id: string;
  device_id?: string;
  location_lat?: number;
  location_long?: number;
}

interface FaceVerification {
  id: string;
  profile_id: string;
  verification_type: string;
  verified_at: string;
  success: boolean;
  device_id?: string;
  location_lat?: number;
  location_long?: number;
  failure_reason?: string;
}

interface Dispute {
  id: string;
  transaction_id?: string;
  csp_id?: string;
  customer_id?: string;
  dispute_type: string;
  description: string;
  status: string;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
  resolution_notes?: string;
}

interface Audit {
  id: string;
  csp_id: string;
  auditor_id?: string;
  assigned_at: string;
  scheduled_for?: string;
  status: string;
  completed_at?: string;
  location_lat?: number;
  location_long?: number;
  face_verification_passed?: boolean;
  device_verification_passed?: boolean;
  location_verification_passed?: boolean;
  notes?: string;
  priority: number;
  is_red_zone: boolean;
  csp?: CSPAgent;
  auditor?: Profile;
}

interface FraudAlert {
  id: string;
  csp_id: string;
  detected_at: string;
  alert_type: string;
  description: string;
  risk_level: string;
  status: string;
  reviewed_by?: string;
  reviewed_at?: string;
  action_taken?: string;
  csp?: CSPAgent;
}

interface Notification {
  id: string;
  profile_id: string;
  title: string;
  message: string;
  type?: string;
  read: boolean;
  created_at: string;
  action_url?: string;
}

interface ArmyFamily {
  id: string;
  family_id: string;
  primary_member_name: string;
  service_number?: string;
  status: string;
  registered_at: string;
  address?: string;
  district?: string;
  state?: string;
  contact_number?: string;
  associated_csp?: string;
}

interface SpecialPayout {
  id: string;
  family_id: string;
  amount: number;
  payout_type: string;
  status: string;
  approved_by?: string;
  approved_at?: string;
  processed_at?: string;
  processed_by?: string;
  notes?: string;
}

interface Feedback {
  id: string;
  customer_id?: string;
  csp_id?: string;
  rating?: number;
  comments?: string;
  submitted_at: string;
  status: string;
}

interface SystemSetting {
  id: number;
  setting_name: string;
  setting_value?: string;
  description?: string;
  updated_at: string;
  updated_by?: string;
}

interface RedZone {
  id: string;
  zone_name: string;
  district: string;
  state: string;
  location_center_lat: number;
  location_center_long: number;
  radius_km?: number;
  active: boolean;
  created_at: string;
  expires_at?: string;
}


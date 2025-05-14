
export interface FaceVerification {
  id: string;
  profile_id: string;
  verification_type: string;
  success: boolean;
  device_id: string;
  location_lat?: number;
  location_long?: number;
  failure_reason?: string;
  verified_at?: string;
}

export interface CSPAgent {
  id: string;
  profile_id: string;
  name?: string;
  status?: string;
  last_face_verification?: string;
  location_lat?: number;
  location_long?: number;
  phone?: string;
  email?: string;
  address?: string;
}

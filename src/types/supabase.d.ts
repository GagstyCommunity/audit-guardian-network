
// Type definitions for Supabase client

// Extend the default window interface
declare global {
  // Add any global types here if needed
}

// Type for transaction data
interface Transaction {
  id: string;
  transaction_date: string;
  amount: number;
  fee_charged: number;
  status: string;
  customer_name: string;
  transaction_type: string;
  account_number: string;
  reference_id: string;
  verified_at?: string;
  agent_id: string;
  location_lat?: number;
  location_long?: number;
  [key: string]: any; // Allow for additional dynamic properties
}

// Type declaration for any other component-specific interfaces

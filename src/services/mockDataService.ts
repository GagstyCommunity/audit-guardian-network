
import { format, subDays, subHours, subMinutes } from 'date-fns';
import { CSPAgent } from '@/types/agent.types';

// Utility to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Utility to generate random dates within a range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Utility to format dates consistently
const formatDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};

// CSP Agents mock data
export const generateMockAgents = (count: number = 10): CSPAgent[] => {
  const banks = ['SBI', 'PNB', 'BOI', 'ICICI', 'AXIS', 'HDFC', 'UBI'];
  const cities = ['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune'];
  const names = [
    'John Smith', 'Priya Sharma', 'Arun Kumar', 'Neha Patel', 'Raj Malhotra',
    'Ananya Singh', 'Vikram Khanna', 'Deepa Reddy', 'Sanjay Gupta', 'Kavita Joshi',
    'Rahul Verma', 'Meera Kapoor', 'Amit Shah', 'Divya Iyer', 'Arjun Nair'
  ];
  const statuses = ['active', 'suspended', 'flagged', 'pending', 'inactive'];
  
  const today = new Date();
  const sixMonthsAgo = subDays(today, 180);

  return Array(count).fill(0).map((_, i) => {
    const bank = banks[Math.floor(Math.random() * banks.length)];
    const bankId = `${bank}-${(Math.floor(Math.random() * 900) + 100)}`;
    const riskScore = Math.random();
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: generateId(),
      name: names[i % names.length],
      bank_id: bankId,
      risk_score: riskScore,
      status: status,
      location: cities[Math.floor(Math.random() * cities.length)],
      lastAudit: formatDate(randomDate(sixMonthsAgo, today)),
      profile: {
        name: names[i % names.length],
      }
    };
  });
};

// Function to generate mock fraud alerts
export const generateMockFraudAlerts = (count: number = 5) => {
  const alertTypes = ['Unusual Transaction', 'Multiple Failed Logins', 'Location Mismatch', 'Device Changed', 'Suspicious Activity'];
  const riskLevels = ['low', 'medium', 'high', 'critical'];
  const statuses = ['open', 'investigating', 'resolved', 'false-positive'];
  
  const now = new Date();
  
  return Array(count).fill(0).map((_, i) => {
    return {
      id: generateId(),
      alert_type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      risk_level: riskLevels[Math.floor(Math.random() * riskLevels.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      detected_at: format(subHours(now, i * 2 + Math.floor(Math.random() * 5)), 'yyyy-MM-dd HH:mm:ss'),
      details: 'Potential security breach detected. Review immediately.',
    };
  });
};

// Function to generate mock audits
export const generateMockAudits = (count: number = 5) => {
  const priorities = [1, 1, 2, 2, 2, 3, 3];  // Weighted to have more medium priorities
  const statuses = ['pending', 'in-progress', 'completed', 'cancelled'];
  
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  
  return Array(count).fill(0).map((_, i) => {
    return {
      id: generateId(),
      scheduled_for: formatDate(randomDate(now, nextMonth)),
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      agent_id: generateId(),
      auditor_id: generateId(),
      location: 'TBD',
    };
  });
};

// Generate mock transactions
export const generateMockTransactions = (count: number = 20) => {
  const transactionTypes = ['AEPS_WITHDRAWAL', 'CASH_DEPOSIT', 'BBPS_BILL', 'MICRO_ATM', 'MONEY_TRANSFER'];
  const statuses = ['success', 'failed', 'pending', 'processing'];
  const names = [
    'John Smith', 'Priya Sharma', 'Arun Kumar', 'Neha Patel', 'Raj Malhotra',
    'Ananya Singh', 'Vikram Khanna', 'Deepa Reddy', 'Sanjay Gupta', 'Kavita Joshi'
  ];
  
  const now = new Date();
  const thirtyDaysAgo = subDays(now, 30);
  
  return Array(count).fill(0).map((_, i) => {
    const transactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const amount = Math.round(Math.random() * 10000) + 100;
    const feeCharged = Math.round(amount * 0.01); // 1% fee
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const customerName = names[Math.floor(Math.random() * names.length)];
    
    return {
      id: generateId(),
      transaction_type: transactionType,
      amount: amount,
      status: status,
      customer_name: customerName,
      customer_id: `CUST-${Math.floor(Math.random() * 10000)}`,
      transaction_date: format(randomDate(thirtyDaysAgo, now), 'yyyy-MM-dd HH:mm:ss'),
      fee_charged: feeCharged,
      receipt_id: `RCP-${Math.floor(Math.random() * 100000)}`
    };
  });
};

// Generate mock customer complaints
export const generateMockComplaints = (count: number = 10) => {
  const complaintTypes = ['Fee Dispute', 'Service Delay', 'Agent Behavior', 'Wrong Transaction', 'Technical Issue'];
  const statuses = ['open', 'in-progress', 'resolved', 'closed', 'escalated'];
  const priorities = ['low', 'medium', 'high'];
  
  const now = new Date();
  const sixMonthsAgo = subDays(now, 180);
  
  return Array(count).fill(0).map((_, i) => {
    return {
      id: generateId(),
      customer_name: `Customer ${i+1}`,
      customer_id: `CUST-${Math.floor(Math.random() * 10000)}`,
      complaint_type: complaintTypes[Math.floor(Math.random() * complaintTypes.length)],
      description: `Issue reported regarding ${complaintTypes[Math.floor(Math.random() * complaintTypes.length)].toLowerCase()}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      created_at: format(randomDate(sixMonthsAgo, now), 'yyyy-MM-dd'),
      resolved_at: Math.random() > 0.3 ? format(randomDate(sixMonthsAgo, now), 'yyyy-MM-dd') : null,
    };
  });
};

// Generate mock devices
export const generateMockDevices = (count: number = 15) => {
  const deviceTypes = ['Micro-ATM', 'Biometric Scanner', 'Tablet', 'POS Terminal', 'Printer'];
  const manufacturers = ['Samsung', 'Apple', 'Morpho', 'Verifone', 'Lenovo', 'HP', 'Dell'];
  const statuses = ['active', 'inactive', 'maintenance', 'repair'];
  
  const now = new Date();
  const twoYearsAgo = subDays(now, 730);
  const warranty = [12, 24, 36]; // months
  
  return Array(count).fill(0).map((_, i) => {
    const deviceType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
    const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
    const purchaseDate = randomDate(twoYearsAgo, now);
    const warrantyMonths = warranty[Math.floor(Math.random() * warranty.length)];
    const warrantyEndDate = new Date(purchaseDate);
    warrantyEndDate.setMonth(warrantyEndDate.getMonth() + warrantyMonths);
    
    return {
      id: generateId(),
      device_id: `DEV-${Math.floor(Math.random() * 10000)}`,
      device_type: deviceType,
      manufacturer: manufacturer,
      model: `${manufacturer}-${Math.floor(Math.random() * 1000)}`,
      serial_number: `SN${Math.floor(Math.random() * 1000000)}`,
      purchase_date: format(purchaseDate, 'yyyy-MM-dd'),
      warranty_end: format(warrantyEndDate, 'yyyy-MM-dd'),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      assigned_to: Math.random() > 0.2 ? `CSP-${Math.floor(Math.random() * 1000)}` : null,
      last_maintenance: Math.random() > 0.3 ? format(randomDate(purchaseDate, now), 'yyyy-MM-dd') : null,
    };
  });
};

// Generate mock staff
export const generateMockStaff = (count: number = 12) => {
  const roles = ['csp_agent', 'field_auditor', 'cluster_manager', 'bank_officer', 'customer_support', 'it_infra'];
  const departments = ['Operations', 'Customer Service', 'IT', 'Finance', 'HR', 'Audit'];
  const statuses = ['active', 'on_leave', 'suspended', 'inactive'];
  
  const names = [
    'Rahul Sharma', 'Priya Patel', 'Amit Singh', 'Neha Gupta', 'Rajesh Kumar',
    'Divya Iyer', 'Sanjay Mehta', 'Ananya Reddy', 'Vikram Malhotra', 'Meera Kapoor',
    'Arjun Nair', 'Kavita Verma', 'Deepak Joshi', 'Pooja Shah', 'Suresh Rao'
  ];
  
  const now = new Date();
  const fiveYearsAgo = subDays(now, 1825);
  
  return Array(count).fill(0).map((_, i) => {
    const role = roles[Math.floor(Math.random() * roles.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const joinDate = randomDate(fiveYearsAgo, now);
    
    return {
      id: generateId(),
      employee_id: `EMP-${Math.floor(Math.random() * 10000)}`,
      name: names[i % names.length],
      role: role,
      department: department,
      email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@example.com`,
      phone: `+91 ${Math.floor(Math.random() * 1000000000)}`,
      join_date: format(joinDate, 'yyyy-MM-dd'),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      reporting_to: Math.random() > 0.3 ? `EMP-${Math.floor(Math.random() * 10000)}` : null,
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'][Math.floor(Math.random() * 5)]
    };
  });
};

// Export mock data factory
export const MockData = {
  agents: generateMockAgents,
  fraudAlerts: generateMockFraudAlerts,
  audits: generateMockAudits,
  transactions: generateMockTransactions,
  complaints: generateMockComplaints,
  devices: generateMockDevices,
  staff: generateMockStaff,
};

export default MockData;

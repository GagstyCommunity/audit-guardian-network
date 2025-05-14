
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

// Export mock data factory
export const MockData = {
  agents: generateMockAgents,
  fraudAlerts: generateMockFraudAlerts,
  audits: generateMockAudits,
};

export default MockData;

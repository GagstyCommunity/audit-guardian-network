
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format number with thousands separator
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

// Format date
export function formatDate(date: Date | string): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString();
}

// Format date with time
export function formatDateTime(date: Date | string): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Check if browser is Internet Explorer (has msSaveBlob)
const isIE = (): boolean => {
  return 'msSaveBlob' in navigator;
};

// CSV Export
export function exportToCsv<T>(data: T[], filename: string) {
  if (!data || !data.length) return;
  
  // Get headers from first item keys
  const headers = Object.keys(data[0] as object);
  
  // Convert data to CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(item => {
      return headers.map(header => {
        const value = (item as any)[header];
        
        // Handle complex objects/arrays, quotes, commas
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return `"${value}"`;
      }).join(',');
    })
  ];
  
  // Create blob and download
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (isIE()) { // IE 10+
    // Use type assertion for IE-specific API
    (navigator as any).msSaveBlob(blob, filename);
  } else {
    // Others
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

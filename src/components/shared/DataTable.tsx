
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Column } from '@/utils/tableHelpers';

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T>({ 
  data, 
  columns, 
  loading = false, 
  emptyMessage = "No data available" 
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-gray-500">Loading data...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  const renderCellContent = (row: T, column: Column<T>) => {
    if (column.cell) {
      return column.cell(row);
    }
    
    if (typeof column.accessorKey === 'function') {
      return column.accessorKey(row);
    }
    
    const value = row[column.accessorKey as keyof T];
    return value !== undefined && value !== null ? String(value) : '';
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {renderCellContent(row, column)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

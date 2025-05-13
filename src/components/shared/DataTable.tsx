
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell,
  TableCaption
} from "@/components/ui/table";
import { Skeleton } from '@/components/ui/skeleton';

interface Column<T> {
  header: string;
  accessorKey: keyof T | ((data: T) => React.ReactNode);
  cell?: (data: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  caption?: string;
  emptyMessage?: string;
}

export function DataTable<T extends object>({
  data,
  columns,
  loading = false,
  caption,
  emptyMessage = "No data available"
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array(5).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-6 text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => {
                const value = typeof column.accessorKey === 'function' 
                  ? column.accessorKey(row) 
                  : row[column.accessorKey];
                
                return (
                  <TableCell key={colIndex}>
                    {column.cell ? column.cell(row) : value as React.ReactNode}
                  </TableCell>
                );
              })}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}


import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessorKey: keyof T | ((data: T) => ReactNode);
  cell?: (item: T) => ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyState?: React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyState,
}: DataTableProps<T>) {
  // Filter out columns that should be hidden on mobile
  const visibleColumns = React.useMemo(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return columns.filter(col => !col.hideOnMobile);
    }
    return columns;
  }, [columns]);

  return (
    <div className="w-full overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <div className="flex justify-center items-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyState || "No results found."}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow key={i} className="hover:bg-muted/50">
                {visibleColumns.map((column, j) => (
                  <TableCell key={j} className={column.className}>
                    {column.cell
                      ? column.cell(row)
                      : typeof column.accessorKey === "function"
                      ? column.accessorKey(row)
                      : (row[column.accessorKey] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

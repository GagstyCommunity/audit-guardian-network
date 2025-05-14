
import React from 'react';

// Define custom column definition type that allows for flexible accessorKey
export type ColumnDefinition<T> = {
  header: string;
  accessorKey: keyof T | ((data: T) => React.ReactNode);
  cell?: (row: T) => React.ReactNode;
};

// Define Column type for DataTable
export type Column<T> = {
  header: string;
  accessorKey: keyof T | ((data: T) => React.ReactNode);
  cell?: (row: T) => React.ReactNode;
};

export function createColumns<T>(columnDefinitions: ColumnDefinition<T>[]): Column<T>[] {
  return columnDefinitions;
}

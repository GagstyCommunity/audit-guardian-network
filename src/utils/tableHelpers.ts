
import { ReactNode } from 'react';
import { Column } from '@/components/shared/DataTable';

type ColumnDefinition<T> = {
  header: string;
  accessorKey: keyof T | ((data: T) => ReactNode);
  cell?: (row: T) => ReactNode;
};

export function createColumns<T>(columnDefinitions: ColumnDefinition<T>[]): Column<T>[] {
  return columnDefinitions.map(def => ({
    header: def.header,
    accessorKey: def.accessorKey,
    cell: def.cell
  })) as Column<T>[];
}

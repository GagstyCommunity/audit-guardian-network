
import { ReactNode } from 'react';
import { Column } from '@/components/shared/DataTable';

/**
 * A helper function to create properly typed table columns
 * This helps avoid TypeScript errors when defining columns for DataTable
 */
export function createColumns<T>(columns: Column<T>[]): Column<T>[] {
  return columns;
}

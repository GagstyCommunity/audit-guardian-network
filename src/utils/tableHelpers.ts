
import { ReactNode } from "react";
import { Column } from "@/components/shared/DataTable";

/**
 * Helper function to create columns with proper typing
 */
export function createColumns<T>(columns: Array<Column<T>>): Array<Column<T>> {
  return columns;
}


import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { mutateSupabaseData } from '@/hooks/useSupabaseData';
import { PostgrestQueryBuilder } from '@supabase/supabase-js';

// Types
export interface CreateParams<T> {
  table: string;
  data: T;
  returning?: string;
}

export interface UpdateParams<T> {
  table: string;
  data: Partial<T>;
  column: string;
  value: string | number;
  returning?: string;
}

export interface DeleteParams {
  table: string;
  column: string;
  value: string | number;
}

export interface QueryParams {
  table: string;
  select?: string;
  column?: string;
  value?: any;
  order?: { column: string; ascending?: boolean };
  limit?: number;
  filters?: { column: string; value: any; operator?: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'like' }[];
}

// API Services
export const api = {
  // Create a new record
  async create<T, R = any>({ table, data, returning }: CreateParams<T>) {
    try {
      return await mutateSupabaseData('insert', table, data, { returning });
    } catch (error) {
      console.error(`Error creating ${table}:`, error);
      throw error;
    }
  },

  // Update a record
  async update<T, R = any>({ table, data, column, value, returning }: UpdateParams<T>) {
    try {
      return await mutateSupabaseData('update', table, data, { column, value, returning });
    } catch (error) {
      console.error(`Error updating ${table}:`, error);
      throw error;
    }
  },

  // Delete a record
  async delete({ table, column, value }: DeleteParams) {
    try {
      return await mutateSupabaseData('delete', table, undefined, { column, value });
    } catch (error) {
      console.error(`Error deleting from ${table}:`, error);
      throw error;
    }
  },

  // Query records
  async query<T>({ table, select = '*', column, value, order, limit, filters }: QueryParams): Promise<T[]> {
    try {
      // Use explicit type assertion to bypass TypeScript's type checking
      const supabaseTable = supabase.from(table) as unknown as PostgrestQueryBuilder<any, any, any>;
      let query = supabaseTable.select(select);

      if (column && value !== undefined) {
        query = query.eq(column, value);
      }

      if (filters && filters.length > 0) {
        filters.forEach(filter => {
          const { column, value, operator = 'eq' } = filter;
          switch (operator) {
            case 'eq':
              query = query.eq(column, value);
              break;
            case 'neq':
              query = query.neq(column, value);
              break;
            case 'gt':
              query = query.gt(column, value);
              break;
            case 'lt':
              query = query.lt(column, value);
              break;
            case 'gte':
              query = query.gte(column, value);
              break;
            case 'lte':
              query = query.lte(column, value);
              break;
            case 'like':
              query = query.like(column, `%${value}%`);
              break;
          }
        });
      }

      if (order) {
        query = query.order(order.column, { ascending: order.ascending !== false });
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return (data || []) as T[];
    } catch (error) {
      console.error(`Error querying ${table}:`, error);
      toast({
        title: "Error",
        description: `Failed to load data from ${table}`,
        variant: "destructive"
      });
      throw error;
    }
  }
};

export default api;

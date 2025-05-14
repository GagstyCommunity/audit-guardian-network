import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface QueryOptions {
  select?: string;
  column?: string;
  value?: any;
  orderBy?: {
    column: string;
    ascending: boolean;
  };
  limit?: number;
  filters?: Array<{
    column: string;
    operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'like';
    value: any;
  }>;
}

export function useSupabaseData<T>(
  tableName: string,
  options?: QueryOptions
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Cast the entire supabase client to any to avoid TypeScript errors
      // This allows using dynamic table names that aren't in the generated types
      const client = supabase as any;
      let queryBuilder = client.from(tableName).select(options?.select || '*');
      
      if (options?.column && options.value !== undefined) {
        queryBuilder = queryBuilder.eq(options.column, options.value);
      }

      if (options?.orderBy) {
        queryBuilder = queryBuilder.order(options.orderBy.column, {
          ascending: options.orderBy.ascending
        });
      }

      if (options?.limit) {
        queryBuilder = queryBuilder.limit(options.limit);
      }
      
      if (options?.filters) {
        options.filters.forEach(filter => {
          if (filter.operator === 'eq') {
            queryBuilder = queryBuilder.eq(filter.column, filter.value);
          } else if (filter.operator === 'neq') {
            queryBuilder = queryBuilder.neq(filter.column, filter.value);
          } else if (filter.operator === 'gt') {
            queryBuilder = queryBuilder.gt(filter.column, filter.value);
          } else if (filter.operator === 'lt') {
            queryBuilder = queryBuilder.lt(filter.column, filter.value);
          } else if (filter.operator === 'gte') {
            queryBuilder = queryBuilder.gte(filter.column, filter.value);
          } else if (filter.operator === 'lte') {
            queryBuilder = queryBuilder.lte(filter.column, filter.value);
          } else if (filter.operator === 'like') {
            queryBuilder = queryBuilder.like(filter.column, `%${filter.value}%`);
          }
        });
      }

      const { data: result, error: fetchError } = await queryBuilder;

      if (fetchError) {
        console.error('Error fetching data:', fetchError);
        setError(fetchError.message);
        return [];
      } else {
        setData(result as T[]);
        return result as T[];
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('Error fetching data:', err);
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  }, [tableName, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export async function mutateSupabaseData(
  type: 'insert' | 'update' | 'delete',
  tableName: string,
  data?: any,
  options?: {
    column: string;
    value: any;
  }
) {
  try {
    // Cast the entire supabase client to any to avoid TypeScript errors
    const client = supabase as any;
    let query = client.from(tableName);
    
    if (type === 'insert') {
      query = query.insert(data);
    } else if (type === 'update') {
      query = query.update(data);
      if (options?.column && options.value !== undefined) {
        query = query.eq(options.column, options.value);
      }
    } else if (type === 'delete') {
      query = query.delete();
      if (options?.column && options.value !== undefined) {
        query = query.eq(options.column, options.value);
      }
    }
    
    const { error } = await query;
    
    if (error) {
      console.error('Error mutating data:', error);
      throw error;
    }
    
    return true;
  } catch (err) {
    console.error('Error in mutateSupabaseData:', err);
    throw err;
  }
}

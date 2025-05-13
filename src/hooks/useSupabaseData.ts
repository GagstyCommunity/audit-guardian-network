
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestQueryBuilder } from '@supabase/supabase-js';

export function useSupabaseData<T>(
  tableName: string, 
  options?: {
    column?: string;
    value?: any;
    limit?: number;
    orderBy?: { column: string; ascending?: boolean };
    select?: string;
  }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Using type assertion to handle dynamic table access
      const supabaseQuery = supabase.from(tableName) as unknown as PostgrestQueryBuilder<any, any, any>;
      
      let query = supabaseQuery.select(options?.select || '*');

      if (options?.column && options.value !== undefined) {
        query = query.eq(options.column, options.value);
      }

      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending !== false 
        });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data: responseData, error: responseError, count: responseCount } = await query;

      if (responseError) {
        throw new Error(responseError.message);
      }

      setData(responseData as T[]);
      if (responseCount !== null) {
        setCount(responseCount);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to load data',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableName, options?.column, options?.value, options?.limit]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, count, refetch };
}

// Function for handling data mutations (create, update, delete)
export async function mutateSupabaseData<T>(
  type: 'insert' | 'update' | 'delete',
  tableName: string,
  data?: any,
  options?: {
    column?: string;
    value?: any;
    returning?: string;
  }
) {
  try {
    // Using type assertions to handle dynamic table access
    const supabaseTable = supabase.from(tableName) as unknown as PostgrestQueryBuilder<any, any, any>;
    let query: any;
    
    if (type === 'insert') {
      query = supabaseTable.insert(data);
    } else if (type === 'update') {
      query = supabaseTable.update(data);
      if (options?.column && options.value !== undefined) {
        query = query.eq(options.column, options.value);
      }
    } else if (type === 'delete') {
      query = supabaseTable.delete();
      if (options?.column && options.value !== undefined) {
        query = query.eq(options.column, options.value);
      }
    }

    if (options?.returning) {
      query = query.select(options.returning);
    }

    const { data: responseData, error } = await query;

    if (error) {
      throw new Error(error.message);
    }
    
    toast({
      title: "Success",
      description: `${type === 'insert' ? 'Created' : type === 'update' ? 'Updated' : 'Deleted'} successfully`,
    });

    return responseData;
  } catch (error) {
    console.error(`Error during ${type} operation:`, error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : `Failed to ${type} data`,
      variant: "destructive"
    });
    throw error;
  }
}

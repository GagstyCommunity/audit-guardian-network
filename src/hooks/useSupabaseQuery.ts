
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface QueryConfig<T extends Record<string, any>> {
  enabled?: boolean;
  refetchInterval?: number | false;
  initialData?: T[];
  select?: (data: T[]) => any;
  onSuccess?: (data: T[]) => void;
  onError?: (error: Error) => void;
}

export function useSupabaseQuery<T extends Record<string, any>>(
  queryFn: () => Promise<{ data: T[] | null; error: Error | null }>,
  queryKey: any[],
  config: QueryConfig<T> = {}
) {
  const [data, setData] = useState<T[]>(config.initialData || []);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsRefetching(true);
      const { data: responseData, error: responseError } = await queryFn();
      
      if (responseError) {
        throw responseError;
      }
      
      if (responseData) {
        setData(responseData);
        config.onSuccess?.(responseData);
        
        if (config.select) {
          return config.select(responseData);
        }
        
        return responseData;
      }
      
      return [];
    } catch (err) {
      setError(err as Error);
      config.onError?.(err as Error);
      return [];
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  };

  const refetch = () => {
    return fetchData();
  };

  useEffect(() => {
    if (config.enabled !== false) {
      fetchData();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...queryKey, config.enabled]);

  useEffect(() => {
    if (!config.refetchInterval) return;
    
    const interval = setInterval(() => {
      if (config.enabled !== false) {
        fetchData();
      }
    }, config.refetchInterval);
    
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.refetchInterval, config.enabled, ...queryKey]);

  return {
    data,
    error,
    isLoading,
    isRefetching,
    refetch
  };
}

export default useSupabaseQuery;

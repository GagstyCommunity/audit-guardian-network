
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface QueryParams {
  table: string;
  select?: string;
  column?: string;
  value?: any;
  order?: {
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

interface MutationParams {
  table: string;
  data: any;
  column?: string;
  value?: any;
}

const api = {
  // Authentication methods
  auth: {
    signUp: async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Auth error:', error);
        throw error;
      }
    },
    
    signIn: async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Auth error:', error);
        throw error;
      }
    },
    
    signOut: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return true;
      } catch (error) {
        console.error('Auth error:', error);
        throw error;
      }
    },
  },
  
  // Data methods
  data: {
    // Query records
    async query<T>({ table, select = '*', column, value, order, limit, filters }: QueryParams): Promise<T[]> {
      try {
        // Cast the entire client to any to avoid TypeScript errors
        const client = supabase as any;
        let query = client.from(table).select(select);

        if (column && value !== undefined) {
          query = query.eq(column, value);
        }
        
        if (filters) {
          filters.forEach(filter => {
            switch (filter.operator) {
              case 'eq':
                query = query.eq(filter.column, filter.value);
                break;
              case 'neq':
                query = query.neq(filter.column, filter.value);
                break;
              case 'gt':
                query = query.gt(filter.column, filter.value);
                break;
              case 'lt':
                query = query.lt(filter.column, filter.value);
                break;
              case 'gte':
                query = query.gte(filter.column, filter.value);
                break;
              case 'lte':
                query = query.lte(filter.column, filter.value);
                break;
              case 'like':
                query = query.like(filter.column, `%${filter.value}%`);
                break;
            }
          });
        }
        
        if (order) {
          query = query.order(order.column, { ascending: order.ascending });
        }
        
        if (limit) {
          query = query.limit(limit);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        return data as T[];
      } catch (error) {
        console.error('Query error:', error);
        throw error;
      }
    },
    
    // Insert record(s)
    async insert<T>({ table, data }: Omit<MutationParams, 'column' | 'value'>): Promise<T> {
      try {
        const { data: result, error } = await (supabase as any).from(table).insert(data).select().single();
        
        if (error) throw error;
        toast({ title: "Success", description: "Record created successfully" });
        return result as T;
      } catch (error) {
        console.error('Insert error:', error);
        toast({ 
          title: "Error", 
          description: "Failed to create record", 
          variant: "destructive" 
        });
        throw error;
      }
    },
    
    // Update record(s)
    async update<T>({ table, data, column, value }: MutationParams): Promise<T> {
      try {
        const query = (supabase as any).from(table).update(data);
        
        if (column && value !== undefined) {
          query.eq(column, value);
        }
        
        const { data: result, error } = await query.select().single();
        
        if (error) throw error;
        toast({ title: "Success", description: "Record updated successfully" });
        return result as T;
      } catch (error) {
        console.error('Update error:', error);
        toast({ 
          title: "Error", 
          description: "Failed to update record", 
          variant: "destructive" 
        });
        throw error;
      }
    },
    
    // Delete record(s)
    async delete({ table, column, value }: Omit<MutationParams, 'data'>): Promise<boolean> {
      try {
        const query = (supabase as any).from(table).delete();
        
        if (column && value !== undefined) {
          query.eq(column, value);
        }
        
        const { error } = await query;
        
        if (error) throw error;
        toast({ title: "Success", description: "Record deleted successfully" });
        return true;
      } catch (error) {
        console.error('Delete error:', error);
        toast({ 
          title: "Error", 
          description: "Failed to delete record", 
          variant: "destructive" 
        });
        throw error;
      }
    }
  }
};

export default api;

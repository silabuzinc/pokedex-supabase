import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "None";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "None";
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
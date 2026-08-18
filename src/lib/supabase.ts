import { createClient } from "@supabase/supabase-js";

// Supabase environment variables (with fallback defaults for local development)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-pushpangan-supabase.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

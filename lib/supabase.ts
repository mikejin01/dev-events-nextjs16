import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

// Load Supabase credentials from environment variables.
// These must be set in .env.local (never commit real keys).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables"
  );
}

// Create and export a single Supabase client instance.
// Unlike traditional database drivers, the Supabase client is a stateless
// REST client — no persistent connection or connection caching is needed.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

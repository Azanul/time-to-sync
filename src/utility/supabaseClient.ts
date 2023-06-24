import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://sbucwkkyzmsmgzhfiiap.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || '';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});

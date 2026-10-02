import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Service role client - strictly for server-side trusted operations (e.g. admin actions, role elevation)
// NEVER import or use this on the browser / frontend!
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key';

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

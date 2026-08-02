import { createBrowserClient } from "@supabase/ssr";

// Mock client that allows the app to build before Supabase is configured
const mockSupabaseClient = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
    signUp: async () => ({ data: { user: null, session: null }, error: { message: "Supabase not configured" } }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
      }),
    }),
  }),
} as unknown as ReturnType<typeof createBrowserClient>;

/**
 * Creates a Supabase client for browser (Client Component) usage.
 */
export function createSupabaseClient() {
  // Return mock if Supabase environment keys are not configured (allows deployment builds to succeed)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase environment keys are missing. Using mock client instance.");
    return mockSupabaseClient;
  }

  // 1. Call createBrowserClient from @supabase/ssr
  // 2. Pass NEXT_PUBLIC_SUPABASE_URL as the first argument
  // 3. Pass NEXT_PUBLIC_SUPABASE_ANON_KEY as the second argument
  // 4. Return the configured client
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

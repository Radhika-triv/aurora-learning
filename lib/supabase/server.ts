import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

interface SupabaseConfig {
  url?: string;
  anonKey?: string;
  isConfigured: boolean;
}

/** Read (and validate the presence of) the public Supabase env vars. */
export function getSupabaseConfig(): SupabaseConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return { url, anonKey, isConfigured: Boolean(url && anonKey) };
}

/**
 * Cookie-aware Supabase client for use inside Server Components, Server Actions
 * and Route Handlers. Writing cookies is a no-op in a Server Component render
 * (there is no response to mutate), so `setAll` is guarded — this is the
 * pattern recommended by Supabase for the Next.js App Router.
 */
export async function createSupabaseServerClient() {
  const { url, anonKey } = getSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient(url!, anonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component — safe to ignore.
        }
      },
    },
  });
}

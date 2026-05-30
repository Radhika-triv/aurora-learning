import "server-only";

import type { Course } from "@/types";
import { createSupabaseServerClient, getSupabaseConfig } from "@/lib/supabase/server";
import { SEED_COURSES } from "./seed";

/**
 * Fetch the active courses for the dashboard.
 *
 * Runs only on the server (RSC). When Supabase env vars are present it reads
 * live data; otherwise it falls back to the bundled seed so the UI works out of
 * the box. A genuine query failure is thrown and handled by the nearest error
 * boundary (see components/dashboard/course-section-error.tsx).
 */
export async function getCourses(): Promise<Course[]> {
  if (!getSupabaseConfig().isConfigured) {
    return SEED_COURSES;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, progress, icon_name, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load courses from Supabase: ${error.message}`);
  }

  return (data as Course[]) ?? [];
}

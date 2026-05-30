import type { Course } from "@/types";

/**
 * Canonical sample dataset. This mirrors the seed rows in
 * supabase/migrations/0001_init.sql so the dashboard renders an identical,
 * realistic set of courses when no database is connected yet.
 */
export const SEED_COURSES: Course[] = [
  {
    id: "8f3a1c2e-9b47-4d6a-8e1f-2c5b7a0d9e11",
    title: "Advanced React Patterns",
    progress: 72,
    icon_name: "Atom",
    created_at: "2026-05-12T09:24:00.000Z",
  },
  {
    id: "1d9e4b7a-6c20-4f3b-9a8d-5e2c1b0a7f44",
    title: "Distributed Systems Design",
    progress: 45,
    icon_name: "Network",
    created_at: "2026-04-28T14:10:00.000Z",
  },
  {
    id: "b2c6f08d-3a51-4e92-8d77-9f1a4c6b2e83",
    title: "Rust for Systems Programming",
    progress: 28,
    icon_name: "Cpu",
    created_at: "2026-05-21T18:42:00.000Z",
  },
  {
    id: "5a7d2e93-8f14-4b6c-a0e5-7c3b9d1f6048",
    title: "Designing ML Pipelines",
    progress: 88,
    icon_name: "BrainCircuit",
    created_at: "2026-03-30T11:05:00.000Z",
  },
];

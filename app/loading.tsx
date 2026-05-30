import { DashboardSkeleton } from "@/components/dashboard/skeletons";

/**
 * Route-level loading UI. Rendered inside the persistent shell (sidebar + top
 * bar live in the layout), so navigating to the dashboard never shifts the
 * frame — only the content area swaps to skeletons.
 */
export default function Loading() {
  return <DashboardSkeleton />;
}

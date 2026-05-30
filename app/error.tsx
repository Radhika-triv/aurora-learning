"use client";

import { useEffect } from "react";
import { RotateCw, TriangleAlert } from "lucide-react";

/**
 * Route-level error boundary (safety net). Section-scoped failures are handled
 * closer to the source; this catches anything unexpected in the dashboard tree.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-rose/12 text-rose ring-1 ring-rose/25">
        <TriangleAlert className="size-7" />
      </span>
      <div>
        <h1 className="text-lg font-semibold text-foreground">Something went wrong</h1>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-muted">
          We hit an unexpected error while loading your dashboard. Please try again.
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-4 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-violet/50"
      >
        <RotateCw className="size-4" />
        Try again
      </button>
    </div>
  );
}

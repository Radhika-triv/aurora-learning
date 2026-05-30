"use client";

import { useRouter } from "next/navigation";
import { RotateCw, TriangleAlert } from "lucide-react";

/**
 * Graceful, section-scoped fallback shown when the course fetch fails. Offers a
 * retry that clears the boundary and re-runs the server fetch via router.refresh.
 * The rest of the dashboard (hero, activity, goals) stays interactive.
 */
export function CourseSectionError({ reset }: { reset: () => void }) {
  const router = useRouter();

  const retry = () => {
    reset();
    router.refresh();
  };

  return (
    <div
      role="alert"
      className="bento-surface relative flex min-h-[182px] flex-col items-center justify-center gap-3 rounded-tile border border-white/[0.07] p-6 text-center md:col-span-2 lg:col-span-4"
    >
      <span className="grid size-11 place-items-center rounded-2xl bg-rose/12 text-rose ring-1 ring-rose/25">
        <TriangleAlert className="size-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">We couldn&rsquo;t load your courses</p>
        <p className="mt-1 max-w-sm text-sm text-faint">
          There was a problem reaching the database. The rest of your dashboard is unaffected.
        </p>
      </div>
      <button
        type="button"
        onClick={retry}
        className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-4 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-violet/50"
      >
        <RotateCw className="size-4" />
        Try again
      </button>
    </div>
  );
}

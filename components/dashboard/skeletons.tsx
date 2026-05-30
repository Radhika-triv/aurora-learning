import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BentoGrid } from "./bento-grid";

function SkeletonTile({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bento-surface relative flex h-full min-h-[182px] flex-col overflow-hidden rounded-tile border border-white/[0.07] p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Skeleton that matches a single course tile's silhouette exactly. */
export function CourseTileSkeleton({ className }: { className?: string }) {
  return (
    <SkeletonTile className={cn("md:col-span-1", className)}>
      <div className="flex items-start justify-between">
        <Skeleton className="size-11 rounded-2xl" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-4/5" />
      <Skeleton className="mt-2 h-4 w-3/5" />
      <div className="mt-auto pt-4">
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>
    </SkeletonTile>
  );
}

/** Suspense fallback for the course section — keeps the grid's shape stable. */
export function CourseTilesSkeleton({ count = 4 }: { count?: number }) {
  return (
    <>
      <span className="sr-only" role="status">
        Loading your courses…
      </span>
      {Array.from({ length: count }).map((_, i) => (
        <CourseTileSkeleton key={i} />
      ))}
    </>
  );
}

/** Whole-dashboard skeleton used by the route-level loading.tsx fallback. */
export function DashboardSkeleton() {
  return (
    <BentoGrid>
      <SkeletonTile className="md:col-span-2 lg:row-span-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-3 h-7 w-3/4" />
        <Skeleton className="mt-3 h-4 w-4/5" />
        <Skeleton className="mt-7 size-12 rounded-2xl" />
        <div className="mt-auto flex gap-3 pt-6">
          <Skeleton className="h-10 w-40 rounded-full" />
          <Skeleton className="h-10 w-44 rounded-full" />
        </div>
      </SkeletonTile>

      <SkeletonTile className="md:col-span-2 lg:row-span-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-2 h-3.5 w-48" />
        <div className="my-5 flex flex-1 items-center gap-[3px]">
          {Array.from({ length: 16 }).map((_, col) => (
            <div key={col} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((__, row) => (
                <Skeleton key={row} className="size-3 rounded-[3px]" />
              ))}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-3.5">
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
        </div>
      </SkeletonTile>

      <CourseTilesSkeleton />

      <SkeletonTile className="lg:col-span-1 lg:items-center lg:justify-center">
        <Skeleton className="size-[92px] rounded-full" />
      </SkeletonTile>

      <SkeletonTile className="md:col-span-2 lg:col-span-3">
        <div className="flex h-full items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <Skeleton className="size-12 shrink-0 rounded-2xl" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-3 w-40" />
              <Skeleton className="mt-2 h-5 w-3/5" />
            </div>
          </div>
          <Skeleton className="h-10 w-28 shrink-0 rounded-full" />
        </div>
      </SkeletonTile>
    </BentoGrid>
  );
}

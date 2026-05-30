"use client";

import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { CourseSectionError } from "./course-section-error";
import { CourseTilesSkeleton } from "./skeletons";

/**
 * Client wrapper that owns the Suspense + error boundaries for the course grid.
 * The async Server Component (`CourseTiles`) is passed in as `children`, so data
 * fetching stays on the server while the loading/error UI lives on the client —
 * and no function props need to cross the server→client boundary.
 */
export function CourseSection({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary fallback={(reset) => <CourseSectionError reset={reset} />}>
      <Suspense fallback={<CourseTilesSkeleton count={4} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

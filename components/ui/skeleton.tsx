import { cn } from "@/lib/utils";

/** A single shimmering placeholder block. Pure CSS — no JS required. */
export function Skeleton({ className }: { className?: string }) {
  return <span className={cn("skeleton block rounded-md", className)} aria-hidden="true" />;
}

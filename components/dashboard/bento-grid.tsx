import type { ReactNode } from "react";

/**
 * The Bento layout shell. A server component — it carries no interactivity, only
 * the responsive grid definition:
 *   • mobile  → single column
 *   • tablet  → 2 columns
 *   • desktop → 4 columns with fixed-height rows so tiles can span cleanly
 */
export function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <section
      aria-label="Learning overview"
      className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:auto-rows-[182px] lg:grid-cols-4"
    >
      {children}
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import type { ActivitySummary } from "@/types";

/** Background per activity level (0 = empty → 4 = peak). */
export const LEVEL_BG: string[] = [
  "oklch(1 0 0 / 0.05)",
  "oklch(0.5 0.13 280 / 0.55)",
  "oklch(0.62 0.16 284 / 0.72)",
  "oklch(0.72 0.18 288 / 0.88)",
  "oklch(0.83 0.15 250)",
];

function describe(day: { count: number; date: string }): string {
  const noun = day.count === 1 ? "session" : "sessions";
  return `${day.count} ${noun} on ${day.date}`;
}

export function ContributionGraph({ summary }: { summary: ActivitySummary }) {
  return (
    <div className="w-fit">
      <div className="mb-1.5 flex justify-between text-[0.68rem] font-medium text-faint">
        {summary.months.map((month, i) => (
          <span key={`${month}-${i}`}>{month}</span>
        ))}
      </div>

      <div className="no-scrollbar flex gap-[3px] overflow-x-auto pb-0.5 lg:gap-1">
        {summary.weeks.map((week, weekIndex) => (
          <motion.div
            key={weekIndex}
            className="flex flex-col gap-[3px] lg:gap-1"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.3, delay: weekIndex * 0.018 }}
          >
            {week.days.map((day) => (
              <span
                key={day.date}
                title={describe(day)}
                className="size-3 rounded-[3px] ring-1 ring-inset ring-white/[0.05] lg:size-4"
                style={{
                  background: LEVEL_BG[day.level],
                  boxShadow: day.level === 4 ? "0 0 8px oklch(0.83 0.15 250 / 0.55)" : undefined,
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { Flame } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";

/** Mon→Sun snapshot of the current week. `true` = a day with study activity. */
const WEEK: { label: string; active: boolean }[] = [
  { label: "M", active: true },
  { label: "T", active: true },
  { label: "W", active: true },
  { label: "T", active: true },
  { label: "F", active: true },
  { label: "S", active: false },
  { label: "S", active: true },
];

export function StreakIndicator({ days }: { days: number }) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="grid size-12 shrink-0 place-items-center rounded-2xl text-amber ring-1 ring-amber/25"
        style={{ background: "radial-gradient(circle at 30% 25%, oklch(0.83 0.13 70 / 0.28), oklch(0.83 0.13 70 / 0.08))" }}
        aria-hidden="true"
      >
        <Flame className="size-6" strokeWidth={2.25} />
      </span>

      <div>
        <p className="flex items-baseline gap-1.5">
          <CountUp
            value={days}
            duration={1}
            className="inline-block min-w-[1.4ch] text-right text-2xl font-semibold tabular-nums leading-none text-foreground"
          />
          <span className="text-sm text-faint">day streak</span>
        </p>

        <ul className="mt-2 flex items-center gap-1.5" aria-label="This week's activity">
          {WEEK.map((day, i) => (
            <li key={i} className="flex flex-col items-center gap-1">
              <motion.span
                initial={{ scaleY: 0.4, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.3 + i * 0.05 }}
                className={cn(
                  "h-4 w-[5px] origin-bottom rounded-full",
                  day.active ? "bg-amber" : "bg-white/[0.12]",
                )}
                title={day.active ? "Studied" : "Rest day"}
              />
              <span className="text-[0.6rem] leading-none text-faint">{day.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

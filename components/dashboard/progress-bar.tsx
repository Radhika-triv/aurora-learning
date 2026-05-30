"use client";

import { motion } from "motion/react";
import { SOFT_SPRING } from "@/lib/motion";
import type { Accent } from "@/lib/accents";

interface ProgressBarProps {
  /** 0–100. */
  value: number;
  accent: Accent;
  delay?: number;
}

/**
 * Animated progress fill. The bar grows via `scaleX` (origin-left) rather than
 * `width`, so the animation is GPU-composited and causes zero layout work. The
 * rounded, overflow-clipped track gives it a clean cap.
 */
export function ProgressBar({ value, accent, delay = 0 }: ProgressBarProps) {
  const target = Math.max(0, Math.min(1, value / 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.08]"
    >
      <motion.span
        className="absolute inset-y-0 left-0 block w-full origin-left rounded-full"
        style={{ background: accent.bar, transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: target }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ ...SOFT_SPRING, delay }}
      />
    </div>
  );
}

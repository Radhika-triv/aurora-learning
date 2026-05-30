"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";

interface CountUpProps {
  value: number;
  /** Seconds. */
  duration?: number;
  className?: string;
  format?: (value: number) => string;
}

/**
 * Animates a number from 0 → `value` on mount. Driven by a MotionValue rendered
 * straight into the DOM, so it never triggers a React re-render per frame.
 * Reduced-motion collapses the duration to 0 (renders the final value at once).
 * Callers reserve width with `tabular-nums` so the layout never shifts.
 */
export function CountUp({ value, duration = 1.1, className, format }: CountUpProps) {
  const reduce = useReducedMotion();
  const count = useMotionValue(0);
  const text = useTransform(count, (latest) =>
    format ? format(latest) : Math.round(latest).toLocaleString(),
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration: reduce ? 0 : duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [count, value, duration, reduce]);

  return <motion.span className={className}>{text}</motion.span>;
}

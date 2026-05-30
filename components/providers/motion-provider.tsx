"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` makes every Framer Motion animation in the tree honour
 * the OS "reduce motion" setting automatically — transforms/layout animations
 * are dropped while opacity is preserved.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

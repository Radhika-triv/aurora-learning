import type { Transition, Variants } from "motion/react";

/**
 * The hover spring required across interactive tiles — a natural, slightly
 * springy response rather than a linear ease.
 */
export const SPRING: Transition = { type: "spring", stiffness: 300, damping: 20 };

/** Softer spring for larger travel (progress fills, rings, layout pills). */
export const SOFT_SPRING: Transition = { type: "spring", stiffness: 90, damping: 20 };

/**
 * Tile entrance. Each tile fades up on the Y axis (transform + opacity only).
 * `custom` is the tile index, which becomes the stagger delay — so tiles arrive
 * sequentially regardless of how they are nested (Suspense, error boundaries…).
 */
export const tileVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 240, damping: 28, delay: index * 0.06 },
  }),
};

/** Shared viewport config: animate once, as soon as a sliver scrolls in. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

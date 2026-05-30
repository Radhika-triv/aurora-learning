"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SPRING, tileVariants, VIEWPORT } from "@/lib/motion";

interface BentoTileProps {
  children: ReactNode;
  /** Position in the grid — drives the staggered entrance delay. */
  index?: number;
  className?: string;
  /** Tint of the soft radial wash revealed on hover. */
  glow?: string;
  /** Accessible label for tiles that have no visible heading. */
  label?: string;
}

/**
 * The reusable Bento primitive. Every tile shares the same entrance (fade + rise
 * on the Y axis), hover response (1.02 scale on a 300/20 spring) and hover glow.
 *
 * All animated properties are `transform`/`opacity` only — the hover border and
 * radial wash are pre-rendered overlays toggled via opacity — so hover and
 * entrance never trigger layout or paint of the box itself.
 */
export function BentoTile({ children, index = 0, className, glow, label }: BentoTileProps) {
  return (
    <motion.article
      custom={index}
      variants={tileVariants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      whileHover={{ scale: 1.02 }}
      transition={SPRING}
      aria-label={label}
      className={cn(
        "bento-surface group relative z-0 flex h-full min-h-[182px] flex-col overflow-hidden rounded-tile",
        "border border-white/[0.07] p-5 will-change-transform hover:z-10 sm:p-6",
        className,
      )}
    >
      {/* Gradient hairline border, revealed on hover. */}
      <span className="glow-ring pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* Soft radial wash, revealed on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-tile opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(36rem 18rem at 50% -10%, ${glow ?? "oklch(0.72 0.17 292 / 0.14)"}, transparent 60%)`,
        }}
      />
      <div className="relative z-10 flex h-full min-h-0 flex-col">{children}</div>
    </motion.article>
  );
}

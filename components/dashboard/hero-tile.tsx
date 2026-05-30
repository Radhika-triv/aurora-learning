"use client";

import { motion } from "motion/react";
import { ArrowRight, Clock, Play } from "lucide-react";
import { BentoTile } from "./bento-tile";
import { StreakIndicator } from "./streak-indicator";
import { SPRING } from "@/lib/motion";
import { formatFocusTime } from "@/lib/utils";
import type { UserProfile } from "@/types";

interface HeroTileProps {
  user: UserProfile;
  greeting: string;
  index: number;
  className?: string;
}

export function HeroTile({ user, greeting, index, className }: HeroTileProps) {
  return (
    <BentoTile index={index} className={className} glow="oklch(0.72 0.17 292 / 0.2)">
      {/* Ambient orb + grain behind the content. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.17 292 / 0.4), transparent 70%)" }}
      />
      <span aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[0.05]" />

      <p className="text-sm font-medium text-faint">{greeting}</p>
      <h1 className="mt-1.5 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem] sm:leading-tight">
        Welcome back, {user.firstName}.
      </h1>
      <p className="mt-2.5 max-w-md text-sm leading-relaxed text-muted">
        You&rsquo;re on a{" "}
        <span className="font-medium text-foreground">{user.streakDays}-day streak</span> — your
        strongest run yet. Pick up right where you left off.
      </p>

      <div className="mt-6">
        <StreakIndicator days={user.streakDays} />
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING}
          className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-canvas outline-none focus-visible:ring-2 focus-visible:ring-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <Play className="size-4 fill-current" />
          Resume learning
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
        </motion.button>

        <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-sm text-muted">
          <Clock className="size-4 text-cyan" />
          <span className="tabular-nums">{formatFocusTime(user.focusMinutesToday)}</span> focused today
        </span>
      </div>
    </BentoTile>
  );
}

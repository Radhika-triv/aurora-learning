"use client";

import { motion } from "motion/react";
import { Target } from "lucide-react";
import { BentoTile } from "./bento-tile";
import { CountUp } from "@/components/ui/count-up";
import type { WeeklyGoal } from "@/types";

interface WeeklyGoalTileProps {
  goal: WeeklyGoal;
  index: number;
  className?: string;
}

export function WeeklyGoalTile({ goal, index, className }: WeeklyGoalTileProps) {
  const fraction = goal.target > 0 ? Math.min(1, goal.completed / goal.target) : 0;
  const remaining = Math.max(0, goal.target - goal.completed);

  return (
    <BentoTile index={index} className={className} glow="oklch(0.81 0.15 158 / 0.16)" label="Weekly goal">
      <header className="flex items-center gap-2 text-sm font-medium text-muted">
        <Target className="size-4 text-emerald" />
        Weekly goal
      </header>

      <div className="relative mx-auto flex flex-1 items-center justify-center">
        <svg viewBox="0 0 100 100" className="size-[92px] -rotate-90" aria-hidden="true">
          <defs>
            <linearGradient id="weekly-goal-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.81 0.15 158)" />
              <stop offset="100%" stopColor="oklch(0.84 0.12 196)" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="9" />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#weekly-goal-gradient)"
            strokeWidth="9"
            strokeLinecap="round"
            pathLength={1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: fraction }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.15 }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold tabular-nums text-foreground">
            <CountUp value={goal.completed} duration={0.9} />
            <span className="text-faint">/{goal.target}</span>
          </span>
          <span className="text-[0.7rem] text-faint">days done</span>
        </div>
      </div>

      <p className="text-center text-xs text-muted">
        {remaining > 0
          ? `${remaining} day${remaining > 1 ? "s" : ""} to your goal`
          : "Goal reached — nice work"}
      </p>
    </BentoTile>
  );
}

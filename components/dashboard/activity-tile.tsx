"use client";

import type { ComponentType } from "react";
import { Clock, Flame, Zap } from "lucide-react";
import { BentoTile } from "./bento-tile";
import { ContributionGraph, LEVEL_BG } from "./contribution-graph";
import { cn } from "@/lib/utils";
import type { ActivitySummary } from "@/types";

interface ActivityTileProps {
  summary: ActivitySummary;
  index: number;
  className?: string;
}

export function ActivityTile({ summary, index, className }: ActivityTileProps) {
  return (
    <BentoTile index={index} className={className} glow="oklch(0.82 0.12 212 / 0.14)">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground">Study activity</h2>
          <p className="mt-0.5 text-sm text-faint">
            <span className="tabular-nums text-muted">{summary.totalContributions}</span> sessions in
            the last {summary.weeksCount} weeks
          </p>
        </div>
        <Legend />
      </header>

      <div className="my-4 flex flex-1 items-center justify-center">
        <ContributionGraph summary={summary} />
      </div>

      <footer className="grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-3.5">
        <Stat icon={Flame} tint="text-amber" label="Current streak" value={`${summary.currentStreak} days`} />
        <Stat icon={Zap} tint="text-violet" label="Longest streak" value={`${summary.longestStreak} days`} />
        <Stat icon={Clock} tint="text-cyan" label="Time invested" value={`${summary.totalHours} hrs`} />
      </footer>
    </BentoTile>
  );
}

function Legend() {
  return (
    <div className="hidden shrink-0 items-center gap-1.5 text-[0.68rem] text-faint sm:flex">
      <span>Less</span>
      {LEVEL_BG.map((bg, i) => (
        <span key={i} className="size-3 rounded-[3px]" style={{ background: bg }} aria-hidden="true" />
      ))}
      <span>More</span>
    </div>
  );
}

interface StatProps {
  icon: ComponentType<{ className?: string }>;
  tint: string;
  label: string;
  value: string;
}

function Stat({ icon: Glyph, tint, label, value }: StatProps) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        <Glyph className={cn("size-3.5 shrink-0", tint)} />
        <span className="truncate text-xs text-faint">{label}</span>
      </div>
      <p className="mt-1 text-sm font-semibold tabular-nums text-foreground">{value}</p>
    </div>
  );
}

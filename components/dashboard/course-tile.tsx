"use client";

import { BentoTile } from "./bento-tile";
import { ProgressBar } from "./progress-bar";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import type { Accent } from "@/lib/accents";
import type { Course } from "@/types";

interface CourseTileProps {
  course: Course;
  accent: Accent;
  /** Pre-formatted on the server to keep the client free of date math. */
  addedLabel: string;
  index: number;
}

function statusFor(progress: number): string {
  if (progress >= 85) return "Almost done";
  if (progress >= 40) return "In progress";
  if (progress > 0) return "Just started";
  return "Not started";
}

export function CourseTile({ course, accent, addedLabel, index }: CourseTileProps) {
  return (
    <BentoTile index={index} glow={accent.glow} className="md:col-span-1">
      {/* Abstract gradient-mesh blob + grain behind the content. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-10 size-36 rounded-full opacity-70 blur-3xl"
        style={{ background: accent.blob }}
      />
      <span aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[0.05]" />

      <header className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-[1.08]",
            accent.iconWrap,
          )}
        >
          <Icon name={course.icon_name} className="size-5" />
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] font-medium text-muted">
          {statusFor(course.progress)}
        </span>
      </header>

      <h3 className="mt-4 line-clamp-2 text-balance text-[0.975rem] font-semibold leading-snug text-foreground">
        {course.title}
      </h3>

      <div className="mt-auto pt-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-faint">{addedLabel}</span>
          <span className="font-semibold tabular-nums text-muted">{course.progress}%</span>
        </div>
        <ProgressBar value={course.progress} accent={accent} delay={0.15 + index * 0.05} />
      </div>
    </BentoTile>
  );
}

"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";
import { BentoTile } from "./bento-tile";
import { Icon } from "@/components/ui/icon";
import { SPRING } from "@/lib/motion";
import type { UpNextLesson } from "@/types";

interface UpNextTileProps {
  lesson: UpNextLesson;
  index: number;
  className?: string;
}

export function UpNextTile({ lesson, index, className }: UpNextTileProps) {
  const progress = Math.round((lesson.lessonNumber / lesson.lessonTotal) * 100);

  return (
    <BentoTile index={index} className={className} glow="oklch(0.72 0.17 292 / 0.14)">
      <div className="flex h-full flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-violet/12 text-violet ring-1 ring-violet/25">
            <Icon name={lesson.icon_name} className="size-6" />
          </span>
          <div className="min-w-0">
            <p className="text-[0.7rem] font-medium uppercase tracking-wider text-faint">
              Up next · {lesson.course}
            </p>
            <h2 className="mt-1 truncate text-base font-semibold tracking-tight text-foreground">
              {lesson.lesson}
            </h2>
            <p className="mt-1 text-xs text-faint">
              Lesson <span className="tabular-nums">{lesson.lessonNumber}</span> of{" "}
              <span className="tabular-nums">{lesson.lessonTotal}</span> · {lesson.durationMinutes} min
              · <span className="tabular-nums">{progress}%</span> complete
            </p>
          </div>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-canvas outline-none focus-visible:ring-2 focus-visible:ring-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas lg:w-auto"
        >
          <Play className="size-4 fill-current" />
          Resume
        </motion.button>
      </div>
    </BentoTile>
  );
}

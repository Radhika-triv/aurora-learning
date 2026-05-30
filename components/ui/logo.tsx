import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

/** The Aurora brand mark — a gradient chip used in the sidebar and mobile header. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-white",
        className,
      )}
      style={{
        backgroundImage: "linear-gradient(135deg, oklch(0.72 0.17 292), oklch(0.62 0.16 256))",
        boxShadow: "0 8px 24px -8px oklch(0.72 0.17 292 / 0.6)",
      }}
      aria-hidden="true"
    >
      <GraduationCap className="size-5" strokeWidth={2.25} />
    </span>
  );
}

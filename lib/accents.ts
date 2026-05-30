/**
 * Per-card accent palette. Each course tile is tinted by its position so the
 * grid reads as a cohesive set rather than four identical cards.
 */
export interface Accent {
  key: string;
  /** Progress-bar fill (CSS background). */
  bar: string;
  /** Abstract gradient-mesh blob that sits behind card content. */
  blob: string;
  /** Tint for the tile's hover glow. */
  glow: string;
  /** Tailwind classes for the icon chip. */
  iconWrap: string;
}

export const ACCENTS: Accent[] = [
  {
    key: "violet",
    bar: "linear-gradient(90deg, oklch(0.66 0.18 292), oklch(0.8 0.13 250))",
    blob: "radial-gradient(circle at 30% 28%, oklch(0.7 0.18 292 / 0.5), transparent 70%)",
    glow: "oklch(0.72 0.17 292 / 0.18)",
    iconWrap: "bg-violet/12 text-violet ring-1 ring-violet/25",
  },
  {
    key: "cyan",
    bar: "linear-gradient(90deg, oklch(0.7 0.13 212), oklch(0.84 0.1 196))",
    blob: "radial-gradient(circle at 30% 28%, oklch(0.78 0.12 212 / 0.45), transparent 70%)",
    glow: "oklch(0.82 0.12 212 / 0.16)",
    iconWrap: "bg-cyan/12 text-cyan ring-1 ring-cyan/25",
  },
  {
    key: "emerald",
    bar: "linear-gradient(90deg, oklch(0.7 0.15 158), oklch(0.83 0.13 168))",
    blob: "radial-gradient(circle at 30% 28%, oklch(0.78 0.15 158 / 0.42), transparent 70%)",
    glow: "oklch(0.81 0.15 158 / 0.16)",
    iconWrap: "bg-emerald/12 text-emerald ring-1 ring-emerald/25",
  },
  {
    key: "amber",
    bar: "linear-gradient(90deg, oklch(0.78 0.13 70), oklch(0.86 0.12 88))",
    blob: "radial-gradient(circle at 30% 28%, oklch(0.82 0.13 72 / 0.42), transparent 70%)",
    glow: "oklch(0.83 0.13 70 / 0.16)",
    iconWrap: "bg-amber/12 text-amber ring-1 ring-amber/25",
  },
];

export function accentForIndex(index: number): Accent {
  return ACCENTS[index % ACCENTS.length];
}

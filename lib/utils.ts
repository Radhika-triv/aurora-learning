import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names while resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Deterministic PRNG (mulberry32). A fixed seed keeps server-generated data
 * identical across renders, so there is never a hydration mismatch.
 */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY_MS = 86_400_000;

/** Compact "2w ago" style relative time, computed once on the server. */
export function formatRelativeTime(iso: string, now: number = Date.now()): string {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const days = Math.floor(diff / DAY_MS);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return months <= 1 ? "1mo ago" : `${months}mo ago`;
}

/** Minutes → "1h 35m" / "45m". */
export function formatFocusTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h <= 0) return `${m}m`;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** Time-of-day greeting (uses the server clock at request time). */
export function greetingFor(date: Date): string {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const LONG_DATE = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export function formatLongDate(date: Date): string {
  return LONG_DATE.format(date);
}

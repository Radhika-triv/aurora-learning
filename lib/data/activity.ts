import "server-only";

import type { ActivityDay, ActivityLevel, ActivitySummary, ActivityWeek } from "@/types";
import { seededRandom } from "@/lib/utils";

const WEEKS = 18;
const SEED = 0x5eed_2026;

const MONTH_FMT = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

function levelFor(count: number): ActivityLevel {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

function startOfUtcDay(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

/**
 * Build a GitHub-style contribution grid ending on `reference`, plus headline
 * stats. Fully deterministic (fixed seed) so the server-rendered markup is
 * stable and never triggers a hydration mismatch on the client tile.
 */
export function buildActivity(reference: Date): ActivitySummary {
  const random = seededRandom(SEED);
  const today = startOfUtcDay(reference);

  // Pad so the grid is exactly WEEKS columns of Sun→Sat, ending with today.
  const totalDays = (WEEKS - 1) * 7 + today.getUTCDay() + 1;
  const start = new Date(today);
  start.setUTCDate(today.getUTCDate() - (totalDays - 1));

  const days: ActivityDay[] = [];
  for (let i = 0; i < totalDays; i += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + i);
    const dow = date.getUTCDay();
    const isWeekend = dow === 0 || dow === 6;

    let count = 0;
    const restChance = isWeekend ? 0.34 : 0.16;
    if (random() >= restChance) {
      // Skew toward shorter sessions; weekends lighter; rare deep-work spikes.
      const intensity = random() ** 1.7 * (isWeekend ? 4.5 : 8);
      count = Math.round(intensity);
      if (random() > 0.94) count += Math.round(random() * 4);
    }
    count = Math.min(12, Math.max(0, count));

    days.push({ date: date.toISOString().slice(0, 10), count, level: levelFor(count) });
  }

  const weeks: ActivityWeek[] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push({ days: days.slice(i, i + 7) });
  }

  const totalContributions = days.reduce((sum, day) => sum + day.count, 0);
  const activeDays = days.reduce((sum, day) => sum + (day.count > 0 ? 1 : 0), 0);

  let longestStreak = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    if (run > longestStreak) longestStreak = run;
  }

  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    if (days[i].count > 0) currentStreak += 1;
    else break;
  }

  const months: string[] = [];
  for (const week of weeks) {
    const first = week.days[0];
    if (!first) continue;
    const label = MONTH_FMT.format(new Date(`${first.date}T00:00:00Z`));
    if (months[months.length - 1] !== label) months.push(label);
  }

  return {
    weeks,
    weeksCount: WEEKS,
    totalContributions,
    activeDays,
    currentStreak,
    longestStreak,
    totalHours: Math.round(totalContributions * 0.5),
    months,
  };
}

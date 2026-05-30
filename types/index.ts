/**
 * Shared domain types. `Course` mirrors the `public.courses` table in Supabase
 * (see supabase/migrations/0001_init.sql) one-to-one.
 */

export interface Course {
  id: string;
  title: string;
  /** 0–100 completion percentage. */
  progress: number;
  /** Name of a lucide-react icon, resolved at render time. */
  icon_name: string;
  created_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  /** lucide-react icon name. */
  icon: string;
  badge?: number;
}

export interface WeeklyGoal {
  completed: number;
  target: number;
}

export interface UserProfile {
  name: string;
  firstName: string;
  role: string;
  initials: string;
  streakDays: number;
  weeklyGoal: WeeklyGoal;
  focusMinutesToday: number;
}

export interface UpNextLesson {
  course: string;
  lesson: string;
  durationMinutes: number;
  lessonNumber: number;
  lessonTotal: number;
  icon_name: string;
}

export type ActivityLevel = 0 | 1 | 2 | 3 | 4;

export interface ActivityDay {
  /** ISO date, `YYYY-MM-DD`. */
  date: string;
  count: number;
  level: ActivityLevel;
}

export interface ActivityWeek {
  days: ActivityDay[];
}

export interface ActivitySummary {
  weeks: ActivityWeek[];
  weeksCount: number;
  totalContributions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  totalHours: number;
  /** Ordered, de-duplicated month abbreviations spanning the range. */
  months: string[];
}

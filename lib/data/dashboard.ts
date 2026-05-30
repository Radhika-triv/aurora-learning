import type { UpNextLesson, UserProfile } from "@/types";

/**
 * The signed-in learner. In a production build this would come from Supabase
 * Auth + a `profiles` row; it is centralised here so the greeting, streak and
 * goal stay consistent across every tile.
 */
export const USER: UserProfile = {
  name: "Radhika Trivedi",
  firstName: "Radhika",
  role: "Software Engineering track",
  initials: "RT",
  streakDays: 12,
  weeklyGoal: { completed: 4, target: 5 },
  focusMinutesToday: 95,
};

/** The lesson the learner should resume — surfaced in the hero + "Up next". */
export const UP_NEXT: UpNextLesson = {
  course: "Advanced React Patterns",
  lesson: "Server Components & the RSC payload",
  durationMinutes: 24,
  lessonNumber: 14,
  lessonTotal: 22,
  icon_name: "Atom",
};

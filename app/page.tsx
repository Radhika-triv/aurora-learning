import { BentoGrid } from "@/components/dashboard/bento-grid";
import { HeroTile } from "@/components/dashboard/hero-tile";
import { ActivityTile } from "@/components/dashboard/activity-tile";
import { WeeklyGoalTile } from "@/components/dashboard/weekly-goal-tile";
import { UpNextTile } from "@/components/dashboard/up-next-tile";
import { CourseTiles } from "@/components/dashboard/course-tiles";
import { CourseSection } from "@/components/dashboard/course-section";
import { buildActivity } from "@/lib/data/activity";
import { UP_NEXT, USER } from "@/lib/data/dashboard";
import { greetingFor } from "@/lib/utils";

// A personalised dashboard — always render per request so live data and the
// time-of-day greeting stay fresh (and never get baked into a static page).
export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const now = new Date();
  const greeting = greetingFor(now);
  const activity = buildActivity(now);

  return (
    <BentoGrid>
      <HeroTile user={USER} greeting={greeting} index={0} className="md:col-span-2 lg:row-span-2" />

      <ActivityTile summary={activity} index={1} className="md:col-span-2 lg:row-span-2" />

      {/*
        Courses are fetched in a Server Component (CourseTiles). CourseSection
        wraps it in Suspense (streamed skeletons) + an error boundary so a failed
        fetch stays contained while the rest of the dashboard stays live.
      */}
      <CourseSection>
        <CourseTiles />
      </CourseSection>

      <WeeklyGoalTile goal={USER.weeklyGoal} index={6} className="lg:col-span-1" />

      <UpNextTile lesson={UP_NEXT} index={7} className="md:col-span-1 lg:col-span-3" />
    </BentoGrid>
  );
}

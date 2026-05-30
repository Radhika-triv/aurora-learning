import { getCourses } from "@/lib/data/courses";
import { accentForIndex } from "@/lib/accents";
import { formatRelativeTime } from "@/lib/utils";
import { CourseTile } from "./course-tile";

/**
 * Async Server Component: fetches courses from Supabase (RSC data fetching) and
 * renders one tile each. Returns a fragment so the tiles become direct children
 * of the Bento grid. Suspended by <Suspense> in the page while it awaits.
 */
export async function CourseTiles() {
  const courses = await getCourses();

  return (
    <>
      {courses.map((course, i) => (
        <CourseTile
          key={course.id}
          course={course}
          accent={accentForIndex(i)}
          addedLabel={`Added ${formatRelativeTime(course.created_at)}`}
          index={2 + i}
        />
      ))}
    </>
  );
}

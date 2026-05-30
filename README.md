# Aurora — Learning Dashboard

A futuristic, dark-mode student dashboard: a Bento-grid workspace for tracking
courses, streaks, and study activity. Built to feel premium and stay
buttery-smooth — hardware-accelerated animations, server-rendered data, and zero
layout shift.

> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
> Motion (Framer Motion) · Supabase · lucide-react

---

## Highlights

- **Server-rendered data** — courses are fetched in a React Server Component from
  Supabase Postgres, streamed into the page behind a `<Suspense>` boundary.
- **Bento grid** — a responsive hero / activity / course / goal layout that
  collapses gracefully from a 4-column desktop grid to a single mobile column.
- **Motion that respects the frame budget** — staggered entrances, spring-physics
  hover, `layoutId` navigation highlight, and progress bars that animate via
  `transform` only. No animation touches a layout property.
- **Resilient by design** — skeleton loaders while data streams, a section-scoped
  error boundary with retry, and a bundled sample dataset so the UI works before
  a database is even connected.
- **Accessible & adaptive** — semantic landmarks, keyboard-focusable controls,
  and full `prefers-reduced-motion` support.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) connect Supabase — see below. Without it, sample data is used.
cp .env.example .env.local

# 3. Run
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint (flat config)
npm run typecheck    # tsc --noEmit
```

---

## Connecting Supabase

The dashboard runs out of the box on a bundled sample dataset. To fetch live
data:

1. **Create a project** at [supabase.com](https://supabase.com) (free tier is
   fine).
2. **Provision the schema + seed.** Open the Supabase **SQL Editor** and run
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql). It
   creates the `courses` table, enables Row Level Security with a public read
   policy, and inserts a few realistic rows.
3. **Add environment variables.** Copy `.env.example` → `.env.local` and fill in
   the values from **Project Settings → API**:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```

   Both are browser-safe: the anon key only grants what RLS allows, and the
   migration grants `SELECT` (read) but no write policy.

### `courses` schema

| column       | type          | notes                                  |
| ------------ | ------------- | -------------------------------------- |
| `id`         | `uuid`        | primary key, `gen_random_uuid()`       |
| `title`      | `text`        | e.g. _Advanced React Patterns_         |
| `progress`   | `integer`     | `0–100`, checked                       |
| `icon_name`  | `text`        | a lucide-react icon name (e.g. `Atom`) |
| `created_at` | `timestamptz` | defaults to `now()`                    |

If the env vars are absent, `getCourses()` returns the seed defined in
[`lib/data/seed.ts`](lib/data/seed.ts) (kept in sync with the SQL). If they are
present but the query fails, the error surfaces in a contained, retryable error
tile — the rest of the dashboard stays interactive.

---

## Architecture

### Server / client component split

The guiding rule: **fetch and compose on the server; only opt into the client
where there's interactivity or animation.**

- **Server Components** render the shell and own all data. `app/page.tsx`
  composes the grid, generates the (deterministic) activity data, and renders
  `CourseTiles` — an `async` Server Component that `await`s Supabase. None of
  this ships to the browser.
- **Client Components** are leaf-level and animation-focused: `BentoTile`,
  `Navigation`, the chart/ring tiles, `CountUp`, the error boundary. They are
  marked `"use client"` and kept small.
- **The bridge** is the children pattern. `CourseSection` is a Client Component
  that owns the `<Suspense>` + error boundary, but the actual data-fetching
  `CourseTiles` is passed to it as `children` — so the Server Component streams
  through a client boundary without any of its code or data leaking client-side,
  and no function props ever cross the boundary.

```
app/layout.tsx ............ persistent shell (sidebar + top bar live here, so
│                           loading/error states never shift the frame)
└─ app/page.tsx ........... Server Component — composes the Bento grid
   ├─ HeroTile ............ client (greeting, streak, CTA)
   ├─ ActivityTile ....... client (contribution graph + stats)
   ├─ CourseSection ...... client wrapper: <ErrorBoundary><Suspense>
   │   └─ CourseTiles .... async Server Component — fetches from Supabase
   │       └─ CourseTile . client (animated progress, hover, gradient mesh)
   ├─ WeeklyGoalTile ..... client (animated SVG ring)
   └─ UpNextTile ......... client
```

### Data fetching, loading & errors

- Fetching uses **`@supabase/ssr`**'s cookie-aware server client (`createServerClient`),
  the App-Router-recommended pattern — ready for auth, with cookie writes safely
  ignored during a render.
- **Loading:** a granular `<Suspense>` around the course grid streams in
  pixel-matched skeleton tiles (subtle `transform`-based shimmer), so the rest of
  the dashboard paints instantly. A route-level `app/loading.tsx` mirrors the full
  grid for navigations.
- **Errors:** a custom client `ErrorBoundary` scopes a failed course fetch to its
  own retryable tile (`router.refresh()`), with `app/error.tsx` as a route-level
  safety net.
- The route is `force-dynamic` — a personalized dashboard should render per
  request so data and the time-of-day greeting stay fresh.

### Animation & interaction

Animations are powered by **Motion** — the current package for the library still
widely known as Framer Motion (`import { motion } from "motion/react"`).

- **Staggered entrance** — every tile shares one variant set and animates
  `opacity` + `translateY`, sequenced by an index-based delay so tiles arrive
  one after another regardless of how they're nested (through Suspense, error
  boundaries, anything).
- **Hover** — tiles lift with `scale: 1.02` on a `spring` (`stiffness: 300,
  damping: 20`); the border glow and radial wash are pre-rendered overlays
  toggled purely with `opacity`.
- **`layoutId` micro-interaction** — the active navigation pill animates between
  items with a shared-layout spring, on both the sidebar and the mobile bar.
- **Progress bars** grow with `scaleX` (origin-left), and the weekly-goal ring
  animates SVG `pathLength` — both GPU-composited.
- **Reduced motion** — a single `<MotionConfig reducedMotion="user">` makes the
  whole tree honour the OS setting; CSS animations are guarded too.

### Zero layout shift

Every entrance and hover animation is restricted to `transform` and `opacity`,
which the browser composites off the main thread without triggering layout or
paint of the element box. Concretely: progress uses `scaleX` (not `width`),
glows are opacity-faded overlays (not animated `box-shadow`), and counters render
in `tabular-nums` with reserved width so digits never reflow neighbours.

### Styling

Tailwind CSS **v4** with a CSS-first config — design tokens (the OKLCH dark
palette, radii, fonts) live in an `@theme` block in
[`app/globals.css`](app/globals.css). The ambient gradient glow and film grain
are fixed, pointer-events-none layers that never participate in layout.
Typography is Geist (sans + mono) via `next/font`.

### Responsive design

| Breakpoint            | Sidebar             | Grid                |
| --------------------- | ------------------- | ------------------- |
| Desktop (≥ 1024px)    | full, collapsible   | 4-column Bento      |
| Tablet (768–1023px)   | icons only          | 2 columns           |
| Mobile (< 768px)      | bottom tab bar      | single column       |

The mobile/desktop nav switch is pure CSS (no JS media queries), so there's no
hydration flash; the tablet "icons only" state is driven by a `data-collapsed`
attribute and `group-data` variants.

---

## Project structure

```
app/                     # routes, layout, loading & error UI, global styles
components/
  dashboard/             # tiles, grid, navigation, top bar, skeletons
  ui/                    # icon resolver, skeleton, count-up, error boundary, logo
  providers/             # MotionConfig provider
lib/
  data/                  # getCourses() + seed, activity generator, profile
  supabase/              # cookie-aware server client
  accents.ts motion.ts icons.ts utils.ts config/
types/                   # shared domain types (Course, ActivitySummary, …)
supabase/migrations/     # schema + RLS + seed SQL
```

---

## Deployment (Vercel)

1. Push to a Git repository and import it into [Vercel](https://vercel.com).
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under
   **Settings → Environment Variables** (optional — omit to deploy with sample
   data).
3. Deploy. The framework preset is detected automatically; no extra config
   needed.

---

## Notes & decisions

- **Sample-data fallback.** Rather than crashing without credentials, the data
  layer degrades to a bundled dataset. This keeps local DX and preview deploys
  frictionless while the live path stays the default whenever env vars exist.
- **Deterministic activity.** The contribution graph is generated server-side
  from a seeded PRNG, so the server and client markup always match — no
  hydration mismatch despite "random"-looking data.
- **One `<main>`, real landmarks.** Layout is built from `<nav>`, `<header>`,
  `<main>`, `<section>`, and `<article>` rather than nested `div`s.
- **React 19 / Compiler-era lint.** Dynamic icons render via `createElement`
  (looked up, not declared in render) and counters use a `MotionValue` instead of
  per-frame `setState`, satisfying the stricter `react-hooks` rules cleanly.
```

-- ─────────────────────────────────────────────────────────────────────────────
-- courses
--
-- Backing table for the dashboard's course tiles. Run this in the Supabase SQL
-- editor (or via `supabase db push`) to provision the schema, row-level
-- security, and a realistic seed dataset.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0 check (progress between 0 and 100),
  icon_name   text not null default 'BookOpen',
  created_at  timestamptz not null default now()
);

create index if not exists courses_created_at_idx on public.courses (created_at desc);

-- Course catalogue is non-sensitive, so reads are public. Row Level Security is
-- still enabled — only the explicit SELECT policy below is granted, and there is
-- no write policy, so the anon/public key cannot mutate the table.
alter table public.courses enable row level security;

drop policy if exists "Courses are readable by everyone" on public.courses;
create policy "Courses are readable by everyone"
  on public.courses
  for select
  using (true);

-- Seed data (idempotent).
insert into public.courses (id, title, progress, icon_name, created_at) values
  ('8f3a1c2e-9b47-4d6a-8e1f-2c5b7a0d9e11', 'Advanced React Patterns',     72, 'Atom',         '2026-05-12T09:24:00Z'),
  ('1d9e4b7a-6c20-4f3b-9a8d-5e2c1b0a7f44', 'Distributed Systems Design',  45, 'Network',      '2026-04-28T14:10:00Z'),
  ('b2c6f08d-3a51-4e92-8d77-9f1a4c6b2e83', 'Rust for Systems Programming', 28, 'Cpu',          '2026-05-21T18:42:00Z'),
  ('5a7d2e93-8f14-4b6c-a0e5-7c3b9d1f6048', 'Designing ML Pipelines',      88, 'BrainCircuit', '2026-03-30T11:05:00Z')
on conflict (id) do nothing;

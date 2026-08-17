-- Plecta waitlist schema
-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query)

create table if not exists waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  email text not null unique,
  motivations text[] not null default '{}',
  communication_challenges text[] not null default '{}',
  recent_communication_problem text,
  practice_frequency text,
  preferred_session_length text,
  desired_improvement text,
  ideas text,
  signup_source text not null default 'direct',
  ip_address text,
  created_at timestamptz not null default now()
);

-- Migration: if this table already exists from an earlier version of this
-- schema (no `motivations` column yet), run this to add it.
alter table waitlist_signups add column if not exists motivations text[] not null default '{}';

create index if not exists waitlist_signups_email_idx on waitlist_signups (lower(email));
create index if not exists waitlist_signups_created_at_idx on waitlist_signups (created_at desc);

-- Row Level Security: locked down by default. The backend talks to Supabase
-- using the service role key, which bypasses RLS, so no public policies are
-- needed. This just makes sure the anon key (if ever exposed) can't read/write.
alter table waitlist_signups enable row level security;

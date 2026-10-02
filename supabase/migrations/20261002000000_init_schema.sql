-- ====================================================================
-- AU Student Hub - Production Database Schema (Supabase PostgreSQL)
-- ====================================================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- Enum types
create type user_role as enum ('student', 'moderator', 'admin', 'super_admin');
create type resource_type_enum as enum ('notes', 'question_paper', 'important_questions', 'syllabus', 'lab', 'question_bank');
create type resource_status_enum as enum ('published', 'pending', 'rejected', 'archived');
create type opportunity_type_enum as enum ('internship', 'job');
create type work_mode_enum as enum ('remote', 'on-site', 'hybrid');
create type opportunity_status_enum as enum ('draft', 'published', 'expired', 'archived');
create type exam_session_enum as enum ('April/May', 'Nov/Dec');
create type question_category_enum as enum ('Important', 'Frequently Asked', 'Unit-wise', 'Exam Focus');
create type study_status_enum as enum ('not_started', 'studying', 'completed');
create type report_type_enum as enum ('broken_link', 'wrong_file', 'incorrect_information', 'copyright_concern', 'expired_opportunity', 'spam');
create type report_status_enum as enum ('open', 'investigating', 'resolved', 'rejected');

-- 1. Profiles Table
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null unique,
  full_name text not null,
  role user_role default 'student' not null,
  avatar_url text,
  department text,
  semester integer check (semester between 1 and 8),
  regulation text default '2021',
  graduation_year integer,
  college text default 'Anna University Affiliated College',
  interests text[] default '{}',
  skills text[] default '{}',
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. Departments Table
create table if not exists departments (
  id text primary key, -- e.g. 'cse', 'it', 'ece'
  code text not null unique,
  name text not null,
  description text,
  icon text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 3. Regulations Table
create table if not exists regulations (
  id text primary key, -- e.g. '2021', '2025'
  year integer not null unique,
  name text not null,
  is_active boolean default true not null,
  description text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 4. Subjects Table
create table if not exists subjects (
  id uuid default uuid_generate_v4() primary key,
  code text not null,
  name text not null,
  department_id text references departments(id) on delete cascade not null,
  semester integer not null check (semester between 1 and 8),
  regulation text references regulations(id) on delete cascade not null,
  credits integer default 3 not null,
  description text,
  syllabus_overview text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  unique (code, regulation)
);

-- 5. Units Table
create table if not exists units (
  id uuid default uuid_generate_v4() primary key,
  subject_id uuid references subjects(id) on delete cascade not null,
  unit_number integer not null check (unit_number between 1 and 5),
  title text not null,
  description text,
  topics text[] default '{}',
  created_at timestamptz default timezone('utc'::text, now()) not null,
  unique (subject_id, unit_number)
);

-- 6. Resources Table (Notes, Syllabi, Lab manuals, etc.)
create table if not exists resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  subject_id uuid references subjects(id) on delete cascade not null,
  unit_id uuid references units(id) on delete set null,
  resource_type resource_type_enum not null,
  s3_key text not null,
  file_name text not null,
  file_size text not null, -- formatted size e.g. '4.2 MB'
  file_size_bytes bigint default 0,
  file_type text default 'application/pdf',
  uploader_id uuid references profiles(id) on delete set null,
  is_verified boolean default false not null,
  is_official boolean default false not null,
  status resource_status_enum default 'published' not null,
  downloads_count integer default 0 not null,
  views_count integer default 0 not null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 7. Question Papers Table
create table if not exists question_papers (
  id uuid default uuid_generate_v4() primary key,
  resource_id uuid references resources(id) on delete cascade not null unique,
  subject_id uuid references subjects(id) on delete cascade not null,
  year integer not null,
  exam_session exam_session_enum not null,
  regulation text references regulations(id) not null,
  exam_type text default 'End Semester Exam',
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 8. Important Questions Table
create table if not exists important_questions (
  id uuid default uuid_generate_v4() primary key,
  subject_id uuid references subjects(id) on delete cascade not null,
  unit_id uuid references units(id) on delete cascade not null,
  question_text text not null,
  marks integer not null check (marks in (2, 13, 15, 16)),
  category question_category_enum default 'Important' not null,
  appearance_years text[] default '{}', -- verified question paper sessions e.g. ['2023 Nov/Dec', '2024 Apr/May']
  answer_notes text,
  is_verified boolean default true not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 9. Question History Table (Historical record of question repetition)
create table if not exists question_history (
  id uuid default uuid_generate_v4() primary key,
  important_question_id uuid references important_questions(id) on delete cascade not null,
  year integer not null,
  exam_session exam_session_enum not null,
  marks integer not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 10. Opportunities (Internships & Jobs)
create table if not exists opportunities (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company_name text not null,
  company_logo text,
  description text not null,
  type opportunity_type_enum not null,
  work_mode work_mode_enum default 'remote' not null,
  location text not null,
  stipend_or_salary text not null,
  duration text, -- e.g. '2 Months', 'Full-time'
  eligibility text[] default '{}', -- e.g. ['CSE', 'IT']
  skills_required text[] default '{}',
  graduation_years integer[] default '{}', -- e.g. [2026, 2027, 2028]
  deadline timestamptz not null,
  apply_url text not null,
  is_verified boolean default false not null,
  status opportunity_status_enum default 'published' not null,
  clicks_count integer default 0 not null,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- 11. Companies (For Placement & Interview Prep)
create table if not exists companies (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  logo text,
  domain text not null,
  description text not null,
  website text,
  selection_process jsonb default '[]'::jsonb,
  coding_topics text[] default '{}',
  technical_questions jsonb default '[]'::jsonb,
  hr_questions jsonb default '[]'::jsonb,
  student_experience_notes text,
  is_verified boolean default true not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 12. Bookmarks Table
create table if not exists bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  item_type text not null check (item_type in ('resource', 'question_paper', 'important_question', 'opportunity', 'company')),
  item_id text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  unique (user_id, item_type, item_id)
);

-- 13. Notifications Table
create table if not exists notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  link text,
  type text default 'academic',
  is_read boolean default false not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 14. Student Submissions (Moderation Queue)
create table if not exists student_submissions (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references profiles(id) on delete cascade not null,
  student_name text not null,
  student_email text not null,
  title text not null,
  department text not null,
  semester integer not null,
  subject_code text not null,
  resource_type resource_type_enum not null,
  description text,
  s3_key text not null,
  file_name text not null,
  file_size text not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'changes_requested')) not null,
  reviewer_id uuid references profiles(id) on delete set null,
  reviewer_notes text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  reviewed_at timestamptz
);

-- 15. Reports Table
create table if not exists reports (
  id uuid default uuid_generate_v4() primary key,
  reporter_id uuid references profiles(id) on delete set null,
  resource_id uuid references resources(id) on delete set null,
  opportunity_id uuid references opportunities(id) on delete set null,
  report_type report_type_enum not null,
  description text not null,
  status report_status_enum default 'open' not null,
  admin_notes text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  resolved_at timestamptz
);

-- 16. Study Progress Table
create table if not exists study_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  subject_id uuid references subjects(id) on delete cascade not null,
  unit_number integer check (unit_number between 1 and 5),
  status study_status_enum default 'not_started' not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null,
  unique (user_id, subject_id, unit_number)
);

-- 17. Admin Actions Audit Log
create table if not exists admin_actions (
  id uuid default uuid_generate_v4() primary key,
  admin_id uuid references profiles(id) on delete set null not null,
  action_type text not null,
  target_entity text not null,
  target_id text not null,
  details jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- ====================================================================
-- Performance Indexes
-- ====================================================================
create index if not exists idx_subjects_department_semester on subjects (department_id, semester, regulation);
create index if not exists idx_resources_subject on resources (subject_id, status);
create index if not exists idx_resources_type on resources (resource_type, status);
create index if not exists idx_question_papers_subject on question_papers (subject_id, year);
create index if not exists idx_important_questions_subject_unit on important_questions (subject_id, unit_id);
create index if not exists idx_opportunities_deadline on opportunities (deadline, status);
create index if not exists idx_opportunities_type on opportunities (type, work_mode);
create index if not exists idx_bookmarks_user on bookmarks (user_id, item_type);
create index if not exists idx_notifications_user_read on notifications (user_id, is_read);
create index if not exists idx_submissions_status on student_submissions (status);
create index if not exists idx_study_progress_user on study_progress (user_id, subject_id);

-- ====================================================================
-- Supabase Row Level Security (RLS)
-- ====================================================================
alter table profiles enable row level security;
alter table subjects enable row level security;
alter table units enable row level security;
alter table resources enable row level security;
alter table question_papers enable row level security;
alter table important_questions enable row level security;
alter table opportunities enable row level security;
alter table companies enable row level security;
alter table bookmarks enable row level security;
alter table notifications enable row level security;
alter table student_submissions enable row level security;
alter table reports enable row level security;
alter table study_progress enable row level security;
alter table admin_actions enable row level security;

-- Profiles: Anyone can read basic profile info, users can edit their own profile
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Public Read for Published Resources & Academics
create policy "Public can view published subjects" on subjects for select using (true);
create policy "Public can view units" on units for select using (true);
create policy "Public can view published resources" on resources for select using (status = 'published');
create policy "Public can view question papers" on question_papers for select using (true);
create policy "Public can view important questions" on important_questions for select using (true);
create policy "Public can view published opportunities" on opportunities for select using (status = 'published');
create policy "Public can view companies" on companies for select using (true);

-- Bookmarks: Private to user
create policy "Users can view own bookmarks" on bookmarks for select using (auth.uid() = user_id);
create policy "Users can manage own bookmarks" on bookmarks for all using (auth.uid() = user_id);

-- Notifications: Private to user
create policy "Users can view own notifications" on notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on notifications for update using (auth.uid() = user_id);

-- Submissions: Students can see their own, Admins/Moderators can see all
create policy "Students can view own submissions" on student_submissions for select using (auth.uid() = student_id);
create policy "Students can insert submissions" on student_submissions for insert with check (auth.uid() = student_id);
create policy "Admins can view all submissions" on student_submissions for select using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role in ('admin', 'super_admin', 'moderator'))
);
create policy "Admins can update submissions" on student_submissions for update using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role in ('admin', 'super_admin', 'moderator'))
);

-- Admin tables & actions:
create policy "Admins can view reports" on reports for select using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role in ('admin', 'super_admin'))
);
create policy "Students can create reports" on reports for insert with check (auth.uid() = reporter_id or reporter_id is null);

create policy "Admins can manage resources" on resources for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role in ('admin', 'super_admin', 'moderator'))
);
create policy "Admins can manage opportunities" on opportunities for all using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role in ('admin', 'super_admin'))
);
create policy "Admins can view audit log" on admin_actions for select using (
  exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role in ('admin', 'super_admin'))
);

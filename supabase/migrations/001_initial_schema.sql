-- profiles extends auth.users
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null default '',
  email text not null default '',
  role text not null default 'user' check (role in ('superadmin', 'admin', 'user')),
  avatar text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Users can view their own profile" on profiles for select using (auth.uid() = id);
create policy "Admins can view all profiles" on profiles for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'superadmin'))
);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);

-- categories
create table if not exists categories (
  id text primary key,
  name text not null,
  icon text,
  parent_id text references categories(id),
  count int default 0,
  sort_order int default 0,
  is_special boolean default false,
  created_at timestamptz default now()
);
alter table categories enable row level security;
create policy "Anyone can view categories" on categories for select using (true);
create policy "Admins can manage categories" on categories for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'superadmin'))
);

-- assets
create table if not exists assets (
  id bigserial primary key,
  name text not null,
  type text not null,
  format text not null,
  size text,
  version text default '1.0',
  category text references categories(id),
  tags text[] default '{}',
  downloads int default 0,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  uploaded_by uuid references profiles(id) on delete set null,
  storage_url text,
  thumbnail_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table assets enable row level security;
create policy "Anyone can view approved assets" on assets for select using (status = 'approved');
create policy "Admins can view all assets" on assets for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'superadmin'))
);
create policy "Admins can manage assets" on assets for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'superadmin'))
);

-- ppt_templates
create table if not exists ppt_templates (
  id bigserial primary key,
  name text not null,
  description text,
  type text not null check (type in ('complete', 'single')),
  category text,
  sub_category text,
  page_count int,
  views int default 0,
  downloads int default 0,
  thumbnail text,
  tag text,
  preview_data jsonb,
  storage_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table ppt_templates enable row level security;
create policy "Anyone can view ppt templates" on ppt_templates for select using (true);
create policy "Admins can manage ppt templates" on ppt_templates for all using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'superadmin'))
);

-- ai_video_projects
create table if not exists ai_video_projects (
  id bigserial primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  status text default 'ready' check (status in ('ready', 'generating', 'queued', 'failed')),
  prompt text,
  duration text,
  ratio text,
  style text,
  voice text,
  outputs text[] default '{}',
  scenes jsonb default '[]',
  summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table ai_video_projects enable row level security;
create policy "Users can view own video projects" on ai_video_projects for select using (auth.uid() = user_id);
create policy "Users can manage own video projects" on ai_video_projects for all using (auth.uid() = user_id);
create policy "Admins can view all video projects" on ai_video_projects for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'superadmin'))
);

-- ai_ppt_projects
create table if not exists ai_ppt_projects (
  id bigserial primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  topic text,
  tone text,
  audience text,
  goal text,
  page_count int default 12,
  status text default 'ready',
  sections text[] default '{}',
  slides jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table ai_ppt_projects enable row level security;
create policy "Users can view own ppt projects" on ai_ppt_projects for select using (auth.uid() = user_id);
create policy "Users can manage own ppt projects" on ai_ppt_projects for all using (auth.uid() = user_id);
create policy "Admins can view all ppt projects" on ai_ppt_projects for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'superadmin'))
);

-- feedback
create table if not exists feedback (
  id bigserial primary key,
  user_id uuid references profiles(id) on delete set null,
  type text not null check (type in ('feature', 'bug', 'experience', 'other')),
  title text not null,
  content text not null,
  status text default 'pending' check (status in ('pending', 'processing', 'resolved', 'rejected')),
  reply text,
  replied_by uuid references profiles(id) on delete set null,
  replied_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table feedback enable row level security;
create policy "Users can view own feedback" on feedback for select using (auth.uid() = user_id);
create policy "Users can create feedback" on feedback for insert with check (auth.uid() = user_id);
create policy "Admins can view all feedback" on feedback for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'superadmin'))
);
create policy "Admins can update feedback" on feedback for update using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'superadmin'))
);

-- audit_logs
create table if not exists audit_logs (
  id bigserial primary key,
  user_id uuid references profiles(id) on delete set null,
  user_name text,
  action text not null,
  target_type text,
  target_id text,
  target_name text,
  details jsonb,
  ip_address text,
  created_at timestamptz default now()
);
alter table audit_logs enable row level security;
create policy "Admins can view audit logs" on audit_logs for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'superadmin'))
);
create policy "System can insert audit logs" on audit_logs for insert with check (true);

-- updated_at trigger function
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger assets_updated_at before update on assets for each row execute function update_updated_at();
create trigger feedback_updated_at before update on feedback for each row execute function update_updated_at();
create trigger ai_video_projects_updated_at before update on ai_video_projects for each row execute function update_updated_at();
create trigger ai_ppt_projects_updated_at before update on ai_ppt_projects for each row execute function update_updated_at();
create trigger profiles_updated_at before update on profiles for each row execute function update_updated_at();

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

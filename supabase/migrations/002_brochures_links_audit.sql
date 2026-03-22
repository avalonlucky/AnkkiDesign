-- ──────────────────────────────────────────────
-- 产品彩页表
-- ──────────────────────────────────────────────
create table if not exists brochures (
  id text primary key,
  title text not null,
  subtitle text,
  category text not null,
  gradient text[] default '{}',
  pages int default 0,
  uploaded_by text not null,
  size text,
  share_code text,
  views int default 0,
  description text,
  file_url text,
  file_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table brochures enable row level security;
create policy "brochures_select" on brochures for select using (true);
create policy "brochures_insert" on brochures for insert with check (true);
create policy "brochures_update" on brochures for update using (true);
create policy "brochures_delete" on brochures for delete using (true);

create trigger brochures_updated_at before update on brochures
  for each row execute function update_updated_at();

-- ──────────────────────────────────────────────
-- 分享链接表
-- ──────────────────────────────────────────────
create table if not exists share_links (
  id text primary key,
  brochure_id text references brochures(id) on delete cascade,
  brochure_title text not null,
  share_code text not null,
  url text not null,
  password text default '',
  expires_at date,
  views int default 0,
  enabled boolean default true,
  created_by text not null,
  created_at timestamptz default now()
);
alter table share_links enable row level security;
create policy "share_links_select" on share_links for select using (true);
create policy "share_links_insert" on share_links for insert with check (true);
create policy "share_links_update" on share_links for update using (true);
create policy "share_links_delete" on share_links for delete using (true);

-- ──────────────────────────────────────────────
-- 审核队列表（用户上传待审核内容）
-- ──────────────────────────────────────────────
create table if not exists audit_items (
  id text primary key,
  name text not null,
  format text,
  size text,
  version text default '1.0',
  category text,
  sub_category text,
  updated_by text,
  submitted_at text,
  audit_status text default 'pending' check (audit_status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);
alter table audit_items enable row level security;
create policy "audit_items_select" on audit_items for select using (true);
create policy "audit_items_insert" on audit_items for insert with check (true);
create policy "audit_items_update" on audit_items for update using (true);
create policy "audit_items_delete" on audit_items for delete using (true);

-- ──────────────────────────────────────────────
-- Storage bucket: brochures（需在 Dashboard 手动创建）
-- Dashboard → Storage → New Bucket → 名称: brochures → Public: true
-- ──────────────────────────────────────────────

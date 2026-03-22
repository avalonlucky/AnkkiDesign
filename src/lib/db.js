import { supabase } from './supabase';

// ─── Brochures ───────────────────────────────────────────────────────────────

export const dbFetchBrochures = () =>
  supabase.from('brochures').select('*').order('created_at', { ascending: false });

export const dbInsertBrochure = (row) =>
  supabase.from('brochures').insert(row).select().single();

export const dbUpdateBrochure = (id, data) =>
  supabase.from('brochures').update(data).eq('id', id);

export const dbDeleteBrochure = (id) =>
  supabase.from('brochures').delete().eq('id', id);

// ─── Storage ─────────────────────────────────────────────────────────────────

export const uploadBrochurePDF = async (file, id) => {
  const path = `${id}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from('brochures').upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = supabase.storage.from('brochures').getPublicUrl(path);
  return data.publicUrl;
};

// ─── Share Links ─────────────────────────────────────────────────────────────

export const dbFetchShareLinks = () =>
  supabase.from('share_links').select('*').order('created_at', { ascending: false });

export const dbInsertShareLink = (row) =>
  supabase.from('share_links').insert(row).select().single();

export const dbUpdateShareLink = (id, data) =>
  supabase.from('share_links').update(data).eq('id', id);

export const dbDeleteShareLink = (id) =>
  supabase.from('share_links').delete().eq('id', id);

// ─── Audit Items ─────────────────────────────────────────────────────────────

export const dbFetchAuditItems = () =>
  supabase.from('audit_items').select('*').order('created_at', { ascending: false });

export const dbInsertAuditItem = (row) =>
  supabase.from('audit_items').insert(row).select().single();

export const dbUpdateAuditItem = (id, data) =>
  supabase.from('audit_items').update(data).eq('id', id);

// ─── Mappers: DB row → app object ────────────────────────────────────────────

export const mapBrochure = (row) => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle || row.title,
  category: row.category,
  gradient: row.gradient || ['#1478F0', '#0a4fa8'],
  pages: row.pages || 0,
  uploadedBy: row.uploaded_by,
  size: row.size || '-',
  shareCode: row.share_code || row.id,
  views: row.views || 0,
  description: row.description || '',
  fileUrl: row.file_url || null,
  fileName: row.file_name || null,
  thumbnailUrl: row.thumbnail_url || null,
  previewPages: [{ label: '封面', bg: (row.gradient || ['#1478F0'])[0], title: row.title, sub: row.subtitle || '' }],
});

export const mapShareLink = (row) => ({
  id: row.id,
  brochureId: row.brochure_id,
  brochureTitle: row.brochure_title,
  shareCode: row.share_code,
  url: row.url,
  password: row.password || '',
  expiresAt: row.expires_at || null,
  views: row.views || 0,
  enabled: row.enabled !== false,
  createdBy: row.created_by,
  createdAt: row.created_at ? row.created_at.split('T')[0] : '',
});

export const mapAuditItem = (row) => ({
  id: row.id,
  name: row.name,
  format: row.format || '-',
  size: row.size || '-',
  version: row.version || '1.0',
  category: row.category,
  subCategory: row.sub_category,
  updatedBy: row.updated_by,
  updatedAt: row.submitted_at || '',
  auditStatus: row.audit_status || 'pending',
});

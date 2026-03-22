import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://rbatwgvghtkwfwxlqitz.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_39hlu8AFeGCXEoIXMnJ0Lg_paFJuftn';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

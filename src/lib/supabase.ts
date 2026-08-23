import { createClient } from '@supabase/supabase-js';
import { ProjectItem } from '../types';

// Safely read Supabase credentials
const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch projects from Supabase table 'projects' if configured, otherwise returns local projects
 */
export async function fetchProjects(fallbackProjects: ProjectItem[]): Promise<ProjectItem[]> {
  if (!isSupabaseConfigured) {
    return fallbackProjects;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('featured', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase projects query returned empty or error, using local fallback:', error?.message);
      return fallbackProjects;
    }

    return data as ProjectItem[];
  } catch (err) {
    console.warn('Error fetching from Supabase, using local fallback:', err);
    return fallbackProjects;
  }
}

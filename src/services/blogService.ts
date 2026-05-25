import { supabase } from '../lib/supabase';

export interface Post {
  id: string | number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  tag: string;
  date: string;
  source: string;
  link?: string;
}

export const blogService = {
  async getPosts(): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching posts from Supabase:', error);
      throw error;
    }

    return data || [];
  },

  async getPostById(id: string | number): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post by ID:', error);
      return null;
    }

    return data;
  }
};

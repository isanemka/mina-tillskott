import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_KEY = process.env.SUPABASE_KEY as string;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase URL och KEY saknas.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default defineEventHandler(async () => {
  try {
    const { data, error } = await supabase.from('supplements').select('*');

    if (error) {
      console.error('Error fetching supplements:', error.message);
      throw createError({ statusCode: 500, message: 'Failed to fetch supplements' });
    }

    return data;
  } catch (err) {
    console.error('Unexpected error:', err);
    throw createError({ statusCode: 500, message: 'Unexpected error occurred' });
  }
});
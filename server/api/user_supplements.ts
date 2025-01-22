import { createClient, User } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default defineEventHandler(async (event) => {
  const authHeader = event.req.headers.authorization;

  if (!authHeader) {
    return { error: 'Authorization header missing' };
  }

  const token = authHeader.split(' ')[1];

  // Validating the token
  const { data, error } = await supabase.auth.getUser(token);

  // Check if the user is authenticated
  const user = data?.user as User | null;

  if (error || !user) {
    console.error('Token validation error:', error?.message);
    return { error: 'User not authenticated' };
  }

  const { data: supplements, error: fetchError } = await supabase
    .from('user_supplements') // Select the table
    .select('*') // Select all columns
    .eq('user_id', user.id); // Filter by user ID

  if (fetchError) {
    console.error('Error fetching supplements:', fetchError.message);
    return { error: fetchError.message };
  }

  return supplements;
});
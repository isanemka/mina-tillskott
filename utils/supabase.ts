export const fetchSupplements = async () => {
  const { $supabase } = useNuxtApp(); // Hämta Supabase från pluginen
  const { data, error } = await $supabase.from('supplements').select('*');
  if (error) {
    console.error('Error fetching supplements:', error);
    throw error;
  }
  return data;
};

export const addSupplement = async (supplement: any) => {
  const { $supabase } = useNuxtApp(); // Hämta Supabase från pluginen
  const { data, error } = await $supabase
    .from('user_supplements')
    .insert([supplement]);
  if (error) {
    console.error('Error adding supplement:', error);
    throw error;
  }
  return data;
};
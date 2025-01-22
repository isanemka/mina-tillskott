import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const SUPABASE_URL = config.public.SUPABASE_URL;
  const SUPABASE_KEY = config.public.SUPABASE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase URL och Key måste vara definierade i runtimeConfig.');
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  return {
    provide: {
      supabase,
    },
  };
});
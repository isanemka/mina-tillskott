<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

async function register() {
  errorMessage.value = '';
  successMessage.value = '';

  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Lösenorden matchar inte.';
    return;
  }

  try {
    const { $supabase } = useNuxtApp();

    const { data, error } = await $supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.error('Error signing up:', error.message);
      errorMessage.value = 'Registreringen misslyckades. Försök igen.';
      return;
    }

    successMessage.value = 'Registreringen lyckades! Du kan nu logga in.';

    // Redirect to login page after 2 seconds
    setTimeout(() => router.push('/login'), 2000);
  } catch (err) {
    console.error('Unexpected error during registration:', err);
    errorMessage.value = 'Ett oväntat fel inträffade. Försök igen.';
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
    <h1 class="text-2xl font-semibold mb-4">Registrera dig</h1>

    <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 text-red-500 rounded">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="mb-4 p-2 bg-green-100 text-green-500 rounded">
      {{ successMessage }}
    </div>

    <form @submit.prevent="register" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">E-post</label>
        <input
          id="email"
          type="email"
          v-model="email"
          required
          class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Lösenord</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Bekräfta lösenord</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          required
          class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Registrera
      </button>
    </form>
  </div>
</template>
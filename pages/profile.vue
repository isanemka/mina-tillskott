<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';

const { $supabase } = useNuxtApp();
const user = ref(null);
const errorMessage = ref('');

async function fetchUser() {
  const { data, error } = await $supabase.auth.getUser();
  if (error) {
    errorMessage.value = 'Kunde inte hämta användarinformation.';
  } else {
    user.value = data.user;
  }
}

fetchUser();

function logout() {
  $supabase.auth.signOut();
  window.location.href = '/login';
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-gray-900 shadow rounded">
    <h1 class="text-2xl font-semibold mb-4">Din Profil</h1>

    <div v-if="errorMessage" class="mb-4 p-2 bg-red-100 text-red-500 rounded">
      {{ errorMessage }}
    </div>

    <div v-else-if="user">
      <div class="mb-4">
        <label class="block text-sm font-medium text-white">E-post:</label>
        <p class="mt-1 text-white">{{ user.email }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-white">ID:</label>
        <p class="mt-1 text-white">{{ user.id }}</p>
      </div>

      <button @click="logout" class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        Logga ut
      </button>
    </div>
  </div>
</template>
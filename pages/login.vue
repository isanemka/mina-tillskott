<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');

async function login() {
  const { $supabase } = useNuxtApp(); // Supabase from plugin

  errorMessage.value = '';
  successMessage.value = '';

  try {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.error('Login error:', error.message);
      errorMessage.value = 'Fel e-post eller lösenord.';
      return;
    } else if (data) {
      const token = data.session.access_token;
      console.log('Access Token:', token);
    }

    successMessage.value = 'Du är inloggad!';
    console.log('Logged in user:', data.user.id);
  } catch (err) {
    console.error('Unexpected error:', err);
    errorMessage.value = 'Något gick fel. Försök igen senare.';
  }
}
</script>

<template>
  <div>
    <input v-model="email" type="email" placeholder="E-post" />
    <input v-model="password" type="password" placeholder="Lösenord" />
    <button @click="login">Logga in</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>
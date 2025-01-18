<template>
  <div class="min-h-screen flex flex-col font-bebas-neue">
    <!--
    <head>
      <link rel="manifest" href="/manifest.webmanifest">
    </head>
    -->
    <header class="bg-primary text-white p-2 sm:p-4 flex items-center justify-around sm:justify-between">
      <div class="flex items-center space-x-4">
        <img src="/assets/logo.png" alt="logo" class="w-10 h-10 sm:w-16 sm:h-16" />
        <h1 class="font-bebas-neue text-xl sm:text-3xl">Mina Tillskott</h1>
      </div>
      <nav>
        <button @click="goToHome" class="hover:text-gray-300 mr-4">
          <UIcon name="heroicons-home" class="w-6 h-6 sm:w-9 sm:h-9" aria-label="Inställningar" />
        </button>
        <button @click="goToHistory" class="hover:text-gray-300 mr-4">
          <UIcon name="heroicons-outline-calendar-days" class="w-6 h-6 sm:w-9 sm:h-9" aria-label="Inställningar" />
        </button>
        <button @click="goToSettings" class="hover:text-gray-300">
          <UIcon name="heroicons-outline-cog" class="w-6 h-6 sm:w-9 sm:h-9" aria-label="Inställningar" />
        </button>
      </nav>
    </header>

    <main class="flex-grow p-6">
      <NuxtPage />
    </main>

    <footer class="bg-primary text-center py-4">
      <p>© 2025 Mina Tillskott</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goToHome = () => {
  router.push('/');
};
const goToHistory = () => {
  router.push('/history');
};
const goToSettings = () => {
  router.push('/settings');
};
</script>

<style>
.bg-primary {
  background-color: #2698FD;
}
</style>
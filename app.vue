<template>
  <div class="min-h-screen flex flex-col font-lato">
    <Header />
    
    <main class="flex-grow p-6 bg-gray-800">
      <NuxtPage />
    </main>

    <Footer />

  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue';
</script>

<style>
.bg-primary {
  background-color: #2698FD;
}
</style>
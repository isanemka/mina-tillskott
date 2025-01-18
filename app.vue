<template>
  <NContainer class="min-h-screen flex flex-col font-bebas-neue">
    <head>
      <link rel="manifest" href="/manifest.webmanifest">
    </head>
    <header class="bg-primary text-white p-4 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <img src="/assets/logo.png" alt="logo" class="w-20 h-16" />
        <h1 class="font-bebas-neue text-3xl">Mina Tillskott</h1>
      </div>
      <nav>
        <ul class="flex space-x-4">
          <li>
            <NuxtLink to="/" class="text-white">Översikt</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/history" class="text-white">Historik</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/settings" class="text-white">Inställningar</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <main class="flex-grow p-6">
      <NuxtPage />
    </main>

    <footer class="bg-primary text-center py-4">
      <p>© 2025 Mina Tillskott</p>
    </footer>
  </NContainer>
</template>

<script setup>
</script>

<style>
.bg-primary {
  background-color: #2698FD;
}
</style>
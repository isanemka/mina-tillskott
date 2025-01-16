// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@vite-pwa/nuxt',
  ],
  css: [
    'animate.css',
    '@/assets/styles/global.css',
  ],
  pwa: { 
    manifest: { 
      name: 'MinaTillskott' } },
})

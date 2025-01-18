// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'manifest',
          href: '/manifest.webmanifest',
        }
      ]
    },
  },
  plugins: [
    '~/plugins/registerServiceWorker.ts',
  ],
  modules: [
    '@nuxt/ui',
    '@vite-pwa/nuxt',
  ],
  css: [
    'animate.css',
    '@/assets/styles/global.css',
  ],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      id: '/',
      short_name: 'MT',
      name: 'MinaTillskott',
      description: 'En app för att hålla koll på dina kosttillskott.',
      lang: 'sv',
      theme_color: '#2698FD',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg}'],
      navigateFallback: '/',
      runtimeCaching: [
    {
      urlPattern: ({ url }) => url.pathname.startsWith('/_nuxt/'),
      handler: 'CacheFirst',
      options: {
        cacheName: 'nuxt-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: ({ url }) => url.origin === self.location.origin,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'local-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 1 vecka
        },
      },
    },
  ],
    },
  },
});
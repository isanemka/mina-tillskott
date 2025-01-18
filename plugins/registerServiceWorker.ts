export default defineNuxtPlugin(() => {
  if (process.client) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrerad:', registration);
        })
        .catch((error) => {
          console.error('Service Worker-registrering misslyckades:', error);
        });
    } else {
      console.warn('Service Worker stöds inte i denna miljö.');
    }
  }
});
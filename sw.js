self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim(); // Ensures that sw is loaded correctly
});

self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching data ...', event);
  event.respondWith(fetch(event.request)); // just return the fetch request
});

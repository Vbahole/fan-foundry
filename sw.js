const CACHE_NAME = 'fan-foundry-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './chute-finder.png',
  './fan-foundry.png'
];

// Install and Cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Serve from Cache
self.addEventListener('fetch', event => {
  // We only cache the static UI. We let the dynamic AWS API calls pass through.
  if (event.request.url.includes('execute-api')) return; 

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

const CACHE_NAME = 'followop-v3';

// Only cache static assets - NEVER touch localStorage or user data
const STATIC_ASSETS = [
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  var url = e.request.url;
  
  // Never intercept API calls - let them go straight to network
  if(url.includes('/api/')) return;
  
  // Never intercept the main app - always fetch fresh from network
  if(url.endsWith('/') || url.endsWith('/index.html') || url.endsWith('followop.app')) return;
  
  // Only cache icons and manifest - everything else goes to network
  if(url.includes('icon-') || url.includes('manifest.json')) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        return cached || fetch(e.request);
      })
    );
  }
});

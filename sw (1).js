// FollowOp Service Worker
// PURPOSE: Enable PWA install and home screen icon ONLY
// NEVER clears localStorage, NEVER intercepts app requests

const CACHE_NAME = 'followop-icons-v1';

// Only cache static assets - icons and manifest
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(['/icon-192.png', '/icon-512.png', '/manifest.json']);
    }).catch(function(err) {
      console.log('SW install error:', err);
    })
  );
  // Take over immediately
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    // Only delete old icon caches - never touch anything else
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

// CRITICAL: Do NOT intercept ANY fetch requests
// Let everything go straight to network
// This prevents the service worker from ever interfering with the app
self.addEventListener('fetch', function(e) {
  // Only serve cached icons - never intercept anything else
  var url = e.request.url;
  if (url.includes('icon-192.png') || url.includes('icon-512.png') || url.includes('manifest.json')) {
    e.respondWith(
      caches.match(e.request).then(function(cached) {
        return cached || fetch(e.request);
      })
    );
  }
  // Everything else - do nothing, let browser handle normally
});

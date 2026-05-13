// FollowOp Service Worker v1.3.0
// Updated: 2026-05-08 — Clients/Referrals rebranding, calendar, photo upload, enhanced CSV, brief export

var CACHE_NAME = 'followop-v1.3.0';
var URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/guide.html',
  '/guide-content.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Install — cache app shell
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Caching app shell v1.3.0');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate — clear old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          console.log('[SW] Deleting old cache:', name);
          return caches.delete(name);
        })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', function(event) {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip API calls — always go to network
  if (event.request.url.indexOf('/api/') > -1) return;

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request).then(function(response) {
      // Clone and cache successful responses
      if (response && response.status === 200 && response.type === 'basic') {
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseClone);
        });
      }
      return response;
    }).catch(function() {
      // Network failed — try cache
      return caches.match(event.request).then(function(response) {
        return response || new Response('Offline — please check your connection.', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({ 'Content-Type': 'text/plain' })
        });
      });
    })
  );
});

// SahYog Service Worker - Offline Caching & Background Sync
const CACHE_NAME = 'sahyog-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/welcome',
  '/login',
  '/manifest.json',
  '/logo.png',
  '/icons/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-caching assets warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Bypass API and tracking socket requests from cache-only
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          JSON.stringify({ 
            offline: true, 
            message: 'You are currently offline. Cached data displayed.' 
          }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // Network-first with Cache fallback for pages and assets
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clonedResponse = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If offline and request is HTML, fallback to root or welcome
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/') || caches.match('/welcome');
          }
          return new Response('Network offline', { status: 503 });
        });
      })
  );
});

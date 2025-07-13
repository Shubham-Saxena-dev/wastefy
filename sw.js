
const CACHE_NAME = 'Wastefy-cache-v1';

// On install, activate the new service worker immediately.
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

// On activation, clear out any old caches.
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all open clients
  );
});

// On fetch, use a stale-while-revalidate caching strategy.
self.addEventListener('fetch', (event) => {
  // Exclude external API calls from being cached.
  if (
    event.request.url.includes('generativelanguage.googleapis.com') ||
    event.request.url.includes('nominatim.openstreetmap.org')
  ) {
    return;
  }
  
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Try to get the response from the cache.
      const cachedResponse = await cache.match(event.request);
      
      // Fetch the response from the network.
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // If we get a valid response, put it in the cache.
        if (networkResponse && networkResponse.status === 200) {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(err => {
        // The network failed.
        // If we have a cached response, the code below will have already returned it.
        // If not, this error will propagate to the browser.
        console.error('Network fetch failed:', err);
        throw err;
      });

      // Return the cached response if it's available; otherwise, wait for the network.
      return cachedResponse || fetchPromise;
    })
  );
});

// CMR Smart Issuer — Service Worker v1.0
// Cachea los archivos necesarios para funcionamiento 100% offline

const CACHE_NAME = 'cmr-tool-v1.0';

const FILES_TO_CACHE = [
    './CMR_Generator_v3.html',
    './pdf-lib.min.js',
    './manifest_cmr.json'
];

// Instalación: cachea todos los archivos
self.addEventListener('install', event => {
    console.log('[CMR SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => Promise.allSettled(
                FILES_TO_CACHE.map(file =>
                    cache.add(file).catch(e => console.warn('[CMR SW] Could not cache:', file, e))
                )
            ))
            .then(() => self.skipWaiting())
    );
});

// Activación: elimina caches antiguas
self.addEventListener('activate', event => {
    console.log('[CMR SW] Activating...');
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

// Fetch: sirve desde cache, con fallback a red
self.addEventListener('fetch', event => {
    if (!event.request.url.startsWith(self.location.origin)) return;
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(response => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => console.warn('[CMR SW] Fetch failed:', event.request.url));
        })
    );
});

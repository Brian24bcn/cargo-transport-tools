// DGR Acceptance Tool — Service Worker v1.0
// Cachea los archivos necesarios para funcionamiento 100% offline

const CACHE_NAME = 'dgr-tool-v1.0';

const FILES_TO_CACHE = [
    './DGR_Checksheet_Generator_v4.html',
    './pdf-lib.min.js',
    './manifest_dgr.json'
];

// Instalación: cachea todos los archivos
self.addEventListener('install', event => {
    console.log('[DGR SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => Promise.allSettled(
                FILES_TO_CACHE.map(file =>
                    cache.add(file).catch(e => console.warn('[DGR SW] Could not cache:', file, e))
                )
            ))
            .then(() => self.skipWaiting())
    );
});

// Activación: elimina caches antiguas
self.addEventListener('activate', event => {
    console.log('[DGR SW] Activating...');
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
            }).catch(() => console.warn('[DGR SW] Fetch failed:', event.request.url));
        })
    );
});

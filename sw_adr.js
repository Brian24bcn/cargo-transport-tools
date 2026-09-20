// ADR Transport Tool — Service Worker v1.0
// Cachea los archivos necesarios para funcionamiento 100% offline

const CACHE_NAME = 'adr-tool-v1.0';

const FILES_TO_CACHE = [
    './ADR_Generator_v4.html',
    './pdf-lib.min.js',
    './manifest_adr.json'
];

// Instalación: cachea todos los archivos
self.addEventListener('install', event => {
    console.log('[ADR SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[ADR SW] Caching files...');
                // addAll falla si algún archivo no existe — usamos add individual con catch
                return Promise.allSettled(
                    FILES_TO_CACHE.map(file => cache.add(file).catch(e => console.warn('[ADR SW] Could not cache:', file, e)))
                );
            })
            .then(() => self.skipWaiting())
    );
});

// Activación: elimina caches antiguas
self.addEventListener('activate', event => {
    console.log('[ADR SW] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => {
                        console.log('[ADR SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: sirve desde cache, con fallback a red
self.addEventListener('fetch', event => {
    // Solo interceptar requests del mismo origen
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse; // ✅ Servido desde cache (offline)
                }
                // No está en cache — intentar red y guardar para futuro
                return fetch(event.request)
                    .then(networkResponse => {
                        if (networkResponse && networkResponse.status === 200) {
                            const responseToCache = networkResponse.clone();
                            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Sin red y sin cache — nada que hacer
                        console.warn('[ADR SW] Fetch failed and no cache available for:', event.request.url);
                    });
            })
    );
});

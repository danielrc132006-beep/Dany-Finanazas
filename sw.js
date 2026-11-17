// Service worker mínimo: primero la red (siempre la versión más nueva) y, si no hay internet, la copia guardada.
// Las llamadas a la API son POST y no pasan por aquí.
const CACHE = 'dany-finanzas-v3';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copia = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia));
      return r;
    }).catch(() => caches.match(e.request))
  );
});

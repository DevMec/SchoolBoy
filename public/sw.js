// Offline-cache v2:
//  - HTML (navigatie): eerst netwerk, cache als reserve → updates komen altijd door
//  - overige bestanden (js/css/afbeeldingen, met hash in de naam): cache eerst
const CACHE = 'schoolboy-v2'

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./'])))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return

  // HTML: netwerk eerst, zodat een nieuwe versie meteen zichtbaar is
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(
      fetch(req)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE).then((c) => c.put(req, copy))
          return response
        })
        .catch(() => caches.match(req).then((m) => m || caches.match('./')))
    )
    return
  }

  // Assets: cache eerst (bestandsnamen bevatten een hash, dus altijd juist)
  event.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req).then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE).then((c) => c.put(req, copy))
          }
          return response
        })
    )
  )
})

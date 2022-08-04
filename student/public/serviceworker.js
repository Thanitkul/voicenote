const CACHE_NAME = "verison-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// Install a service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cache) => {
      return fetch(event.request).catch((err) => caches.match("offline.html"));
    })
  );
});

// Register the service worker
self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

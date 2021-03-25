const CACHE_NAME = "appV1";
const urlsToCache = ["index.html", "offline.html"];
//
const self = this;

// install sericeworker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache Opened");
      return cache.addAll(urlsToCache);
    })
  );
});

// fetch files
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// activate pwa
self.addEventListener("activate", (event) => {
  const chacheWhiteList = [];
  chacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cachesNames) =>
      Promise.all(
        cachesNames.map((cacheName) => {
          if (!chacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

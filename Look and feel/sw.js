const cacheName = "latesNews-v1";

//Cache our know resource during the install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll([
        "./js/main.js",
        "./images/homescreen.png",
        "./css/site.css",
        "./data/latest.json",
        "./data/data-1.json",
        "./article.html",
        "./index.html"
      ]);
    })
  );
});

//Cache any new resources as they are fetches

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then(function(response) {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(function(response) {
          if (!response || response !== 200) {
            return response;
          }
          const responseToacache = response.clone();
          caches.open(cacheName).then(function(cahce) {
            cache.put(event.request, responseToacache);
          });
          return response;
        });
      })
  );
});

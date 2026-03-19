var CACHE_VERSION = "7";
var CACHE_NAME = "portfolio-v" + CACHE_VERSION;
var STATIC_ASSETS = [
  "/portfolio/",
  "/portfolio/index.html",
  "/portfolio/projets.html",
  "/portfolio/competences.html",
  "/portfolio/experience.html",
  "/portfolio/contact.html",
  "/portfolio/blog.html",
  "/portfolio/blog/purge-ansible.html",
  "/portfolio/404.html",
  "/portfolio/mentions-legales.html",
  "/portfolio/offline.html",
  "/portfolio/en/index.html",
  "/portfolio/en/projects.html",
  "/portfolio/en/skills.html",
  "/portfolio/en/experience.html",
  "/portfolio/en/contact.html",
  "/portfolio/en/blog.html",
  "/portfolio/en/blog/purge-ansible.html",
  "/portfolio/en/legal.html",
  "/portfolio/assets/css/style.min.css",
  "/portfolio/assets/js/main.min.js",
  "/portfolio/assets/js/components.min.js",
  "/portfolio/assets/img/favicon.svg",
  "/portfolio/assets/img/profile.webp",
  "/portfolio/assets/img/profile-400w.webp",
  "/portfolio/assets/cv/CV_JOSE_Anthony.pdf",
  "/portfolio/manifest.json"
];

// Install: pre-cache static assets
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Fetch: network-first for HTML, cache-first for assets
self.addEventListener("fetch", function (e) {
  var url = new URL(e.request.url);

  // Skip non-GET and external requests
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;

  // HTML pages: network-first
  if (e.request.headers.get("accept") && e.request.headers.get("accept").includes("text/html")) {
    e.respondWith(
      fetch(e.request).then(function (res) {
        var clone = res.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(e.request, clone); });
        return res;
      }).catch(function () {
        return caches.match(e.request).then(function (cached) {
          return cached || caches.match("/portfolio/offline.html");
        });
      })
    );
    return;
  }

  // Static assets: cache-first
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      if (cached) return cached;
      return fetch(e.request).then(function (res) {
        // Cache images and other static assets on the fly
        if (res.ok && (url.pathname.match(/\.(webp|css|js|svg|pdf|json|jpg)$/))) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(e.request, clone); });
        }
        return res;
      });
    })
  );
});

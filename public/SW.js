let CACHE_NAME = 'Soltia Cache V1.0.0';
let urlsToCache = ['/', '/challenge'];
let isOnline = true;
let version = 1;

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('message', onMessage);
self.addEventListener('fetch', onFetch);

function onInstall() {
  console.log(`Service Worker (v${version}) installed`);
  self.skipWaiting().then(r => r);
}

function onActivate(evt) {
  evt.waitUntil(handleActivation());
}

function onMessage({ data }) {
  if ('statusUpdate' in data) {
    ({ isOnline } = data.statusUpdate);
    console.log(
      `Service Worker (v${version}) status update... isOnline:${isOnline}`,
    );
  }
}

async function handleActivation() {
  await clearCaches();
  await cacheLoggedOutFiles(/*forceReload=*/ true);
  await clients.claim();
  console.log(`Service Worker (v${version}) activated`);
}

async function clearCaches() {
  let cacheNames = await caches.keys();
  let oldCacheNames = cacheNames.filter(function matchOldCache(cacheName) {
    let [, cacheNameVersion] = cacheName.match(/^Soltia Cache (\d+)$/) || [];
    cacheNameVersion =
      cacheNameVersion != null ? Number(cacheNameVersion) : cacheNameVersion;
    return cacheNameVersion > 0 && version !== cacheNameVersion;
  });
  await Promise.all(
    oldCacheNames.map(function deleteCache(cacheName) {
      return caches.delete(cacheName);
    }),
  );
}

async function cacheLoggedOutFiles(forceReload = false) {
  let cache = await caches.open(CACHE_NAME);

  return Promise.all(
    urlsToCache.map(async function requestFile(url) {
      try {
        let res;

        if (!forceReload) {
          res = await cache.match(url);
          if (res) {
            return;
          }
        }

        let fetchOptions = {
          method: 'GET',
          cache: 'no-store',
          credentials: 'omit',
        };
        res = await fetch(url, fetchOptions);
        if (res.ok) {
          return cache.put(url, res);
        }
      } catch (err) {}
    }),
  );
}

async function sendMessage(msg) {
  let allClients = await clients.matchAll({ includeUncontrolled: true });
  return Promise.all(
    allClients?.map(function sendTo(client) {
      let channel = new MessageChannel();
      channel.port1.onmessage = onMessage;
      return client.postMessage(msg, [channel.port2]);
    }),
  );
}

function onFetch(event) {
  if (event.request.destination === 'image')
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) return response;

        return fetch(event.request).then(function(response) {
          if (!response || response.status !== 200 || response.type !== 'basic')
            return response;

          let responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseToCache).then(r => r);
          });

          return response;
        });
      }),
    );
}

/* Cache Management - Cache versions to be changed on file change
   Not needed if sw.js changes as being updated automatically on change */
const CACHE_STATIC = 'sw-static-v3'; // Adjust when static files changed
const CACHE_DYNAMIC = 'sw-dynamic-v2'; // Adjust when dynamic files changed

/**********************************************************/
/* Events triggered by the browser during SW installation */
/**********************************************************/
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC).then(function(cache) {
      /*
      Cache the app shell: The application shell is the frame of the
      application, I.e. the core of the app. Means, the static content like
      the html file, css, js and images.
      From a developers POV these should not change that often.
      The dynamic content will be cached to, but is not part of the app
     shell.
     */
      console.log('[Service Worker] Precaching App Shell');
      cache.addAll([
        '/zeigerpflanzen/',
        '/zeigerpflanzen/index.html',
        '/zeigerpflanzen/script.js',
        '/zeigerpflanzen/styles.css',
        'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
        'https://use.fontawesome.com/releases/v5.3.1/css/all.css'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ...', event);

  /* Cleanup the caches - I.e. every app version change goes into a new cache so the old ones need to be cleaned */
  event.waitUntil(
    caches
      .keys() // keys returns an array of keys of all subcaches in the cache storage
      .then(function(keyList) {
        // Promise.all takes an array of Promises and waits for all of them to finish
        return Promise.all(
          // Remove old caches
          keyList.map(function(key) {
            if (key !== CACHE_STATIC && key !== CACHE_DYNAMIC) {
              console.log('[Service Worker] Removing old cache.', key);
              return caches.delete(key);
            }
          })
        );
      })
  );
  return self.clients.claim(); // Ensures that sw is loaded correctly
});

/**********************************************************/
/* Handle Fetch events                                    */
/**********************************************************/
self.addEventListener('fetch', function(event) {
  console.log('[Service Worker] Fetching data ...', event);
  /* event.respondWith allows us to overwrite the data which gets sent back */
  event.respondWith(
    caches
      .match(event.request) // check if the request is in cache
      .then(function(response) {
        if (response) {
          // if there we return the request (from the cache)
          return response;
        } else {
          return fetch(event.request) // else we fetch the data. I.e. continue with the network request.
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC).then(function(cache) {
                cache.put(event.request.url, res.clone()); // clone as res can only be used once
                return res;
              });
            })
            .catch(function(err) {});
        }
      })
  );
});

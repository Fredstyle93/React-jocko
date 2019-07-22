let CACHE_STATIC_NAME = "static-v10"
let CACHE_DYNAMIC_NAME = "dynamic-v1"

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);

    event.waitUntil(
        caches.open(CACHE_STATIC_NAME)
            .then(function(cache){
                cache.addAll([
                    "/",
                    "/index.html",
                ]);
            })
    )
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker ....', event);

    event.waitUntil(
        caches.keys()
            .then(function(keylist){
                return Promise.all(keylist.map(function(key){  // tableau de promesse et attend qu'elles soient toutes terminées
                    if(key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME){ // On supprime si c'est une vieille cache.
                        console.log('removing old cache' + key);
                        return caches.delete(key);
                    }
                }));
            })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response){ // On match avec l'event en question pour que la cache nous retourne le bon fichier.
            if(response){
                return response
            } else {
                //Si nous ne trouvons rien dans la cache.
                return fetch(event.request)
                    .then(function(res){
                        return caches.open(CACHE_DYNAMIC_NAME).then(function(cache){ // Si on ne trouve rien on ajoute à la cache.
                            cache.put(event.request.url,res.clone())
                            return res;
                        })
                    })
                    .catch(function(err){ // Si la cache dynamique n'as pas pu être loadé et qu'on rencontre une erreur, on retourne la page offline
                        return caches.open(CACHE_STATIC_NAME)
                            .then(function(cache){
                                return cache.match("/offline.html");
                            })
                    })
            }
        })
    );
});
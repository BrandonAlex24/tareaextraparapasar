const Estatico = "estatico";
const inmutable = "inmutable";
const Dinamico = "dinamico";

self.addEventListener("install", event => {
	const cacheEstatico = caches.open(Estatico).then((cache) => {
		cache.addAll([
			"/index.html",
            "/",
            "/js/app.js",
            "/js/numeros.js",
            "/css/style.css",
            "/img/26287.png",
            "/img/error.png",
            "/pages/error.html",
            "/sw.js",
		]);
	});

	const cacheInmutable = caches.open(inmutable).then((cache) => {
		cache.addAll([
			"/js/jquery-3.6.0.min.js",
            "/manifest.json",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css",
		]);
	});
	event.waitUntil(Promise.all([cacheEstatico, cacheInmutable]));
});

self.addEventListener("fetch", event => {
    const response = fetch(event.request).then(respuesta => {
        if(!respuesta){
            return caches.match(event.request).then(respuesta2 =>{
                if(!respuesta2){
                    if (/\.(png|jpg)$/.test(event.request.url)) {
                        return caches.match("/img/error.png");
                    }
                    return caches.match("/pages/error.html");
                }
                return respuesta2;
            });
        }else{
            caches.match(event.request).then(respuesta =>{
                if(!respuesta){
                    caches.open(Dinamico).then(cache => {
                        cache.add(event.request);
                    });
                }
            });
            return respuesta;
        }
    }).catch(error => {
        return caches.match(event.request).then(respuesta2 =>{
            if(!respuesta2){
                if (/\.(png|jpg)$/.test(event.request.url)) {
                    return caches.match("/img/error.png");
                }
                return caches.match("/pages/error.html");
            }
            return respuesta2;
        });
    })
	event.respondWith(response);
});
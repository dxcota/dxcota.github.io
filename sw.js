// Call install event
const cacheName = 'v1';

const cacheAssets = [
	'index.html',
	'index.css',
    'mobile.css',
	'index.js',
    
];

// Call Install Event
self.addEventListener('install', (e) => {


	e.waitUntil(
		caches
			.open(cacheName)
			.then((cache) => {
				cache.addAll(cacheAssets);
			})
			.then(() => self.skipWaiting()),
	);
});

// Call Activate Event
self.addEventListener('activate', (e) => {
	// Remove unwanted caches
	e.waitUntil(
		caches.keys().then((cacheNames) => Promise.all(
			cacheNames.map((cache) => {
				if (cache !== cacheName) {
					return caches.delete(cache);
				}
			}),
		)),
	);
});

// Call Fetch Event
self.addEventListener('fetch', (e) => {
	e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
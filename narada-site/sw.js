const CACHE = 'narada-v1';
const ASSETS = [
  '/narada-site/',
  '/narada-site/index.html',
  '/narada-site/manifest.json',
  '/narada-site/images/favicon.png',
  '/narada-site/images/logo.png',
  '/narada-site/images/hero-bg.png',
  '/narada-site/images/hue.png',
  '/narada-site/images/hoian.png',
  '/narada-site/images/bana.png',
  '/narada-site/images/danang-city.png',
  '/narada-site/images/kalmar.png',
  '/narada-site/images/springs.png',
  '/narada-site/images/cham.png',
  '/narada-site/images/vinwonders.png',
  '/narada-site/images/surf.png',
  '/narada-site/images/sea.png',
  '/narada-site/images/hayvan.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});

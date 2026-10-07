/* Glamour Gram service worker: every page stays readable offline.
   Pages come from the network when it answers within a few seconds, so new versions show at once; the cached copy is the fallback.
   Other files are served from the cache and refreshed in the background. When you add a page, list it in PAGES and bump VERSION. */
const VERSION = "glamour-gram-v1";
const PAGES = ["./", "index.html", "four-days-old.html", "three-letter-spell.html", "the-duet.html", "specious-present.html",
  "microcosm.html", "workarounds.html", "price-of-a-mind.html", "view-from-elsewhere.html", "every-path.html"];
const FILES = ["glam.css", "manifest.webmanifest", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];
const FONT_CSS = [
  "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=Newsreader:ital,opsz,wght@0,6..72,300;1,6..72,300&family=JetBrains+Mono:wght@400;500&display=swap",
  "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;1,6..96,400&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&family=JetBrains+Mono:wght@400;500&display=swap"
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll([...PAGES, ...FILES].map(u => new Request(u, {cache: "reload"})));
    await warmFonts(cache).catch(() => {});   // nice to have; never block the install on it
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for(const k of await caches.keys()) if(k.startsWith("glamour-gram-") && k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(req.mode === "navigate") e.respondWith(page(e));
  else if(url.origin === location.origin) e.respondWith(stale(e, req, req));
  else if(FONT_HOSTS.includes(url.hostname)) e.respondWith(font(e));
});

// The typefaces: fetch the stylesheets with CORS (so they aren't opaque) and keep the Latin files they point to.
async function warmFonts(cache){
  for(const u of FONT_CSS){
    const res = await fetch(u, {mode: "cors", credentials: "omit"});
    if(!res.ok) continue;
    await cache.put(u, res.clone());
    const css = await res.text();
    const files = [...css.matchAll(/\/\*\s*latin\s*\*\/[^}]*?url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m => m[1]);
    await Promise.all(files.map(f => fetch(f, {mode: "cors", credentials: "omit"}).then(r => r.ok ? cache.put(f, r) : 0)));
  }
}

const wait = ms => new Promise(r => setTimeout(r, ms));
// A redirected response can't answer a navigation in some browsers, so keep a plain copy.
const plain = res => res.redirected ? res.blob().then(b => new Response(b, {status: res.status, statusText: res.statusText, headers: res.headers})) : res;

async function page(e){
  const cache = await caches.open(VERSION), req = e.request;
  const cached = cache.match(req, {ignoreSearch: true});
  const net = fetch(req).then(async res => {
    if(res.ok && res.type === "basic") await cache.put(req.url.split(/[?#]/)[0], (await plain(res.clone())));
    return res;
  });
  e.waitUntil(net.catch(() => {}));
  try { return await Promise.race([net, wait(4000).then(async () => (await cached) || net)]); }
  catch(err){ return (await cached) || (await cache.match("./")) || Response.error(); }
}

// Stale-while-revalidate: answer from the cache, then refresh it.
async function stale(e, req, key){
  const cache = await caches.open(VERSION), hit = await cache.match(key, {ignoreSearch: true, ignoreVary: true});
  const net = fetch(req).then(res => { if(res.ok) cache.put(key, res.clone()); return res; });
  if(hit){ e.waitUntil(net.catch(() => {})); return hit; }
  return net;
}

async function font(e){
  const url = e.request.url;
  if(url.startsWith("https://fonts.gstatic.com/")){   // font files never change at a given address
    const hit = await caches.match(url, {ignoreVary: true});
    if(hit) return hit;
  }
  return stale(e, new Request(url, {mode: "cors", credentials: "omit"}), url);
}

const CACHE="uhrzyt-v16";
const CORE=["./","index.html","app.css","app.js","lang/ch-zh.js","lang/ch-ag.js","lang/de.js","lang/en.js","lang/fr.js","lang/it.js","lang/th.js",
  "manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});

/* network first, the saved copy when offline or when the network takes longer than 3.5 s */
async function fresh(req){
  const cache=await caches.open(CACHE);
  try{
    const ctl=new AbortController(), timer=setTimeout(()=>ctl.abort(),3500);
    const r=await fetch(req.url,{cache:"no-cache",signal:ctl.signal});
    clearTimeout(timer);
    if(r.redirected&&req.mode==="navigate") return fetch(req); // let the browser follow redirects itself
    if(r.ok) cache.put(req.url,r.clone());
    return r;
  }catch(err){
    return (await cache.match(req.url,{ignoreSearch:true}))
      ||(req.mode==="navigate"&&((await cache.match("./"))||(await cache.match("index.html"))))
      ||Response.error();
  }
}

self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  const url=new URL(e.request.url);
  // the page, its code and its language files: always the same version after an update (network first)
  if(e.request.mode==="navigate"||(url.origin===location.origin&&/\.(js|css)$/.test(url.pathname))){
    e.respondWith(fresh(e.request));
    return;
  }
  // everything else (icons, manifest, fonts): saved copy first, refreshed in the background
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{
      if(r&&(r.ok||r.type==="opaque")){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}
      return r;
    }).catch(()=>hit);
    return hit||net;
  }));
});

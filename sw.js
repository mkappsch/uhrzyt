const CACHE="uhrzyt-v13";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  // the page itself: network first, so a new version shows on the next launch;
  // the saved copy when offline or when the network takes longer than 3.5 s
  if(e.request.mode==="navigate"){
    e.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      try{
        const ctl=new AbortController(), timer=setTimeout(()=>ctl.abort(),3500);
        const r=await fetch(e.request.url,{cache:"no-cache",signal:ctl.signal});
        clearTimeout(timer);
        if(r.redirected) return fetch(e.request); // let the browser follow redirects itself
        if(r.ok) cache.put(e.request.url,r.clone());
        return r;
      }catch(err){
        return (await cache.match(e.request.url,{ignoreSearch:true}))||(await cache.match("./"))||(await cache.match("index.html"))||Response.error();
      }
    })());
    return;
  }
  // everything else (icons, manifest): saved copy first, refreshed in the background
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{
      if(r&&(r.ok||r.type==="opaque")){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}
      return r;
    }).catch(()=>hit);
    return hit||net;
  }));
});

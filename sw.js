const V='heartcare-v4',F=["./", "index.html", "manifest.json", "css/styles.css", "js/app.js", "js/engine.js", "vendor/chart.umd.js", "vendor/three.min.js", "assets/icon.svg", "data/audit.json","data/data.js", "data/exercise/age_guidelines.json", "data/drugs/anticoagulants.json", "data/drugs/antihypertensives.json", "data/drugs/statins.json", "data/safety/emergency_guidance.json", "data/vitamins/supplements.json"];
// Bump V whenever you ship new files so old caches are deleted.
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// App files: network first (so edits show up), cache as the offline fallback. vendor/ never changes: cache first.
self.addEventListener('fetch',e=>{
 const q=e.request,u=new URL(q.url);
 if(q.method!=='GET'||u.origin!==location.origin)return;
 const fresh=()=>fetch(q).then(r=>{if(r&&r.status===200){const c=r.clone();caches.open(V).then(k=>k.put(q,c)).catch(()=>{})}return r});
 e.respondWith(u.pathname.includes('/vendor/')
  ?caches.match(q).then(r=>r||fresh())
  :fresh().catch(()=>caches.match(q,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});

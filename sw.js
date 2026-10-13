'use strict';
const CACHE='coloring-playground-v1';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./assets/rabbit.svg','./assets/dinosaur.svg','./assets/cat.svg','./assets/car.svg','./assets/flower.svg','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('coloring-playground-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});

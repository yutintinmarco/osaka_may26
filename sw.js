// Self-destructing Service Worker
// 呢個 sw.js 會主動登出自己並清除所有 cache
// 確保所有裝置都唔會再被舊 cache 困住

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', async () => {
  // 清除所有 cache
  const keys = await caches.keys();
  await Promise.all(keys.map(k => caches.delete(k)));
  // 登出自己
  await self.registration.unregister();
  // 通知所有 client 重新整理
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach(client => client.navigate(client.url));
});

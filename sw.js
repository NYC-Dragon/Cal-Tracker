self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Do NOT intercept fetch — let all requests pass through normally.
// Intercepting fetch on iOS PWAs can freeze tap events.

self.addEventListener('message', e => {
  if (!e.data) return;

  if (e.data.type === 'SCHEDULE_MEAL_NOTIF') {
    const delay = e.data.fireAt - Date.now();
    if (delay <= 0) return;
    setTimeout(() => {
      self.registration.showNotification('Time to eat 🍽️', {
        body: 'Your 3-hour window is up — next meal is ready.',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'meal-ready',
        renotify: true,
        vibrate: [200, 100, 200]
      });
    }, delay);
  }
});

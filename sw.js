self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Listen for schedule messages from the main page
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_MEAL_NOTIF') {
    const delay = e.data.fireAt - Date.now();
    if (delay <= 0) return;
    setTimeout(() => {
      self.registration.showNotification("Time to eat 🍽️", {
        body: "Your 3-hour window is up — next meal is ready.",
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        tag: "meal-ready",
        renotify: true,
        vibrate: [200, 100, 200]
      });
    }, delay);
  }

  if (e.data && e.data.type === 'CANCEL_MEAL_NOTIF') {
    // Nothing to cancel for setTimeout-based approach, but
    // we keep this hook for future use
  }
});

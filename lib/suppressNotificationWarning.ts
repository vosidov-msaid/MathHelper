// ponytail: this app only schedules local notifications (the daily reminder),
// never remote push — expo-notifications logs a remote-push warning that doesn't
// apply here. Must be imported before expo-notifications so it's patched in time
// to catch the warning whether it fires at import or call time.
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('expo-notifications: Android Push notifications')) {
    return;
  }
  originalConsoleError(...args);
};

export type ToggleRow = {
  id: 'notifications' | 'darkMode' | 'soundEffects' | 'dailyReminder';
  label: string;
};

export const toggleRows: ToggleRow[] = [
  { id: 'notifications', label: 'Push Notifications' },
  { id: 'darkMode', label: 'Dark Mode' },
  { id: 'soundEffects', label: 'Sound Effects' },
  { id: 'dailyReminder', label: 'Daily Reminder' },
];

export type NavRow = {
  id: string;
  label: string;
  route: '/settings/help' | '/settings/privacy';
};

export const navRows: NavRow[] = [
  { id: 'help', label: 'Help & Support', route: '/settings/help' },
  { id: 'privacy', label: 'Privacy Policy', route: '/settings/privacy' },
];

export const appVersion = '1.0.0';

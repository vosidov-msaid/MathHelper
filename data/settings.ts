export const profile = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  initials: 'AJ',
};

export type ToggleRow = {
  id: string;
  label: string;
  defaultValue: boolean;
};

export const toggleRows: ToggleRow[] = [
  { id: 'notifications', label: 'Push Notifications', defaultValue: true },
  { id: 'darkMode', label: 'Dark Mode', defaultValue: false },
  { id: 'sound', label: 'Sound Effects', defaultValue: true },
  { id: 'reminder', label: 'Daily Reminder', defaultValue: false },
];

export type NavRow = {
  id: string;
  label: string;
};

export const navRows: NavRow[] = [
  { id: 'account', label: 'Account' },
  { id: 'help', label: 'Help & Support' },
  { id: 'privacy', label: 'Privacy Policy' },
];

export const appVersion = '1.0.0';

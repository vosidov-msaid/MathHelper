import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'math-homework-helper/settings';

export type AppSettings = {
  notifications: boolean;
  darkMode: boolean;
  soundEffects: boolean;
  dailyReminder: boolean;
};

const DEFAULT_SETTINGS: AppSettings = {
  notifications: true,
  darkMode: false,
  soundEffects: true,
  dailyReminder: false,
};

type SettingsContextValue = {
  settings: AppSettings;
  setSetting: (key: keyof AppSettings, value: boolean) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setSettings((prev) => ({ ...prev, ...JSON.parse(raw) }));
      })
      .catch(() => {});
  }, []);

  const setSetting = useCallback((key: keyof AppSettings, value: boolean) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  return <SettingsContext.Provider value={{ settings, setSetting }}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}

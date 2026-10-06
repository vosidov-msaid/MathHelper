import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { ColorScheme, darkColors, getCardShadow, lightColors } from '@/constants/colors';
import { useSettings } from '@/contexts/SettingsContext';

type ThemeContextValue = {
  colors: ColorScheme;
  cardShadow: ReturnType<typeof getCardShadow>;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const systemScheme = useColorScheme();

  const value = useMemo<ThemeContextValue>(() => {
    const isDark =
      settings.themeMode === 'system' ? systemScheme === 'dark' : settings.themeMode === 'dark';
    const colors = isDark ? darkColors : lightColors;
    return { colors, cardShadow: getCardShadow(colors), isDark };
  }, [settings.themeMode, systemScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

import { createContext, ReactNode, useContext, useMemo } from 'react';

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

  const value = useMemo<ThemeContextValue>(() => {
    const colors = settings.darkMode ? darkColors : lightColors;
    return { colors, cardShadow: getCardShadow(colors), isDark: settings.darkMode };
  }, [settings.darkMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

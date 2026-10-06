export type ColorScheme = {
  primary: string;
  primaryDark: string;
  accent: string;
  highlight: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  danger: string;
};

export const lightColors: ColorScheme = {
  primary: '#4F46E5',
  primaryDark: '#3730A3',
  accent: '#14B8A6',
  highlight: '#F59E0B',
  background: '#F7F8FC',
  surface: '#FFFFFF',
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  danger: '#EF4444',
};

export const darkColors: ColorScheme = {
  primary: '#818CF8',
  primaryDark: '#A5B4FC',
  accent: '#2DD4BF',
  highlight: '#FBBF24',
  background: '#0F172A',
  surface: '#1E293B',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  danger: '#F87171',
};

export function getCardShadow(colors: ColorScheme) {
  return {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: colors === darkColors ? 0.25 : 0.06,
    shadowRadius: 8,
    elevation: 2,
  };
}

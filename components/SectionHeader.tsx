import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { ColorScheme } from '@/constants/colors';
import { FontSize, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.lg,
    },
    title: {
      fontSize: FontSize.screenTitle,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    subtitle: {
      fontSize: FontSize.body,
      color: colors.textSecondary,
      marginTop: Spacing.xs,
    },
  });

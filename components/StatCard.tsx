import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];
  value: string;
  label: string;
};

export function StatCard({ icon, value, label }: Props) {
  const { colors, cardShadow } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={[styles.card, cardShadow]}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.md,
      alignItems: 'flex-start',
      gap: Spacing.xs,
    },
    value: {
      fontSize: FontSize.sectionHeader,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    label: {
      fontSize: FontSize.caption,
      color: colors.textSecondary,
    },
  });

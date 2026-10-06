import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];
  value: string;
  label: string;
};

export function StatCard({ icon, value, label }: Props) {
  return (
    <View style={[styles.card, CardShadow]}>
      <Ionicons name={icon} size={22} color={Colors.primary} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  value: {
    fontSize: FontSize.sectionHeader,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  label: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
});

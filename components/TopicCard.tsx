import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
  progressPct: number;
  lessonCount: number;
};

export function TopicCard({ icon, title, description, progressPct, lessonCount }: Props) {
  return (
    <View style={[styles.card, CardShadow]}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={22} color={Colors.primary} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>
        <Text style={styles.meta}>
          {progressPct}% complete · {lessonCount} lessons
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSize.cardTitle,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  description: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
  progressTrack: {
    height: 6,
    borderRadius: Radius.full,
    backgroundColor: Colors.border,
    overflow: 'hidden',
    marginTop: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: Radius.full,
    backgroundColor: Colors.accent,
  },
  meta: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
  },
});

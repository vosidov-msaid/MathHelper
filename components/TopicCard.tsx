import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
  progressPct: number;
  lessonCount: number;
  onPress?: () => void;
};

export function TopicCard({ icon, title, description, progressPct, lessonCount, onPress }: Props) {
  const { colors, cardShadow } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable style={[styles.card, cardShadow]} onPress={onPress}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={22} color={colors.primary} />
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
      {onPress ? <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} /> : null}
    </Pressable>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      gap: Spacing.md,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: Radius.sm,
      backgroundColor: colors.background,
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
      color: colors.textPrimary,
    },
    description: {
      fontSize: FontSize.caption,
      color: colors.textSecondary,
    },
    progressTrack: {
      height: 6,
      borderRadius: Radius.full,
      backgroundColor: colors.border,
      overflow: 'hidden',
      marginTop: Spacing.xs,
    },
    progressFill: {
      height: '100%',
      borderRadius: Radius.full,
      backgroundColor: colors.accent,
    },
    meta: {
      fontSize: FontSize.caption,
      color: colors.textSecondary,
    },
  });

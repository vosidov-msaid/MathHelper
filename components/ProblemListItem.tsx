import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  snippet: string;
  subject: string;
  timeAgo: string;
  imageUri?: string;
  onPress?: () => void;
};

export function ProblemListItem({ snippet, subject, timeAgo, imageUri, onPress }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.thumbnail} /> : null}
      <View style={styles.textBlock}>
        <Text style={styles.snippet} numberOfLines={1}>
          {snippet}
        </Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{subject}</Text>
        </View>
      </View>
      <Text style={styles.timeAgo}>{timeAgo}</Text>
      {onPress ? <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} /> : null}
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
      gap: Spacing.sm,
    },
    thumbnail: {
      width: 40,
      height: 40,
      borderRadius: Radius.sm,
      backgroundColor: colors.background,
    },
    textBlock: {
      flex: 1,
      gap: Spacing.xs,
    },
    snippet: {
      fontSize: FontSize.cardTitle,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    tag: {
      alignSelf: 'flex-start',
      backgroundColor: colors.background,
      borderRadius: Radius.full,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
    },
    tagText: {
      fontSize: FontSize.caption,
      color: colors.primary,
      fontWeight: '600',
    },
    timeAgo: {
      fontSize: FontSize.caption,
      color: colors.textSecondary,
    },
  });

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ColorScheme } from '@/constants/colors';
import { FontSize, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  title: string;
  subtitle?: string;
};

export function BackHeader({ title, subtitle }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={8}>
        <Ionicons name="chevron-back" size={22} color={colors.primary} />
      </Pressable>
      <View style={styles.textBlock}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: Spacing.sm,
      marginBottom: Spacing.lg,
    },
    backButton: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
    },
    textBlock: {
      flex: 1,
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

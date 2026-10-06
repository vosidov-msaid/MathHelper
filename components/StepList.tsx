import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  steps: string[];
};

export function StepList({ steps }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepRow}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}
    </>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    stepRow: {
      flexDirection: 'row',
      gap: Spacing.sm,
      marginBottom: Spacing.xs,
    },
    stepNumber: {
      width: 20,
      height: 20,
      borderRadius: Radius.full,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 1,
    },
    stepNumberText: {
      fontSize: FontSize.caption,
      color: colors.surface,
      fontWeight: '700',
    },
    stepText: {
      flex: 1,
      fontSize: FontSize.body,
      color: colors.textPrimary,
      lineHeight: 20,
    },
  });

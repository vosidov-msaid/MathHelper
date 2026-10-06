import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StepList } from '@/components/StepList';
import type { ColorScheme } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

type Props = {
  question: string;
  subject: string;
  answer: string;
  steps: string[];
  saved?: boolean;
  onSave?: () => void;
};

export function MathResultCard({ question, subject, answer, steps, saved, onSave }: Props) {
  const { colors, cardShadow } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={[styles.card, cardShadow]}>
      <View style={styles.headerRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{subject}</Text>
        </View>
        {onSave ? (
          <Pressable style={styles.saveButton} onPress={onSave} disabled={saved} hitSlop={8}>
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={16}
              color={saved ? colors.accent : colors.primary}
            />
            <Text style={[styles.saveButtonText, saved && styles.saveButtonTextSaved]}>
              {saved ? 'Saved' : 'Save'}
            </Text>
          </Pressable>
        ) : null}
      </View>
      <Text style={styles.question}>{question}</Text>

      <View style={styles.answerBlock}>
        <Text style={styles.answerLabel}>Answer</Text>
        <Text style={styles.answerValue}>{answer}</Text>
      </View>

      <Text style={styles.breakdownLabel}>Step-by-step breakdown</Text>
      <StepList steps={steps} />
    </View>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      gap: Spacing.sm,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tag: {
      alignSelf: 'flex-start',
      backgroundColor: colors.background,
      borderRadius: Radius.full,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    saveButtonText: {
      fontSize: FontSize.caption,
      fontWeight: '600',
      color: colors.primary,
    },
    saveButtonTextSaved: {
      color: colors.accent,
    },
    tagText: {
      fontSize: FontSize.caption,
      color: colors.primary,
      fontWeight: '600',
    },
    question: {
      fontSize: FontSize.cardTitle,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    answerBlock: {
      backgroundColor: colors.background,
      borderRadius: Radius.sm,
      padding: Spacing.sm,
      gap: 2,
    },
    answerLabel: {
      fontSize: FontSize.caption,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    answerValue: {
      fontSize: FontSize.sectionHeader,
      color: colors.accent,
      fontWeight: '700',
    },
    breakdownLabel: {
      fontSize: FontSize.body,
      fontWeight: '600',
      color: colors.textPrimary,
      marginTop: Spacing.xs,
    },
  });

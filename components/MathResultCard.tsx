import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { StepList } from '@/components/StepList';
import { CardShadow, Colors } from '@/constants/colors';
import { FontSize, Radius, Spacing } from '@/constants/layout';

type Props = {
  question: string;
  subject: string;
  answer: string;
  steps: string[];
  saved?: boolean;
  onSave?: () => void;
};

export function MathResultCard({ question, subject, answer, steps, saved, onSave }: Props) {
  return (
    <View style={[styles.card, CardShadow]}>
      <View style={styles.headerRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{subject}</Text>
        </View>
        {onSave ? (
          <Pressable style={styles.saveButton} onPress={onSave} disabled={saved} hitSlop={8}>
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={16}
              color={saved ? Colors.accent : Colors.primary}
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
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
    backgroundColor: Colors.background,
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
    color: Colors.primary,
  },
  saveButtonTextSaved: {
    color: Colors.accent,
  },
  tagText: {
    fontSize: FontSize.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  question: {
    fontSize: FontSize.cardTitle,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  answerBlock: {
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    gap: 2,
  },
  answerLabel: {
    fontSize: FontSize.caption,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  answerValue: {
    fontSize: FontSize.sectionHeader,
    color: Colors.accent,
    fontWeight: '700',
  },
  breakdownLabel: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
});
